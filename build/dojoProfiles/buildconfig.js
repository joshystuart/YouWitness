// Dojo Configuration
dojoConfig = {
    async: true,
    baseUrl: "",
    aliases: [
        ['get', 'Sds/ModuleManager/Shared/get'],
        ['proxy', 'Sds/ModuleManager/Shared/proxy'],
        ['dojo/parser', 'dojox/mobile/parser'],
        ['dijit/_WidgetsInTemplateMixin', 'Sds/Widget/_WidgetsInTemplateMixin']        
    ],    
    packages: [
        {
            name: "dojo",
            location: "vendor/dojo/dojo"
        },
        {
            name: "dojox",
            location: "vendor/dojo/dojox"
        },        
        {
            name: "dijit",
            location: "vendor/dojo/dijit"
        },
        {
            name:'util',
            location:'vendor/dojo/util'
        },        
        {
            name:'build',
            location:'vendor/dojo/util/build'
        },
        {
            name:'doh',
            location:'vendor/dojo/util/doh'        
        },
        {
            name: "Sds",
            location: "vendor/dojo/Sds"
        },
        {
            name: "bootstrap",
            location: "vendor/dojo/bootstrap"
        },        
        {
            name: "YouWitness",
            location: "dojo/YouWitness"
        }
    ]
}

require('../../vendor/dojo/dojo/dojo');
