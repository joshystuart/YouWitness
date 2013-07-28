#!/bin/bash

s3_cdn_bucket="youwitness"

css_build_dir="public/css"
js_build_dir="public/prod-assets"
compile_dir="public/prod-assets/_temp"

s3_css_dir="/css/"

s3_js_dir="/js/"

echo "Moving JS files to S3"
for f in $(find ${compile_dir} -maxdepth 1 -name '*.js')
do 
    name=$(basename $f)
    base=$(basename "$f" .js)

    if [[ "$name" == *min.js ]]
    then
        s3cmd --config=/root/.s3cfg put -m application/javascript --add-header "Content-Encoding:gzip" --acl-public --force --no-progress ./${compile_dir}/${name} s3://${s3_cdn_bucket}${s3_js_dir}${name}
    else
        s3cmd --config=/root/.s3cfg put -m application/javascript --acl-public --force --no-progress ./${compile_dir}/${name} s3://${s3_cdn_bucket}${s3_js_dir}${name}
    fi
done

echo "Moving JS resource files to S3"
s3cmd --config=/root/.s3cfg put --acl-public --force --no-progress ./${js_build_dir}/dojo/resources/blank.gif s3://${s3_cdn_bucket}${s3_js_dir}resources/blank.gif
s3cmd --config=/root/.s3cfg put --acl-public --force --no-progress ./${js_build_dir}/dojo/resources/blank.html s3://${s3_cdn_bucket}${s3_js_dir}resources/blank.html
s3cmd --config=/root/.s3cfg put --acl-public --force --no-progress ./${js_build_dir}/dojo/resources/iframe_history.html s3://${s3_cdn_bucket}${s3_js_dir}resources/iframe_history.htm

echo "Moving NL files to S3"
s3cmd --config=/root/.s3cfg put --acl-public --force --recursive --no-progress ./${js_build_dir}/YouWitness/nls s3://${s3_cdn_bucket}${s3_js_dir}

echo "Moving Additional files to S3"
s3cmd --config=/root/.s3cfg put --acl-public --force --recursive --no-progress ./${js_build_dir}/dojo/cldr s3://${s3_cdn_bucket}${s3_js_dir}

echo "Moving CSS"
s3cmd --config=/root/.s3cfg put -m text/css --acl-public --force --no-progress ./${css_build_dir}/main.css s3://${s3_cdn_bucket}${s3_css_dir}main.css
s3cmd --config=/root/.s3cfg put -m text/css --add-header "Content-Encoding:gzip" --acl-public --force --no-progress ./${css_build_dir}/main.min.css s3://${s3_cdn_bucket}${s3_css_dir}main.min.css