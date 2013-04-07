#!/bin/bash

export SERVER_TYPE=test
export COMPOSER_PROCESS_TIMEOUT=50000

#folder prefix
git_commit_hash="$(git rev-parse HEAD)"

sh ./build/bin/build-dojo.sh mini

find . -type f -name "*.uncompressed.js" -exec rm -rf {} \;
find . -type f -name "*.consoleStripped.js" -exec rm -rf {} \;

sh ./build/bin/compile-build.sh

sh ./build/bin/archive-build.sh