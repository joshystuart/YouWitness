var profile = (function(){
    var testResourceRe = /^YouWitness\/Test\//;
    var seleniumResourceRe = /^Sds\/selenium\//;

    var ignore = function(filename, mid){
        var list = {};
        return (mid in list);
    };

    var test = function(filename, mid){
        var list = {
            "YouWitness/Test" : true,
            "YouWitness/phpunit.xml.dist" : true,
            "YouWitness/debug-tests.sh" : true,
            "YouWitness/selenium" : true
        };
        return (mid in list) ||
            testResourceRe.test(mid) ||
            seleniumResourceRe.test(mid);
    };

    var copyOnly = function(filename, mid){
        var list = {
            "YouWitness/YouWitness.profile" : true,
            "YouWitness/package.json" : true
        };
        return (mid in list) ||
            /(png|jpg|jpeg|gif|tiff)$/.test(filename);
    };

    var miniExclude = function(filename, mid){
        var list = {
            "YouWitness/README.md" : true
        };
        return (mid in list);
    };

    return {
        resourceTags:{

            ignore: function(filename, mid){
                return ignore(filename, mid);
            },

            test: function(filename, mid){
                return test(filename, mid);
            },

            copyOnly: function(filename, mid){
                return copyOnly(filename, mid);
            },

            miniExclude: function(filename, mid){
                return miniExclude(filename, mid);
            },

            amd: function(filename, mid){
                return !test(filename, mid) &&
                    !copyOnly(filename, mid) &&
                    !ignore(filename, mid) &&
                    (/\.js$/).test(filename);
            }
        }
    };
})();