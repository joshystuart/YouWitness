define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'YouWitness/Common/FileManager/FileManager',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/Form/_FormMixin',
    'dojo/text!./Template/Details.html',
    'Sds/Form/Select'
], function(
        declare,
        lang,
        FileManager,
        Widget,
        TemplatedMixin,
        WidgetsInTemplateMixin,
        FormMixin,
        template
        ) {
    return declare(
            [Widget, TemplatedMixin, WidgetsInTemplateMixin, FormMixin],
            {
                templateString: template,
                _model: {},
                suspectId: 0,
                suspectImage: null,
                suspectExpression: null,
                fileManager: undefined,
                baseSrc: 'https://youwitness.s3.amazonaws.com/suspects/',
                constructor: function(props) {
                    lang.mixin(this, props);
                    this._model = props;

                    this.fileManager = new FileManager({
                        imgPreviewWidth: 120,
                        maxKBytes: 10000,
                        maxNumFiles: 1,
                        allowUploads: true,
                        allowFileSort: false,
                        uploadTarget: '/admin/upload',
                        dbTable: 'suspects',
                        dbId: this.suspectId
                    });
                },
                postCreate: function() {
                    this.inherited(arguments);
                    this.imageNode.appendChild(this.fileManager.domNode);
                    this.connectChildren();
                },
                _getSuspectImageAttr: function() {
                    var images = this.fileManager.get('files');
                    if (images[0] && images[0].raw) {
                        return images[0].raw.fileSrc;
                    }
                    return null;
                },
                _setSuspectImageAttr: function(image) {
                    if (image) {
                        this.fileManager.set('files', [{
                                "raw": {
                                    "fileExt": "jpg",
                                    "fileParent": image.replace(this.baseSrc, ''),
                                    "fileId": image.replace(this.baseSrc, ''),
                                    "fileName": image.replace(this.baseSrc, ''),
                                    "fileType": "image/jpg",
                                    "fileSrc": image
                                }
                            }]);
                    }
                },
                _getValueAttr: function() {
                    var value = this.inherited(arguments);
                    value.suspectImage = this.get('suspectImage');
                    return value;
                }
            }
    );
});