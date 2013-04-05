
require([
    'dojo/dom',
    'YouWitness/Admin/Controller',
    'dojo/domReady!'
],
        function(
                dom,
                Controller
                ) {
            var c = new Controller();
            c.init(dom.byId('content'));
            c.initNav(dom.byId('nav'));
        });