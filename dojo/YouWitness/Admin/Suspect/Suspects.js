define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'Sds/Widget/Dialog',
    './Details',
    './Suspect',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/Evented',
    'dojo/text!./Template/Suspects.html'
], function(
        declare,
        lang,
        array,
        Dialog,
        Details,
        Suspect,
        Widget,
        TemplatedMixin,
        Evented,
        template
        ) {
    return declare(
            [Widget, TemplatedMixin, Evented],
            {
                templateString: template,
                suspects: undefined,
                _setSuspectsAttr: function(suspects) {
                    array.forEach(suspects, lang.hitch(this, function(suspect) {
                        var s = new Suspect(suspect);
                        s.startup();
                        this.suspectsNode.appendChild(s.domNode);
                        s.on('save', lang.hitch(this, function(r) {
                            this.emit('save', r);
                        }));
                    }));
                    this.suspects = suspects;
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
                            result.value.lineupId = 0;
                            this.emit('save', {
                                data: result.value
                            });
                        }
                        detail.destroyRecursive();
                        dialog.destroyRecursive();
                    }));
                },
                _getSuspectsAttr: function() {
                    return this.suspects;
                }
            }
    );
});