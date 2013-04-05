define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/dom-construct',
    'dojo/store/JsonRest',
    '../Common/PreLoad',
    'Sds/ModuleManager/ModuleManager',
    './Nav',
    'dojo/Stateful'
], function(
        declare,
        lang,
        when,
        domConstruct,
        JsonRest,
        PreLoad,
        ModuleManager,
        Nav,
        Stateful
        ) {
    // module:
    //	YouWitness/Admin/Controller

    return declare(
            'YouWitness/Admin/Controller',
            [Stateful],
            {
                target: '/admin/',
                container: undefined,
                preloader: undefined,
                manager: undefined,
                nav: undefined,
                constructor: function() {
                    this.manager = new ModuleManager();
                    this.nav = new Nav();
                },
                init: function(container) {
                    this.container = container;
                    this.preloader = new PreLoad({
                        parent: container,
                        position: 'absolute'
                    });
                    domConstruct.place(this.preloader.domNode, this.container, 'first');
                    this.show('Lineup');
                },
                initNav: function(container) {
                    this.nav.startup();
                    domConstruct.place(this.nav.domNode, container, 'last');
                },
                show: function(step) {
                    var lStep = step.toLowerCase();
                    var j = new JsonRest({target: this.target + lStep});
                    j.query().then(lang.hitch(this, function(r) {
                        when(this.manager.get('YouWitness/Admin/' + step + '/' + step + 's'), lang.hitch(this, function(w) {
                            w.startup();
                            var d = w.get(lStep + 's');
                            if (!d) {
                                w.set(lStep + 's', r.data);
                            }
                            domConstruct.place(w.domNode, this.container, 'last');

                            w.on('save', lang.hitch(this, function(r2) {
                                if (r2.data) {
                                    if (r2.data.id > 0) {
                                        j.target = this.target + lStep + '/';

                                        j.put(r2.data, {id: r2.data.id}).then(lang.hitch(this, function(r3) {
                                            //do nothing
                                        }));
                                    } else {
                                        j.target = this.target + lStep;
                                        j.put(r2.data).then(lang.hitch(this, function(r3) {
                                            //add to widget
                                        }));
                                    }
                                }
                            }));

                            var wEvent = this.nav.on('show', lang.hitch(this, function(n) {
                                wEvent.remove();
                                domConstruct.empty(this.container);
                                this.show(n.section);
                            }));
                        }));
                    }));
                }
            }
    );
});