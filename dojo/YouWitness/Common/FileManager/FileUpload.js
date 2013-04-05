define([
    'dojo/_base/declare',
    './_FileUploadMixin',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/text!./Template/FileUpload.html'
    ], function(
        declare,
        FileMixin,
        Widget,
        TemplatedMixin,
        template
        ) {
        return declare(
            'Zoop/Admin/Common/FileManager/FileUpload', 
            [FileMixin, Widget, TemplatedMixin], {
                templateString: template
            }
            );
    });