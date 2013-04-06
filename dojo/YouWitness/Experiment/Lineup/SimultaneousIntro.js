define([
    'dojo/_base/declare',
    './Simultaneous',
    'dijit/_TemplatedMixin',
    './_IntroMixin',
    'dojo/text!./Template/SimultaneousIntro.html'
], function(
        declare,
        Simultaneous,
        TemplatedMixin,
        IntroMixin,
        template
        ) {
    return declare(
            [IntroMixin, TemplatedMixin],
            {
                templateString: template,
                _setSuspectsAttr: function(suspects) {
                    this.suspects = suspects;
                    var s = new Simultaneous();
                    this.set('lineup', s);
                }
            }
    );
});