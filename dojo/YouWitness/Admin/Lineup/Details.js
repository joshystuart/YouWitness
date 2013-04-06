define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/Form/_FormMixin',
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
        FormMixin,
        template
        ) {
    return declare(
            [Widget, TemplatedMixin, WidgetsInTemplateMixin, FormMixin],
            {
                templateString: template,
                lineupMethod: null,
                lineupComments: null,
                lineupSuspects: [],
                constructor: function(props) {
                    lang.mixin(this, props);
                },
                startup: function() {
                    this.inherited(arguments);
                    this.connectChildren();
                },
                _setLineupSuspectsAttr: function(suspects) {
                    this.suspectsNode.set('suspects', suspects);
                },
                _getLineupSuspectsAttr: function(suspects) {
                    return this.suspectsNode.get('value');
                },
                _getValueAttr: function() {
                    var value = this.inherited(arguments);
                    value.lineupSuspects = this.get('lineupSuspects');
                    return value;
                }
            }
    );
});