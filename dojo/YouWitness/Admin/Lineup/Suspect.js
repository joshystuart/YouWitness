define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/Evented',
    'dojo/text!./Template/Suspect.html',
    'Sds/Form/Select'
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
                    this._model = props;
                },
                _setSuspectIdAttr: {
                    node: "idNode",
                    type: "innerHTML"
                },
                _setSuspectImageAttr: {
                    node: "imageNode",
                    type: "innerHTML"
                }
            }
    );
});