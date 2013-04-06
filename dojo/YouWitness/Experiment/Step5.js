define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-construct',
    './Confidence',
    'dojo/Deferred',
    'Sds/ModuleManager/ModuleManager',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/Evented',
    'dojo/text!./Template/Step5.html'
], function(
        declare,
        lang,
        domConstruct,
        Confidence,
        Deferred,
        ModuleManager,
        Widget,
        TemplatedMixin,
        Evented,
        template
        ) {
    return declare(
            [Widget, TemplatedMixin, Evented],
            {
                templateString: template,
                postCreate: function() {
                    this.inherited(arguments);
                    this.manager = new ModuleManager();
                },
                init: function() {
                    this.def = new Deferred();
                    this.emit('save', {
                        data: {
                            section: '5'
                        },
                        message: 'loading',
                        target: '/experiment'
                    });
                    this.on('saved', lang.hitch(this, function(r) {
                        if (r.data && r.data.lineup) {
                            this.manager.get('YouWitness/Experiment/Lineup/' + r.data.lineup + 'Intro').then(lang.hitch(this, function(s) {
                                this.containerNode.appendChild(s.domNode);
                                s.set('lineupId', r.data.lineupId);
                                s.set('layoutNode', this.containerNode);
                                s.set('suspects', r.data.suspects);
                                var sEvent = s.on('finished', lang.hitch(this, function() {
                                    sEvent.remove();
                                    s.destroyRecursive();
                                    domConstruct.empty(this.containerNode);

                                    this.initConfidence();
                                }));

                                //set up experiment
                                this.def.resolve({});
                            }));
                        }
                    }));
                    return this.def;
                },
                initConfidence: function() {
                    var c = new Confidence();
                    this.containerNode.appendChild(c.domNode);
                    c.on('next', lang.hitch(this, function() {
                        c.destroyRecursive();
                        domConstruct.empty(this.containerNode);
                        this.onNext();
                    }));
                },
                onNext: function() {
                    this.emit('next', {section: 'Step6'});
                }
            }
    );
});