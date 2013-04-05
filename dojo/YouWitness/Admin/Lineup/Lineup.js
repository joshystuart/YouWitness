define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'Sds/Widget/Dialog',
    './Details',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/Evented',
    'dojo/text!./Template/Lineup.html'
], function(
        declare,
        lang,
        Dialog,
        Details,
        Widget,
        TemplatedMixin,
        Evented,
        template
        ) {
    return declare(
            [Widget, TemplatedMixin, Evented],
            {
                templateString: template,
                _model: {},
                lineupId: 0,
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
                            lang.mixin(this, result.value);
                            lang.mixin(this._model, result.value);
                            this.set('lineupMethod', result.value.lineupMethod);
                            this.set('lineupComments', result.value.lineupComments);

                            result.value.id = this.get('lineupId');
                            this.emit('save', {
                                data: result.value
                            });
                        }
                        dialog.destroyRecursive();
                    }));
                },
                _setLineupIdAttr: {
                    node: "idNode",
                    type: "innerHTML"
                },
                _setLineupMethodAttr: {
                    node: "methodNode",
                    type: "innerHTML"
                },
                _setLineupCommentsAttr: {
                    node: "commentsNode",
                    type: "innerHTML"
                },
                _setLineupNumAttr: {
                    node: "numNode",
                    type: "innerHTML"
                }
            }
    );
});