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
                init: function() {
                    this.def = new Deferred();
                    this.emit('save', {
                        data: {
                            section: '5'
                        },
                        message: 'loading',
                        target: '/experiment'
                    });
                    this.on('saved', lang.hitch(this, function(r) {
                        console.log(r);
                        this.def.resolve({});
                    }));
                    return this.def;
                },
                onNext: function() {
                    this.emit('next', {section: 'Step6'});
                }
            }
    );
});