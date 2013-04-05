define([
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/dom-style',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/text!./Template/ProgressBar.html'
], function(
        lang,
        declare,
        domStyle,
        Widget,
        TemplatedMixin,
        template
        ) {
    return declare(
            'Zoop/Admin/Common/FileManager/ProgressBar',
            [Widget, TemplatedMixin], {
        templateString: template,
        aborted: false,
        paused: false,
        maximum: 0,
        value: 0,
        constructor: function(props) {
            lang.mixin(this, props);
            this.watch('value', this.update);
        },
        update: function(n, o, loaded) {
            var progress = Math.round(loaded / this.get('maximum') * 100);
            this.set('progress', Math.min(progress, 100));
        },
        complete: function() {
            this.set('value', this.maximum);
            this.onComplete();
        },
        abort: function() {
            this.aborted = true;
            this.onAbort();
        },
        pause: function() {
            this.paused = true;
            this.onPause();
        },
        resume: function() {
            this.paused = false;
            this.onResume();
        },
        retry: function() {
            this.set('value', 0);
            this.onRetry();
        },
        wait: function() {

        },
        onAbort: function() {
        },
        onRetry: function() {
        },
        onResume: function() {
        },
        onPause: function() {
        },
        onComplete: function() {
            this.destroyRecursive(false);
        },
        _setLabelAttr: {
            node: "labelNode",
            type: "innerHTML"
        },
        _setProgressAttr: function(progress) {
            var percentage = progress + '%';
            domStyle.set(this.progressBarNode, {
                width: percentage
            });
            this.set('label', percentage);
        }
    });
});