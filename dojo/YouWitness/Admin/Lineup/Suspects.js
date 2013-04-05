define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    './Suspect',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/Evented',
    'dojo/text!./Template/Suspects.html'
], function(
        declare,
        lang,
        array,
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
                _setSuspectsAttr: function(suspects) {
                    array.forEach(suspects, lang.hitch(this, function(suspect) {
                        var s = new Suspect(suspect);
                        s.startup();
                        this.suspectsNode.appendChild(s.domNode);
                    }));
                }
            }
    );
});