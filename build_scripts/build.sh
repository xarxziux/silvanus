#!/bin/bash

# Stop on error
set -e

# Increment the build number even if the
# rest of the script fails to complete.
buildNum="$(<build_number)"
buildNum=$((buildNum + 1))
echo -n "${buildNum}" > build_number

# Define the file and directory names
baseFile="./src/0_base/druantia.ts"
tscFile="./src/1_tsc/druantia.js"
ugFile="./src/2_uglified/druantia.min.js"
outDir="./bin/"

# If the main file has already been compiled then exit
if [ "${baseFile}" -ot "${outFile}" ]
then
    echo Source file is up-to-date.
    echo
    break
fi

# Compile the source and update the bin/ directory
tsc
jshint "${tscFile}"
uglifyjs "${tscFile}" -c -m -o "${ugFile}"
cp -v "${tscFile}" "${outDir}"
cp -v "${ugFile}" "${outDir}"

# Get a commit message (optional)
echo 
echo Compilation successful.  Please enter a commit message.
echo An empty string skips this step:
read -p "> " commitMsg

# If we have a commit message, update the version number and commit
if [ -n "${commitMsg}" ]
then
    versionNum="$(npm list --depth=0 | \
        grep druantia | \
        grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')"
    commitStr="${versionNum}.${buildNum}: ${commitMsg}"
    npm --no-git-tag-version version patch
    git add -A
    git commit -m "${commitStr}"
fi

echo Compilation successful

