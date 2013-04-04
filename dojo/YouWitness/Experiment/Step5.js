define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/Evented',
    'dojo/text!./Template/Step5.html'
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
                onNext: function() {
                    this.emit('next', {section: 'Step5'});
                }
            }
    );
});