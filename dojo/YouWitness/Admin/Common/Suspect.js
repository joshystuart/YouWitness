define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/Evented',
    'dojo/text!./Template/Suspect.html',
    'Sds/Form/Select'
], function(
        declare,
        lang,
        domConstruct,
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
                isPerpetrator: 0,
                constructor: function(props) {
                    lang.mixin(this, props);
                },
                _setSuspectIdAttr: {
                    node: "idNode",
                    type: "innerHTML"
                },
                _setSuspectImageAttr: function(image) {
                    domConstruct.empty(this.imageNode);
                    if (image && image.length > 0) {
                        domConstruct.create('img', {
                            src: image,
                            width: 50,
                            height: 50
                        }, this.imageNode);
                    }
                }
            }
    );
});