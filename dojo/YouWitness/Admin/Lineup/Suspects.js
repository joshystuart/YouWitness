define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-construct',
    './Suspect',
    'YouWitness/Admin/Common/AllSuspects',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'Sds/Form/_FormMixin',
    'dojo/Evented',
    'dojo/text!./Template/Suspects.html'
], function(
        declare,
        lang,
        array,
        domConstruct,
        Suspect,
        AllSuspects,
        Widget,
        TemplatedMixin,
        FormMixin,
        Evented,
        template
        ) {
    return declare(
            [Widget, TemplatedMixin, FormMixin, Evented],
            {
                templateString: template,
                suspects: new Array(),
                postCreate: function() {
                    this.inherited(arguments);
                    var a = new AllSuspects();
                    a.startup();
                    a.on('add', lang.hitch(this, function(s) {
                        this.add(s.suspect);
                    }));
                    this.allSuspectsNode.appendChild(a.domNode);
                },
                add: function(suspect) {
                    if (suspect.id) {
                        suspect.id = undefined;
                    }
                    var s = new Suspect(suspect);
                    s.startup();
                    s.on('remove', lang.hitch(this, function() {
                        this.remove(s);
                    }));
                    this.suspectsNode.appendChild(s.domNode);
                    this.suspects.push(s);
                },
                remove: function(suspect) {
                    var newSuspects = array.filter(this.suspects, lang.hitch(this, function(s) {
                        return s.get('suspectId') !== suspect.get('suspectId');
                    }));
                    suspect.destroyRecursive();
                    this.set('suspects', newSuspects);
                },
                _setSuspectsAttr: function(suspects) {
                    this.suspects = new Array();
                    domConstruct.empty(this.suspectsNode);
                    array.forEach(suspects, lang.hitch(this, function(suspect) {
                        this.add(suspect);
                    }));
                },
                _getSuspectsAttr: function() {
                    var val = [];
                    array.forEach(this.suspects, lang.hitch(this, function(suss) {
                        val.push(suss.get('value'));
                    }));
                    return val;
                },
                _getValueAttr: function() {
                    return this.get('suspects');
                }
            }
    );
});