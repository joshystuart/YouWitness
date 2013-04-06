define([
    'dojo/_base/declare',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/Evented',
    'dojo/text!./Template/Step6.html',
    'YouWitness/Experiment/Email'
], function(
        declare,
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
                startup: function() {
                    this.inherited(arguments);
                    this.emit('save', {
                        data: {
                            section: '6'
                        },
                        target: '/experiment'
                    });
                }
            }
    );
});