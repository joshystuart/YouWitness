define([
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/Deferred',
    'dojo/io-query',
    'dojo/dom-construct',
    'Sds/Dnd/Sortable',
    'dojo/has',
    'dojo/on',
    'dojo/request/xhr',
    'dojox/collections/ArrayList',
    './File',
    './FileUpload',
    './_FileMixin',
    'dijit/_Widget',
    'dojo/Evented'
], function(
        lang,
        declare,
        array,
        Deferred,
        ioQuery,
        domConstruct,
        Sortable,
        has,
        on,
        xhr,
        ArrayList,
        File,
        FileUpload,
        FileMixin,
        Widget,
        Evented
        ) {
    return declare(
            'Zoop/Admin/Common/FileManager/_FileManagerMixin',
            [Widget, Evented], {
        allowUploads: true,
        allowFileSort: true,
        uploadTarget: undefined,
        maxBytes: 3144000,
        maxNumFiles: 10, // limited by php.ini directive max_file_uploads
        bytesOverall: 0,
        fileStatus: {
            numCompleted: 0, // number of completely uploaded files
            numAborted: 0, // number of canceled files
            numProgressDone: 0, // number of files where upload progress is 100%
            numError: 0 // number of files with error
        },
        files: new ArrayList(),
        uploadedFiles: [],
        allowedFileTypes: [],
        dbTable: undefined, //the table to save files into
        dbId: undefined, //the id to reference when saving
        _sortable: undefined, //sortable container

        constructor: function(props) {
            //reset these otherwise it persists between instantiations
            this.files = new ArrayList();
            this.uploadedFiles = new ArrayList();
            this.allowedFileTypes = new Array();

            lang.mixin(this, props);
        },
        postCreate: function() {
            this.inherited(arguments);

            if (this.hasFeatures()) {
                //add a onChange listener to the file input
                if (this.fileUploadBtnNode && this.get('allowUploads')) {
                    on(this.fileUploadBtnNode, 'change', lang.hitch(this, function(evt) {
                        var files = evt.target.files;
                        this._addFilesToUploadQueue(files);
                    }));
                } else {
                    //remove the add file button
                    domConstruct.destroy(this.fileUploadBtnContainerNode);
                }

                //set up drag and drop for file sorting if enabled
                if (this.get('allowFileSort') == true) {
                    this.set('_sortable', new Sortable({}, this.fileDisplayContainerNode));
                }
            } else {
                //error 
            }
        },
        _removeFile: function(removeFile) {
            var index = this.files.indexOf(removeFile);
            if (index != -1) {
                this.files.remove(removeFile);
                this.files.forEach(function(file, i) {
                    if (i >= index) {
                        file.set('fileOrder', file.get('fileOrder') - 1);
                    }
                });
            } else {
                this._removeUploadedFile(removeFile);
            }
        },
        _removeUploadedFile: function(removeFile) {
            var index = this.uploadedFiles.indexOf(removeFile);
            if (index != -1) {
                this.uploadedFiles.remove(removeFile);

                this.uploadedFiles.forEach(function(file, i) {
                    if (i >= index) {
                        file.set('fileOrder', file.get('fileOrder') - 1);
                    }
                });
            }
        },
        addFile: function(variations, order) {
            if (!order) {
                order = this.get('numberOfFiles');
            }
            var f = this._createFile(variations, order);
            this._addFile(f);
        },
        _createFile: function(variations, order) {
            var f;
            f = new File({
                variations: variations
            });
            return f;
        },
        _replaceUploadedFile: function(uploadedFile, variations) {
            //get the order of the uploaded file
            var order = uploadedFile.get('fileOrder');

            //remove the uploaded file files array
            this.uploadedFiles.remove(uploadedFile);

            //create and add the new file back into the array and dom
            var f = this._createFile(variations, order);
            this._addEvents(f);
            domConstruct.place(f.domNode, uploadedFile.domNode, 'replace');
            this.files.insert((order - 1), f);

            uploadedFile.remove();
            this.emit('updatedFile');
        },
        _addFileToDom: function(file) {
            var displayNode = file.domNode;

            if (displayNode) {
                if (this.get('allowFileSort') == true) {
                    this._sortable.addChild(displayNode, file.get('fileOrder'));
                } else {
                    this.fileDisplayContainerNode.appendChild(displayNode);
                }
            }
        },
        _addUploadFile: function(file) {
            this._addUploadEvents(file);
            this.uploadedFiles.add(file);
            this._addFileToDom(file);
            this.emit('addedFile');
        },
        _addFile: function(file) {
            this._addEvents(file);
            this.files.add(file);
            this._addFileToDom(file);
            this.emit('addedFile');
        },
        _addEvents: function(file) {
            file.on('delete', lang.hitch(this, function() {
                this._delete(file);
            }));
            file.on('loaded', lang.hitch(this, function() {
                this.emit('loadedFile');
            }));
        },
        _addUploadEvents: function(file) {
            this._addEvents(file);
        },
        _getFilesAttr: function() {
            var files = [];
            //main files
            array.forEach(this.get('fileWidgets'), lang.hitch(this, function(file) {
                files.push(file.get('variations'));
            }));
            return files;
        },
        _setFilesAttr: function(files) {
            this._removeAllFiles();

            array.forEach(files, lang.hitch(this, function(file, i) {
                var f;
                //allow files to be passed as object array or widget
                if (typeof(file.isInstanceOf) === 'function' && file.isInstanceOf(FileMixin)) {
                    this.files.add(file);
                } else {
                    this.addFile(file, i + 1);
                }
            }));
        },
        _removeAllFiles: function() {
            if (this.files.count > 0) {
                this.files.forEach(lang.hitch(this, function(file) {
                    file.remove();
                }));
            }
            this.files = new ArrayList();
            this.files.clear();
        },
        _setUploadedFilesAttr: function(files) {
            this.uploadedFiles = new ArrayList();
            this.uploadedFiles.clear();
            array.forEach(files, lang.hitch(this, function(file) {
                this.uploadedFiles.add(file);
            }));
        },
        _getFileWidgetsAttr: function() {
            var files = [];
            //main files
            this.files.forEach(lang.hitch(this, function(file) {
                files.push(file);
            }));

            //uploaded files
            this.uploadedFiles.forEach(lang.hitch(this, function(file) {
                files.push(file);
            }));
            return files;
        },
        _getNumberOfFilesAttr: function() {
            return this.files.count + this.uploadedFiles.count;
        },
        _addFilesToUploadQueue: function(files) {
            var numFiles = this.get('numberOfFiles');
            array.forEach(files, lang.hitch(this, function(file, i) {
                if (this.files.count > this.get('maxNumFiles')) {
                    //max num files error
                } else if (this.fileTypeAllowed(file.type) === false) {
                    //wrong file type
                } else if (this.fileSizeAllowed(file.size) === false) {
                    //wrong file size
                } else {
                    this._uploadFile(file, (numFiles + 1 + i));
                }
            }));
        },
        _uploadFile: function(file, order) {
            // create containers for individual progress bars
            var u = this._createUploadFile(file, order);
            //upload
            this._upload(u).then(lang.hitch(this, function(r) {
                if (r.error == false) {
                    //if contains variations replace with FileSet
                    if (r.variations) {
                        //swap for a File
                        var f = this._replaceUploadedFile(r.file, r.variations);
                    } else {
                        u.set('fileName', r.fileName);
                        u.set('fileSrc', r.fileSrc);
                        u.complete();
                    }
                    this.emit('uploadedFile');
                } else {
                    //message 
                }
            }));
        },
        _createUploadFile: function(fileDetails, order) {
            var f = new FileUpload({
                fileName: fileDetails.name,
                fileType: fileDetails.type,
                fileSize: fileDetails.size,
                fileOrder: order,
                uploadData: fileDetails
            });
            this._addUploadFile(f);
            return f;
        },
        _delete: function(file) {
            var fileId;
            if (file.get('fileId') != 0) {
                fileId = file.get('fileId');
            } else {
                fileId = file.get('fileName');
            }
            this._removeFile(file);
            file.remove();
            this.emit('deletedFile');

            xhr.del(this.get('uploadTarget'), {
                query: {
                    fileId: fileId
                },
                handleAs: "json"
            }).then(function(r) {
                //show error and re-init uploaded file
            });
        },
        _upload: function(file) {
            var dfd = new Deferred();
            if (this.uploadTarget) {
                var req = new XMLHttpRequest();

                //create Deferred
                dfd = this._setReadyStateChangeEvent(req, file);
                file.set('request', req);

                var params = {
                    dbTable: this.get('dbTable'),
                    dbId: this.get('dbId'),
                    order: file.get('fileOrder'),
                    variations: file.get('fileVariations')
                };

                req.open('post', this.get('uploadTarget') + '?' + ioQuery.objectToQuery(params), true);
                req.setRequestHeader("Cache-Control", "no-cache");
                req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                req.setRequestHeader("X-File-Name", file.get('fileName'));
                req.setRequestHeader("X-File-Size", file.get('fileSize'));

                req.send(file.get('uploadData'));
            }
            return dfd;
        },
        _setReadyStateChangeEvent: function(req, file) {
            var dfd = new Deferred();
            var response;
            on(req, 'readystatechange', lang.hitch(this, function() {
                var err = null;
                if (req.readyState == 4) {
                    // upload finished successful
                    if (req.status == 200 || req.status == 201) {
                        if (req.responseText) {
                            response = JSON.parse(req.responseText);
                        }
                        response.file = file;
                        dfd.resolve(response);
                    }
                    else {
                        if (req.status === 0) {
                            dfd.resolve();
                        } else {
                            err = {
                                statusCode: req.status,
                                statusText: req.statusText,
                                responseText: req.responseText
                            };
                            dfd.reject();
                        }
                    }
                    req = null;
                }
            }));
            return dfd;
        },
        fileSizeAllowed: function(size) {
            return true;
        },
        fileTypeAllowed: function(fileType) {
            var allowedFileTypes = this.get('allowedFileTypes');
            if (allowedFileTypes.length > 0) {
                var type = fileType.toLowerCase();

                if (array.some(allowedFileTypes, lang.hitch(this, function(allowedType) {

                    var re = new RegExp(allowedType, 'i');
                    if (type.match(re) || allowedType == '*') {
                        return true;
                    }
                }))) {
                    return true;
                }
                return false;
            } else {
                return true;
            }
        },
        confirmFileSizeSingle: function(fileName) {

        },
        confirmNumFileLimit: function(limit) {
            this._displayError('Maximum number of files to upload is limited to ' + limit + '.');
        },
        confirmDelete: function(fileName) {
        },
        confirmHasFeatures: function() {
            this._displayError('Your browser doesn\'t support HTML5 multiple drag and drop upload. Consider downloading Mozilla Firefox');
        },
        _displayError: function(message) {
            var alert = new Alert({
                message: message
            });
            alert.setError();
            domConstruct.place(alert.domNode, this.domNode, 'first');
        },
        getUploadedFiles: function() {
            return this.uploadedFiles;
        },
        formatSize: function(bytes) {
            var str = ['bytes', 'kb', 'MB', 'GB', 'TB', 'PB'];
            var num = Math.floor(Math.log(bytes) / Math.log(1024));
            bytes = bytes === 0 ? 0 : (bytes / Math.pow(1024, Math.floor(num))).toFixed(1) + ' ' + str[num];
            return bytes;
        },
        hasFeatures: function() {
            // test taken from has.js
            if (has.add('dnd', function(global, document, anElement) {
                return 'draggable' in document.createElement('span');
            }, true) && has.add('file-api', function(global, document, anElement) {
                return typeof(FileReader) != 'undefined';
            }, true) && has.add('native-xhr-uploadevents', function(global, document, anElement) {
                return has("native-xhr") && ("upload" in new XMLHttpRequest);
            }, true)) {
                return true;
            }
            else {
                return false;
            }
        }

    });
});
