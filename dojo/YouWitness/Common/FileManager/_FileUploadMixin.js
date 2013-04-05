define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/Deferred',
    'dojo/dom-construct',
    './ProgressBar',
    './_FileMixin',
    'dijit/_Widget',
    'dojo/Evented'
], function(
        declare,
        lang,
        on,
        Deferred,
        domConstruct,
        ProgressBar,
        FileMixin,
        Widget,
        Evented
        ) {
    return declare(
            'Zoop/Admin/Common/FileManager/_FileUploadMixin',
            [Widget, FileMixin, Evented], {
        uploadData: undefined,
        progressBar: undefined,
        request: undefined,
        postCreate: function() {
            this.inherited(arguments);
            this.set('preventActions', true);
        },
        showThumb: function() {
            var container = domConstruct.create('div', {
                'class': 'file-upload-item-canvas-container'
            }, this.thumbNode);

            var fileType = this.get('fileType');

            //if an image, show image thumb
            if (fileType && fileType.toLowerCase().match(/image\/*/)) {
                if (fileType.match(/image\/(jpg|gif|png|jpeg)/)) {
                    if (this.uploadData) {
                        var dfd = this._createUploadThumb();
                        dfd.then(lang.hitch(this, function(img) {
                            var div = domConstruct.create('div', {
                                'class': 'file-upload-item-canvas',
                                innerHTML: '<img src="' + img.src + '" width="' + img.width + '" height="' + img.height + '"/>'
                            });
                            container.appendChild(div);
                            this.emit('loaded', {});
                        }));

                        return dfd;
                    } else if (this.get('fileSrc') != null) {
                        this._createThumb();
                    }
                }
            }
            var dfd = new Deferred();
            return dfd;
        },
        complete: function() {
            if (this.get('progressBar')) {
                this.get('progressBar').complete();
            }
            this.set('preventActions', false);
        },
        _setRequestAttr: function(request) {
            this.set('progressBar', new ProgressBar({
                maximum: this.get('fileSize'),
                value: 0
            }));

            //monitor progress
            var reqProgress = on(request.upload, 'progress', lang.hitch(this, function(evt) {
                var loaded = evt.loaded;
                if (evt.lengthComputable) {
                    this.get('progressBar').set('value', loaded);
                    var max = this.get('progressBar').get('maximum');
                    if (max == loaded && (!arguments.callee.done === true)) {
                        arguments.callee.done = true;
                        reqProgress.remove();
                        this.get('progressBar').wait();
                    }
                }
            }));

            //add to dom
            this.progressBarNode.appendChild(this.get('progressBar').domNode);
        },
        _createUploadThumb: function() {
            var width = 120;
            var dfd = new Deferred();
            var reader = new FileReader();

            reader.onload = lang.hitch(this, function(evt) {
                var img = new Image();
                img.src = evt.target.result;
                img.onload = lang.hitch(this, function() {
                    if (this.get('thumbWidth')) {
                        width = this.get('thumbWidth');
                    }
                    var newHeight = Math.round((img.height / img.width) * width);
                    this.set('fileHeight', img.height);
                    this.set('fileWidth', img.width);

                    var canvas = domConstruct.create('canvas', {
                        width: width,
                        height: newHeight
                    });
                    canvas.getContext('2d').drawImage(img, 0, 0, width, newHeight);
                    img.src = canvas.toDataURL();

                    img.onload = function() {
                        dfd.resolve(img);
                    };
                });
            });


            reader.readAsDataURL(this.uploadData);
            return dfd;
        },
        _getVariationsAttr: function() {
            return {
                raw: {
                    fileName: this.get('fileName'),
                    fileWidth: this.get('fileWidth'),
                    fileHeight: this.get('fileHeight'),
                    fileOrder: this.get('fileOrder'),
                    fileType: this.get('fileType'),
                    fileSrc: this.get('fileSrc')
                }
            };
        },
        _setFileOrderAttr: function(order) {
            this.fileOrder = order;
        }
    }
    );
});