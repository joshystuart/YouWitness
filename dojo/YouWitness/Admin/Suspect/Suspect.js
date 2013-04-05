define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'Sds/Widget/Dialog',
    './Details',
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
        Dialog,
        Details,
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
                _model: undefined,
                suspectId: 0,
                suspectImage: null,
                suspectExpression: null,
                constructor: function(props) {
                    lang.mixin(this, props);
                    this._model = props;
                },
                onDelete: function() {

                },
                onEdit: function() {
                    var detail = new Details(this.get('_model'));
                    var dialog = new Dialog({
                        title: 'Edit',
                        content: detail
                    });
                    detail.startup();
                    dialog.startup();

                    //callback on save
                    dialog.show().then(lang.hitch(this, function(result) {
                        if (result.button == 'ok') {
                            var value = detail.get('value');
                            lang.mixin(this, value);
                            lang.mixin(this._model, value);
                            this.set('suspectImage', value.suspectImage);
                            this.set('suspectExpression', value.suspectExpression);
                            value.id = this.get('suspectId');
                            this.emit('save', {
                                data: value
                            });
                        }
                        detail.destroyRecursive();
                        dialog.destroyRecursive();
                    }));
                },
                _setSuspectIdAttr: {
                    node: "idNode",
                    type: "innerHTML"
                },
                _setSuspectImageAttr: function(image) {
                    domConstruct.empty(this.imageNode);
                    if (image && image.length > 0) {
                        var img = domConstruct.create('img', {
                            src: image,
                            width: 100
                        }, this.imageNode);
                    }
                },
                _setSuspectExpressionAttr: {
                    node: "expressionNode",
                    type: "innerHTML"
                }
            }
    );
});