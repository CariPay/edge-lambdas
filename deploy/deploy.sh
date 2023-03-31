#!/bin/bash

if [[ $TRAVIS_BRANCH =~ develop|feature ]]; then
  echo 'Deploying to dev: ' $TRAVIS_BRANCH
  STAGE=dev
elif [[ $TRAVIS_BRANCH =~ bug|release ]]; then
  echo 'Deploying to qa: ' $TRAVIS_BRANCH
  STAGE=qa
elif [[ $TRAVIS_BRANCH =~ master ]]; then
  echo 'Deploying to prod: ' $TRAVIS_BRANCH
  STAGE=prod
else
  echo 'Deploying to dev-1, no matching branch found: ' $TRAVIS_BRANCH
  STAGE=dev-1
fi

COMPANY_INITIALS=$(deploy/get_company.sh $TRAVIS_BRANCH)
REGION="${AWS_REGION:=us-east-1}"

npm install

serverless deploy -s $STAGE --region $REGION

echo 'Deployed.'
