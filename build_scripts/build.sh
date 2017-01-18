#!/bin/bash

# Stop on error
set -e

# Increment the build number even if the
# rest of the script fails to complete.
buildNum="$(<build_number)"
buildNum=$((buildNum + 1))
echo -n "${buildNum}" > build_number

# Define the file and directory names
baseFile="./src/0_base/silvanus.js"
# tscFile="./src/1_tsc/silvanus.js"
ugFile="./src/2_uglified/silvanus.min.js"
outDir="./bin/"

# If the main file has already been compiled then exit
if test "${baseFile}" -ot "${outFile}"
then
    echo Source file is up-to-date.
    echo
    break
fi

# Compile the source and update the bin/ directory
# tsc
echo Checking syntax...
jshint "${baseFile}"
echo Success.  Running in node...
node "${baseFile}"
# echo Success.  Minifying...
# uglifyjs "${baseFile}" -c -m -o "${ugFile}"
echo Success.  Copying files to bin/ directory...
cp -v "${baseFile}" "${outDir}"
#cp -v "${ugFile}" "${outDir}"

# Get a commit message (optional)
echo 
echo Compilation successful.  Please enter a commit message.
echo An empty string skips this step:
read -p "> " commitMsg

# If we have a commit message, update the version number and commit
if test -n "${commitMsg}"
then
    versionNum="$(npm list --depth=0 | \
        grep silvanus | \
        grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')"
    commitStr="${versionNum}.${buildNum}: ${commitMsg}"
    npm --no-git-tag-version version patch
    git add -A
    git commit -m "${commitStr}"
fi

echo Compilation successful

