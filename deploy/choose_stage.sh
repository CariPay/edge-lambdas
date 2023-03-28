#!/bin/bash

if [[ $TRAVIS_BRANCH =~ develop|feature ]]; then
  STAGE=dev
elif [[ $TRAVIS_BRANCH =~ bug|release|hotfix ]]; then
  STAGE=qa-1
elif [[ $TRAVIS_BRANCH =~ master ]]; then
  STAGE=prod
else
  STAGE=dev
fi

echo $STAGE
