define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/Evented',
    'dojo/text!./Template/Details.html',
    './Suspects',
    'Sds/Form/Select',
    'Sds/Form/ExpandingTextarea'
], function(
        declare,
        lang,
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
                _model: {},
                constructor: function(props) {
                    lang.mixin(this, props);
                    lang.mixin(this._model, props);
                },
                _setLineupSuspectsAttr: function(suspects) {
                    this.suspectsNode.set('suspects', suspects);
                }
            }
    );
});