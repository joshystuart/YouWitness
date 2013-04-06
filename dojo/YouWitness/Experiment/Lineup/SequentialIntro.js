define([
    'dojo/_base/declare',
    './Sequential',
    'dijit/_TemplatedMixin',
    './_IntroMixin',
    'dojo/text!./Template/SequentialIntro.html'
], function(
        declare,
        Sequential,
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
                    var s = new Sequential();
                    this.set('lineup', s);
                }
            }
    );
});