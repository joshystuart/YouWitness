define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/Evented',
    'dojo/text!./Template/Step4.html'
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
                    setTimeout(lang.hitch(this, this.onNext), 60000);
                },
                startup: function() {
                    this.inherited(arguments);
                    this.emit('save', {
                        data: {
                            section: '4'
                        },
                        target: '/experiment'
                    });
                },
                onNext: function() {
                    this.emit('next', {section: 'Step5'});
                }
            }
    );
});