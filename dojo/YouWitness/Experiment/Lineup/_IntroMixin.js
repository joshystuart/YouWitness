define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dijit/_Widget',
    'dojo/Evented'
], function(
        declare,
        lang,
        domConstruct,
        Widget,
        Evented
        ) {
    return declare(
            [Widget, Evented],
            {
                layoutNode: undefined,
                lineupId: 0,
                onNext: function() {
                    if (this.layoutNode) {
                        domConstruct.empty(this.layoutNode);
                        var lineup = this.get('lineup');
                        lineup.set('lineupId', this.get('lineupId'));
                        lineup.set('suspects', this.get('suspects'));
                        lineup.show();

                        lineup.on('finished', lang.hitch(this, function() {
                            this.emit('finished', {});
                        }));
                        this.layoutNode.appendChild(lineup.domNode);
                    }
                }
            }
    );
});