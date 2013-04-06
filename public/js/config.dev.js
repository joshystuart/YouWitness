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
        ['dijit/_WidgetsInTemplateMixin', 'Sds/Widget/_WidgetsInTemplateMixin'],
        ['YouWitness/AdminBase.min', 'YouWitness/Common/Dummy'],
        ['YouWitness/ExperimentBase.min', 'YouWitness/Common/Dummy']
    ],
    mergeConfigs: [
        'Sds/Validator/config',
        'Sds/Filter/config',
        'Sds/ExceptionModule/config'
    ],
    packages: [{
        name: 'YouWitness',
        location: '/js/dojo/YouWitness'
    }]
}
