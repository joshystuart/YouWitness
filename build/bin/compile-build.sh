#!/bin/bash

build_dir="public/prod-assets"
css_build_dir="public/css"

compile_dir="public/prod-assets/_temp"

includeNls=("en-gb" "en-us" "en-au" "ROOT")

mkdir -p $compile_dir

echo "Combining base dojo"
cat ./${build_dir}/dojo/dojo.js >> ./${compile_dir}/dojo.js
cat ./${build_dir}/dojo/i18n.js >> ./${compile_dir}/dojo.js
cat ./${build_dir}/Sds/nls/validatorMessages.js >> ./${compile_dir}/dojo.js

# cat ./${build_dir}/Sds/nls/routerMessages.js >> ./${compile_dir}/dojo.js
# cat ./${build_dir}/Sds/nls/identityModule.js >> ./${compile_dir}/dojo.js
# cat ./${build_dir}/dojo/cldr/monetary.js >> ./${compile_dir}/dojo.js
# cat ./${build_dir}/dojo/cldr/supplemental.js >> ./${compile_dir}/dojo.js
# cat ./${build_dir}/dojo/cldr/nls/currency.js >> ./${compile_dir}/dojo.js
# cat ./${build_dir}/dojo/cldr/nls/gregorian.js >> ./${compile_dir}/dojo.js
# cat ./${build_dir}/dojo/cldr/nls/number.js >> ./${compile_dir}/dojo.js
# cat ./${build_dir}/dojo/cldr/nls/en/currency.js >> ./${compile_dir}/dojo.js
# cat ./${build_dir}/dojo/cldr/nls/en/gregorian.js >> ./${compile_dir}/dojo.js
# cat ./${build_dir}/dojo/cldr/nls/en/number.js >> ./${compile_dir}/dojo.js
# cat ./${build_dir}/dojo/cldr/nls/en-au/currency.js >> ./${compile_dir}/dojo.js
# cat ./${build_dir}/dojo/cldr/nls/en-gb/currency.js >> ./${compile_dir}/dojo.js
# cat ./${build_dir}/dojo/cldr/nls/en-ca/currency.js >> ./${compile_dir}/dojo.js
# cat ./${build_dir}/dojo/cldr/nls/en-au/gregorian.js >> ./${compile_dir}/dojo.js
# cat ./${build_dir}/dojo/cldr/nls/en-gb/gregorian.js >> ./${compile_dir}/dojo.js
# cat ./${build_dir}/dojo/cldr/nls/en-ca/gregorian.js >> ./${compile_dir}/dojo.js
# cat ./${build_dir}/dojo/cldr/nls/en-au/number.js >> ./${compile_dir}/dojo.js
# cat ./${build_dir}/dojo/cldr/nls/en-gb/number.js >> ./${compile_dir}/dojo.js

gzip -9 -c ./${compile_dir}/dojo.js > ./${compile_dir}/dojo.min.js

echo "Combining JS files"
for f in $(find ${build_dir}/YouWitness -maxdepth 1 -name 'Admin*.js' -or -name 'Experiment*.js')
do
    name=$(basename $f)
    base=$(basename "$f" .js)
    
    cat ./${build_dir}/YouWitness/${name} >> ./${compile_dir}/${name}

    for nl in "${includeNls[@]}"
    do
        echo "${build_dir}/YouWitness/nls/${base}_${nl}.js"
        if [ -f ${build_dir}/YouWitness/nls/${base}_${nl}.js ]
        then
            cat ./${build_dir}/YouWitness/nls/${base}_${nl}.js >> ./${compile_dir}/${name}
        fi
    done
    
    gzip -9 -c ./${compile_dir}/${name} > ./${compile_dir}/${base}.min.js
done


gzip -9 -c ./${css_build_dir}/main.css > ./${css_build_dir}/main.min.css