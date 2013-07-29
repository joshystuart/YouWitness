var profile = {
    "basePath": "../../",
    "releaseDir": "public/prod-assets",
    "action": "release",
    "cssOptimize": "comments",
    "layerOptimize": "closure",
    "stripConsole": "all",
    "selectorEngine": "acme",
    "mini": 1,
    // debugging config
//    "cssOptimize": "comments",
//    "layerOptimize": false,
//    "stripConsole": "none",
//    "selectorEngine": "acme",
//    "mini": 0,
    "buildReportDir": "../../build/dojoBuildReports",
    "buildReportFilename": "maxi-profile-build-report.txt",
    "defaultConfig": {
        "hasCache": {
            "dojo-built": 1,
            "dojo-loader": 1,
            "dom": 1,
            "host-browser": 1,
            "config-selectorEngine": "acme"
        },
        "popup": true,
        "async": true,
        "baseUrl": "https://s3-ap-southeast-2.amazonaws.com/youwitness/js/",
        "aliases": [
            ["get", "Sds/ModuleManager/Shared/get"],
            ["proxy", "Sds/ModuleManager/Shared/proxy"],
            ["dojo/parser", "dojox/mobile/parser"],
            ["dijit/_WidgetsInTemplateMixin", "Sds/Widget/_WidgetsInTemplateMixin"]
        ],
        "mergeConfigs": [
            "Sds/Validator/config",
            "Sds/ExceptionModule/config",
            "Sds/Filter/config"
        ]
    },
    "packages": [
        {
            "name": "dojo",
            "location": "vendor/dojo/dojo"
        },
        {
            "name": "dijit",
            "location": "vendor/dojo/dijit"
        },
        {
            "name": "dojox",
            "location": "vendor/dojo/dojox"
        },
        {
            "name": "Sds",
            "location": "vendor/dojo/Sds"
        },
        {
            "name": "YouWitness",
            "location": "dojo/YouWitness"
        },
        {
            "name": "bootstrap",
            "location": "vendor/dojo/bootstrap"
        }
    ],
    "layers": {
        "dojo/dojo": {
            "custombase": false,
            "boot": true
        },
        "YouWitness/AdminBase": {
            "custombase": false,
            "boot": false,
            "exclude": [
                "dojo/dojo"
            ],
            "include": [
                "dijit/_Widget",
                "dijit/_TemplatedMixin",
                "dijit/_WidgetsInTemplateMixin",
                "dijit/_OnDijitClickMixin",
                "dijit/registry",
                "bootstrap/Dropdown",
                "bootstrap/Button",
                "bootstrap/Alert",
                "bootstrap/Modal",
                "Sds/Filter/Group",
                "Sds/Filter/Lowercase",
                "Sds/Filter/PadCurrency",
                "Sds/Filter/Propercase",
                "Sds/Filter/Trim",
                "Sds/Filter/Uppercase",
                "Sds/Filter/factory",
                "Sds/Form/Toggle",
                "Sds/Form/_FormMixin",
                "Sds/Form/TextBox",
                "Sds/Form/ValidationTextBox",
                "Sds/Form/CurrencyTextBox",
                "Sds/Form/Select",
                "Sds/Form/ExpandingTextarea",
                "Sds/Validator/Required",
                "Sds/Validator/Datatype",
                "Sds/Validator/NotRequired",
                "Sds/Validator/Group",
                "Sds/Store/storeManager",
                "YouWitness/Common/PreLoad",
                "YouWitness/Admin/Controller",
                "YouWitness/Admin/Suspect/Suspect",
                "YouWitness/Admin/Suspect/Suspects",
                "YouWitness/Admin/Suspect/Details",
                "YouWitness/Admin/Lineup/Suspect",
                "YouWitness/Admin/Lineup/Suspects",
                "YouWitness/Admin/Lineup/Details",
                "YouWitness/Admin/Lineup/Lineup",
                "YouWitness/Admin/Lineup/Lineups",
                "YouWitness/Admin/Common/AllSuspects",
                "YouWitness/Admin/Common/Suspect"
            ]
        },
        "YouWitness/ExperimentBase": {
            "custombase": false,
            "boot": false,
            "exclude": [
                "dojo/dojo"
            ],
            "include": [
                "dijit/_Widget",
                "dijit/_TemplatedMixin",
                "dijit/_WidgetsInTemplateMixin",
                "dijit/_OnDijitClickMixin",
                "dijit/registry",
                "bootstrap/Dropdown",
                "bootstrap/Button",
                "bootstrap/Alert",
                "bootstrap/Modal",
                "Sds/Filter/Group",
                "Sds/Filter/Lowercase",
                "Sds/Filter/PadCurrency",
                "Sds/Filter/Propercase",
                "Sds/Filter/Trim",
                "Sds/Filter/Uppercase",
                "Sds/Filter/factory",
                "Sds/Form/Toggle",
                "Sds/Form/_FormMixin",
                "Sds/Form/TextBox",
                "Sds/Form/ValidationTextBox",
                "Sds/Form/CurrencyTextBox",
                "Sds/Form/Select",
                "Sds/Form/ExpandingTextarea",
                "Sds/Validator/Required",
                "Sds/Validator/Datatype",
                "Sds/Validator/NotRequired",
                "Sds/Validator/Group",
                "Sds/Store/storeManager",
                "YouWitness/Common/PreLoad",
                "YouWitness/Experiment/Confidence",
                "YouWitness/Experiment/Controller",
                "YouWitness/Experiment/Email",
                "YouWitness/Experiment/Nav",
                "YouWitness/Experiment/Step1",
                "YouWitness/Experiment/Step2",
                "YouWitness/Experiment/Step3",
                "YouWitness/Experiment/Step4",
                "YouWitness/Experiment/Step5",
                "YouWitness/Experiment/Step6",
                "YouWitness/Experiment/Lineup/Sequential",
                "YouWitness/Experiment/Lineup/SequentialIntro",
                "YouWitness/Experiment/Lineup/SequentialSuspect",
                "YouWitness/Experiment/Lineup/Simultaneous",
                "YouWitness/Experiment/Lineup/SimultaneousIntro",
                "YouWitness/Experiment/Lineup/SimultaneousSuspect"
            ]
        }
    }
}
