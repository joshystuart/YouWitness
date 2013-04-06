define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/store/JsonRest',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/Evented',
    'dojo/text!./Template/Confidence.html'
], function(
        declare,
        lang,
        JsonRest,
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
                },
                onNext: function() {
                    var val = this.confidenceToggleNode.get('value');
                    if (val != '') {
                        var j = new JsonRest({target: '/experiment/lineup'});
                        j.put({confidence: val});
                        this.emit('next', {});
                    }
                }
            }
    );
});