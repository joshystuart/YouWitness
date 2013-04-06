define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/Evented',
    'dojo/text!./Template/Step1.html',
    'YouWitness/Experiment/Email'
], function(
        declare,
        lang,
        Deferred,
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
                init: function() {
                    this.def = new Deferred();
                    this.emit('save', {
                        data: {
                            section: '1'
                        },
                        message: 'loading',
                        target: '/experiment'
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