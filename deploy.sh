#!/bin/bash

set -o errexit

if [ -z "$theme" ]; then
    theme="stackoverflow" # This will be the default theme if no theme is specified.
fi

# Sanity check: No pull requests and ensure we're on the master branch
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
    echo "Won't attempt to build on pull requests. Exiting."
    exit 0
fi

if [ "$TRAVIS_BRANCH" != "master" ]; then
    echo "The requested branch is not master. Exiting."
    exit 0
fi

# Generate the resume as index.html
sudo npm install
# resume export index --format html --theme ${theme}
npm run generate

# Copy output file and check for changes
if [ -z "$(git status --porcelain)" ]; then
    echo "No changes to resume. Skipping deployment..."
    exit 0
fi

rm -rf out
mkdir out
cd out
cp ../resume.* .

# Deploy
git config --global user.name "Travis-CI"
git config --global user.email "travis-ci@travis-ci.org"

git init
git add .
git commit -m "Deployed resume to github pages branch through travis-ci."
git push --force --quiet "https://${GITHUB_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1

echo "Resume deployed successfully"
exit 0
