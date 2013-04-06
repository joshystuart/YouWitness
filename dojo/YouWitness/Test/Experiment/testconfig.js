
//testing with dojo source
//define the config fully
dojoConfig = {
    isDebug: true,
    popup: true,
    async: true,
    aliases: [
        ['get', 'Sds/ModuleManager/Shared/get'],
        ['proxy', 'Sds/ModuleManager/Shared/proxy'],
        ['dojo/parser', 'dojox/mobile/parser'],
        ['dijit/_WidgetsInTemplateMixin', 'Sds/Widget/_WidgetsInTemplateMixin']
    ],    
    mergeConfigs: [
        'Sds/Validator/config',
        'Sds/Filter/config',        
        'Sds/ExceptionModule/config'
    ]
}