define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-class',
    'dojo/on',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/Evented',
    'dojo/text!./Template/Nav.html'
], function(
        declare,
        lang,
        array,
        domClass,
        on,
        Widget,
        TemplatedMixin,
        Evented,
        template
        ) {
    return declare(
            [Widget, TemplatedMixin, Evented],
            {
                templateString: template,
                active: 'Step1',
                postCreate: function() {
                    this.inherited(arguments);
                    this.watch('active', lang.hitch(this, function(n, o, v) {
                        this.updateActive(o, v);
                    }));
                    this.setActive(this.get('active'));
                },
                updateActive: function(oldNode, newNode) {
                    this.setInActive(oldNode);
                    this.setActive(newNode);
                },
                setInActive: function(oldNode) {
                    if (oldNode) {
                        var o = this.get(oldNode + 'Node');
                        domClass.remove(o, 'active');
                    }
                },
                setActive: function(newNode) {
                    if (newNode) {
                        var n = this.get(newNode + 'Node');
                        domClass.add(n, 'active');
                    }
                }
            }
    );
});