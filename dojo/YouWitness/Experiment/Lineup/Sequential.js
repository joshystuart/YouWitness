define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    './SequentialSuspect',
    'dojo/store/JsonRest',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/Evented',
    'dojo/text!./Template/Sequential.html'
], function(
        declare,
        lang,
        SequentialSuspect,
        JsonRest,
        Widget,
        TemplatedMixin,
        Evented,
        template
        ) {
    return declare(
            [Widget, TemplatedMixin, Evented],
            {
                templateString: template,
                suspects: new Array(),
                current: 0,
                lineupId: 0,
                constructor: function() {
                    this.store = JsonRest({target: '/experiment/lineup'});
                },
                _setSuspectsAttr: function(suspects) {
                    this.suspects = suspects;
                },
                show: function() {
                    this.showSuspect(this.suspects[this.get('current')]);
                },
                showSuspect: function(suspect) {
                    var s = new SequentialSuspect(suspect);
                    s.startup();
                    this.suspectNode.appendChild(s.domNode);

                    var sEvent = s.on('next', lang.hitch(this, function(r) {
                        //send info
                        this.reportSelection(s, r.isPerpetrator);

                        sEvent.remove();
                        s.destroyRecursive();
                        var current = this.get('current') + 1;
                        this.set('current', current);

                        if (current < this.suspects.length && r.isPerpetrator == 'false') {
                            this.showSuspect(this.suspects[current]);
                        } else {
                            this.emit('finished', {});
                        }
                    }));
                },
                reportSelection: function(suspect, isPerpetrator) {
                    var data = {
                        lineup: 'Sequential',
                        lineupId: this.get('lineupId'),
                        suspectId: suspect.suspectId,
                        isPerpetrator: isPerpetrator
                    };
                    this.store.put(data);
                }
            }
    );
});