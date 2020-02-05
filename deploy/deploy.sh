#!/bin/bash

if [[ $TRAVIS_BRANCH =~ develop|feature ]]; then
  echo 'Deploying to dev-1: ' $TRAVIS_BRANCH
  STAGE=dev-1
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

# Split the branch path into an array. eg release/0.1.0 or release/0.1.0/chr
IFS=/; paths=( $TRAVIS_BRANCH )
COMPANY_INITIALS="${paths[2]:=cp}"

echo "Fetching config for $COMPANY_INITIALS on stage $STAGE"
aws s3 cp s3://kyc-config/$COMPANY_INITIALS/edge-lambdas/env/$STAGE.env ./config.env --region us-east-1

echo "export DEPLOYMENT_STAGE=$STAGE" >> config.env
echo "export STAGE=$STAGE" >> config.env

source config.env

echo "config values"
cat config.env
echo "====COMPLETE===="

cd serverless/
npm i -g serverless
npm install

serverless deploy -s $STAGE

echo 'Deployed.'
