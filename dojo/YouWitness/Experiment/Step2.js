define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/Evented',
    'dojo/text!./Template/Step2.html',
    'Sds/Form/Toggle'
], function(
        declare,
        lang,
        domClass,
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
                gender: undefined,
                store: undefined,
                postCreate: function() {
                    this.inherited(arguments);
                    this.genderToggleNode.watch('value', lang.hitch(this, function(n, o, v) {
                        if (v) {
                            this.set('gender', v);
                            domClass.remove(this.nextButtonNode, 'hide');
                        }
                    }));

                    this.on('saved', lang.hitch(this, function() {
                        this.emit('next', {section: 'Step3'});
                    }));
                },
                onNext: function() {
                    if (this.get('gender')) {
                        this.emit('save', {
                            data: {gender: this.get('gender')},
                            message: 'saving your information',
                            target: '/step-2'
                        });
                    }
                }
            }
    );
});