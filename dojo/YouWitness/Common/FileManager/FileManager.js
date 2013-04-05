define([
    'dojo/_base/declare',
    './_FileManagerMixin',
    'dijit/_TemplatedMixin',
    'dojo/text!./Template/FileManager.html'
    ], function(
        declare,
        FileManagerMixin,
        TemplatedMixin,
        template
        ) {
        return declare(
            'Zoop/Admin/Common/FileManager/FileManagerController', 
            [FileManagerMixin, TemplatedMixin], {
                templateString: template
            });
    });
