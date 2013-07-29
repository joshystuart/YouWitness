define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/dom-construct',
    'dojo/store/JsonRest',
    '../Common/PreLoad',
    'Sds/ModuleManager/ModuleManager',
    './Nav',
    'dojo/Stateful',
    'YouWitness/Admin/Lineup/Lineups',
    'YouWitness/Admin/Suspect/Suspects'
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

                            var save = w.on('save', lang.hitch(this, function(r2) {
                                if (r2.data) {
                                    if (r2.data.id == 0) {
                                        r2.data.id = undefined;
                                        j.target = this.target + lStep;
                                        j.put(r2.data).then(lang.hitch(this, function(r3) {
                                            w.add(r3.data);
                                        }));
                                    } else {
                                        j.target = this.target + lStep + '/';

                                        j.put(r2.data, {id: r2.data.id}).then(lang.hitch(this, function(r3) {
                                            //do nothing
                                        }));
                                    }
                                }
                            }));
                            var del = w.on('delete', lang.hitch(this, function(r2) {
                                j.target = this.target + lStep + '/';
                                if (r2.id) {
                                    j.remove(r2.id);
                                }
                            }));

                            var wEvent = this.nav.on('show', lang.hitch(this, function(n) {
                                save.remove();
                                del.remove();
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