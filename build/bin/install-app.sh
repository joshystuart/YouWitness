#!/bin/bash
app_root_dir=/mnt/www/youwitness

temp_dir=/tmp/app

mkdir -p ${temp_dir}

cd ${temp_dir}

s3_bucket=youwitness
application_file_name="current.tar.gz"
application_user="apache"

s3cmd --config=/root/.s3cfg --force get s3://${s3_bucket}/${application_file_name}

tar -xzf *.tar.gz
rm -rf *.tar.gz

#create app dir if not exists
mkdir -p $app_root_dir

#stop apache
apachectl -k graceful-stop

#remove live app
rm -rf $app_root_dir/*

#copy new app to root
rsync -az $temp_dir/ $app_root_dir
rm -rf $temp_dir

#restart apache
service httpd start
exit 0