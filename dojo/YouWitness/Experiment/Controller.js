define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/store/JsonRest',
    './Nav',
    '../Common/PreLoad',
    'Sds/ModuleManager/ModuleManager',
    'dojo/Stateful',
    './Step1'
], function(
        declare,
        lang,
        domConstruct,
        JsonRest,
        Nav,
        PreLoad,
        ModuleManager,
        Stateful
        ) {
    // module:
    //	YouWitness/Experiment/Controller

    return declare(
            'YouWitness/Experiment/Controller',
            [Stateful],
            {
                store: undefined,
                container: undefined,
                manager: undefined,
                nav: undefined,
                constructor: function() {
                    this.manager = new ModuleManager();
                    this.nav = new Nav();
                },
                initNav: function(container) {
                    domConstruct.place(this.nav.domNode, container, 'last');
                },
                init: function(container) {
                    this.container = container;
                    this.preloader = new PreLoad({
                        parent: container,
                        position: 'absolute'
                    });
                    domConstruct.place(this.preloader.domNode, this.container, 'first');
                    this.show('Step1');
                },
                show: function(step) {
                    this.nav.set('active', step);
                    this.preloader.show('loading');
                    this.manager.get('YouWitness/Experiment/' + step).then(lang.hitch(this, function(s) {
                        s.on('save', lang.hitch(this, function(r) {
                            if (r.message) {
                                this.preloader.show(r.message);
                            }
                            var j = new JsonRest({target: r.target});
                            j.put(r.data).then(lang.hitch(this, function(r2) {
                                if (r2.error == true) {
                                    s.destroyRecursive();
                                    this.show('Step6');
                                } else if (r2.error == false) {
                                    s.emit('saved', r2);
                                }
                                this.preloader.hide();
                            }));
                        }));
                        s.on('next', lang.hitch(this, function(r) {
                            //show content
                            this.show(r.section);
                            s.destroyRecursive();
                        }));

                        if (s.init) {
                            s.init().then(lang.hitch(this, function(r) {
                                domConstruct.place(s.domNode, this.container, 'last');
                                this.preloader.hide();
                            }));
                        } else {
                            domConstruct.place(s.domNode, this.container, 'last');
                            this.preloader.hide();
                        }
                        s.startup();
                    }));
                }
            }
    );
});