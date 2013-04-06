#!/bin/bash
#Do a dojo build. Argument should be maxi|mini depending on which build profile you want to use

profile_version=$1

mkdir -p ./public/js/prod-assets/

echo "Removing old dojo build"
rm -rf ./public/js/prod-assets/*

#Preprocess build profile
/opt/node/bin/node ./build/dojoProfiles/buildconfig.js load=Sds/Build/preprocess --profile ./build/dojoProfiles/${profile_version}.profile.js

#Do the actual build
/opt/node/bin/node ./build/dojoProfiles/buildconfig.js load=build --profile ./build/dojoProfiles/${profile_version}.profile.preprocessed.js