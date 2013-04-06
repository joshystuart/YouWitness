#!/bin/bash

echo "Mini build dojo"
sh ./build/bin/build-dojo.sh mini

echo "Removing uncompressed files"
find . -type f -name "*.uncompressed.js" -exec rm -rf {} \;
find . -type f -name "*.consoleStripped.js" -exec rm -rf {} \;