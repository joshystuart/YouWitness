define([
    'dojo/_base/declare',
    './_FileMixin',
    'dijit/_TemplatedMixin',
    'dojo/text!./Template/File.html'
    ], function(
        declare,
        FileMixin,
        TemplatedMixin,
        template
        ) {
        return declare(
            'Zoop/Admin/Common/FileManager/File', 
            [FileMixin, TemplatedMixin], 
            {
                templateString: template
            });
    });