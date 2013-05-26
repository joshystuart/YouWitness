define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/event',
    'dojo/on',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/Evented',
    'dojo/text!./Template/Step3.html',
    'Sds/Form/Toggle'
], function(
        declare,
        lang,
        event,
        on,
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
                postCreate: function() {
                    this.inherited(arguments);
                    
                    //adding this fixes chrome ending bug?
                    on(this.videoNode, 'durationchange', function(e) {});
                    on(this.videoNode, 'ended', lang.hitch(this, this.onNext));
                },
                startup: function() {
                    this.inherited(arguments);
                    this.emit('save', {
                        data: {
                            section: '3'
                        },
                        target: '/experiment'
                    });
                },
                onNext: function() {
                    this.emit('next', {section: 'Step4'});
                }
            }
    );
});