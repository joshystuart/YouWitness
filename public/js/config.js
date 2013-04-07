// Dojo Configuration
dojoConfig = {
    isDebug: true,
    locale: 'en-au',
    popup: true,
    async: true,
    aliases: [
        ['get', 'Sds/ModuleManager/Shared/get'],
        ['proxy', 'Sds/ModuleManager/Shared/proxy'],
        ['dojo/parser', 'dojox/mobile/parser'],
        ['dijit/_WidgetsInTemplateMixin', 'Sds/Widget/_WidgetsInTemplateMixin']
    ],
    packages: [{
        name: 'YouWitness',
        location: 'https://s3-ap-southeast-2.amazonaws.com/youwitness/js'
    }]
}
