define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/Evented',
    'dojo/text!./Template/Nav.html',
    'Sds/Form/Toggle'
], function(
        declare,
        lang,
        Widget,
        TemplatedMixin,
        WidgetsInTemplateMixin,
        Evented,
        template
        ) {
    return declare(
            [Widget, TemplatedMixin, WidgetsInTemplateMixin, Evented],
            {
                templateString: template,
                postCreate: function() {
                    this.inherited(arguments);
                    this.navNode.watch('value', lang.hitch(this, function(n, o, v) {
                        this.emit('show', {
                            section: v
                        });
                    }));
                },
                onDownload: function(e) {
                    document.location.href = '/admin/download';
                }
            }
    );
});