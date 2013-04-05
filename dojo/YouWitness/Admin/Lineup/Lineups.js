define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    './Lineup',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/Evented',
    'dojo/text!./Template/Lineups.html'
], function(
        declare,
        lang,
        array,
        Lineup,
        Widget,
        TemplatedMixin,
        Evented,
        template
        ) {
    return declare(
            [Widget, TemplatedMixin, Evented],
            {
                templateString: template,
                lineups: undefined,
                _setLineupsAttr: function(lineups) {
                    array.forEach(lineups, lang.hitch(this, function(lineup) {
                        var l = new Lineup(lineup);
                        this.lineupFormNode.appendChild(l.domNode);
                        l.on('save', lang.hitch(this, function(r) {
                            this.emit('save', r);
                        }));
                    }));
                    this.lineups = lineups;
                },
                _getLineupsAttr: function() {
                    return this.lineups;
                }
            }
    );
});