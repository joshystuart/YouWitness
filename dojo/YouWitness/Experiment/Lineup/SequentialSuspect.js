define([
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/Evented',
    'dojo/text!./Template/SequentialSuspect.html',
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
                onNext: function() {
                    var isPerp = this.perpetratorToggleNode.get('value');
                    if (isPerp != '') {
                        this.emit('next', {isPerpetrator: isPerp});
                    } else {
                        domClass.remove(this.alertNode, 'hide');
                    }
                }
            }
    );
});