require(['YouWitness/ExperimentBase.min'], function() {
    require([
        'dojo/dom',
        'YouWitness/Experiment/Controller',
        'dojo/domReady!'
    ],
            function(
                    dom,
                    Controller
                    ) {
                var c = new Controller();
                c.init(dom.byId('content'));
                c.initNav(dom.byId('nav'));

                var IE4 = function() {
                    if (event.button == 2) {
                        return false;
                    }
                };
                var NS4 = function(e) {
                    if (document.layers || document.getElementById && !document.all) {
                        if (e.which == 2 || e.which == 3) {
                            return false;
                        }
                    }
                };
                var disableselect = function(e) {
                    return false;
                };
                var reEnable = function() {
                    return true;
                };
                document.onselectstart = new Function("return false");
                if (window.sidebar) {
                    document.onmousedown = disableselect
                    document.onclick = reEnable
                }
                if (document.layers) {
                    document.captureEvents(Event.MOUSEDOWN)
                    document.onmousedown = NS4
                }
                else if (document.all && !document.getElementById) {
                    document.onmousedown = IE4;
                }
                document.oncontextmenu = new Function("return false");
            });
});