define([
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/Evented',
    'dojo/text!./Template/SimultaneousSuspect.html',
    'Sds/Form/Toggle'
], function(
        declare,
        domConstruct,
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
                suspectId: 0,
                templateString: template,
                _setSuspectImageAttr: function(image) {
                    domConstruct.empty(this.imageNode);
                    if (image && image.length > 0) {
                        domConstruct.create('img', {
                            src: image
                        }, this.imageNode);
                    }
                },
                onPerpetrator: function() {
                    this.emit('selected');
                },
                setActive: function() {
                    domClass.add(this.btnNode, 'active');
                }
            }
    );
});