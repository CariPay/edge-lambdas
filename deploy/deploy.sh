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

COMPANY_INITIALS=$(deploy/get_company.sh $TRAVIS_BRANCH)
REGION="${AWS_REGION:=us-east-1}"

echo "Fetching config for $COMPANY_INITIALS on stage $STAGE"
aws s3 cp s3://kyc-config/$COMPANY_INITIALS/edge-lambdas/env/$STAGE.env ./config.env --region $REGION

echo "export DEPLOYMENT_STAGE=$STAGE" >> config.env
echo "export STAGE=$STAGE" >> config.env

source config.env

echo "config values"
cat config.env
echo "====COMPLETE===="

npm install

serverless deploy -s $STAGE

echo 'Deployed.'
