define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dojo/store/JsonRest',
    'dojo/on',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./Template/Email.html',
    'Sds/Form/ValidationTextBox',
    'Sds/Validator/EmailAddress',
    'Sds/Validator/NotRequired'
], function(
        declare,
        lang,
        domClass,
        JsonRest,
        on,
        Widget,
        TemplatedMixin,
        WidgetsInTemplateMixin,
        template
        ) {
    return declare(
            [Widget, TemplatedMixin, WidgetsInTemplateMixin],
            {
                templateString: template,
                postCreate: function() {
                    var j = new JsonRest({target: '/email'});
                    on(this.emailNode.domNode, 'appendage-click', lang.hitch(this, function(event) {
                        var val = this.emailNode.get('value');
                        var state = this.emailNode.get('state');
                        if (val != '' && state != 'Error') {
                            j.put({email: val});
                            domClass.remove(this.alertNode, 'hide');
                        }
                    }));
                }
            }
    );
});