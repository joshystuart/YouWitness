define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-prop',
    'dojo/on',
    'dojo/store/JsonRest',
    './Suspect',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/Evented',
    'dojo/text!./Template/AllSuspects.html'
], function(
        declare,
        lang,
        array,
        domProp,
        on,
        JsonRest,
        Suspect,
        Widget,
        TemplatedMixin,
        Evented,
        template
        ) {
    return declare(
            [Widget, TemplatedMixin, Evented],
            {
                templateString: template,
                current: undefined,
                constructor: function(props) {
                    this.store = new JsonRest({
                        target: '/admin/suspect'
                    });
                },
                postCreate: function() {
                    this.inherited(arguments);
                    this.store.query().then(lang.hitch(this, function(r) {
                        array.forEach(r.data, lang.hitch(this, function(suspect) {
                            var s = new Suspect(suspect);
                            on(s.domNode, 'click', lang.hitch(this, function(e) {
                                e.preventDefault();
                                this.update(suspect);
                            }));
                            this.suspectsNode.appendChild(s.domNode);
                        }));
                    }));
                    this.watch('current', lang.hitch(this, function(n, o, v) {

                    }));
                },
                onAdd: function() {
                    if (this.get('current')) {
                        this.emit('add', {
                            suspect: this.get('current')
                        });
                    }
                },
                update: function(suspect) {
                    this.set('current', suspect);
                    this.dropdownNode.innerHTML = ' - ' + suspect.suspectId;
                    domProp.set(this.addBtnNode, 'disabled', false);
                }
            }
    );
});