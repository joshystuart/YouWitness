define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'Sds/Widget/Dialog',
    './Details',
    './Lineup',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/Evented',
    'dojo/text!./Template/Lineups.html'
], function(
        declare,
        lang,
        array,
        Dialog,
        Details,
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
                        this.add(lineup);
                    }));
                    this.lineups = lineups;
                },
                add: function(lineup) {
                    var l = new Lineup(lineup);
                    this.lineupFormNode.appendChild(l.domNode);
                    l.on('save', lang.hitch(this, function(r) {
                        this.emit('save', r);
                    }));
                },
                onAdd: function() {
                    var detail = new Details();
                    var dialog = new Dialog({
                        title: 'Edit',
                        content: detail
                    });
                    detail.startup();
                    dialog.startup();

                    //callback on save
                    dialog.show().then(lang.hitch(this, function(result) {
                        if (result.button == 'ok') {
                            var value = detail.get('value');
                            value.id = 0;
                            this.emit('save', {
                                data: value
                            });
                        }
                        dialog.destroyRecursive();
                    }));
                },
                _getLineupsAttr: function() {
                    return this.lineups;
                }
            }
    );
});