define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/Evented',
    'dojo/text!./Template/Step6.html'
], function(
        declare,
        lang,
        Widget,
        TemplatedMixin,
        Evented,
        template
        ) {
    return declare(
            [Widget, TemplatedMixin, Evented],
            {
                templateString: template,
                postCreate: function() {
                    this.inherited(arguments);
                    this.emit('save', {
                        data: {},
                        target: '/step-6'
                    });
                }
            }
    );
});