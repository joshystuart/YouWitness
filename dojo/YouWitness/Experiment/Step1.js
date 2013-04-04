define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/Evented',
    'dojo/text!./Template/Step1.html'
], function(
        declare,
        lang,
        Deferred,
        Widget,
        TemplatedMixin,
        Evented,
        template
        ) {
    return declare(
            [Widget, TemplatedMixin, Evented],
            {
                templateString: template,
                init: function() {
                    this.def = new Deferred();
                    this.emit('save', {
                        data: {},
                        message: 'loading',
                        target: '/step-1'
                    });
                    this.on('saved', lang.hitch(this, function() {
                        this.def.resolve({});
                    }));
                    return this.def;
                },
                onNext: function() {
                    this.emit('next', {section: 'Step2'});
                }
            }
    );
});