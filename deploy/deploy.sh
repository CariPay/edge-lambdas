#!/bin/bash

if [[ $GITHUB_REF_NAME =~ develop|feature ]]; then
  echo 'Deploying to dev: ' $GITHUB_REF_NAME
  STAGE=dev
elif [[ $GITHUB_REF_NAME =~ bug|release ]]; then
  echo 'Deploying to qa: ' $GITHUB_REF_NAME
  STAGE=qa
elif [[ $GITHUB_REF_NAME =~ master ]]; then
  echo 'Deploying to prod: ' $GITHUB_REF_NAME
  STAGE=prod
else
  echo 'Deploying to dev, no matching branch found: ' $GITHUB_REF_NAME
  STAGE=dev
fi

COMPANY_INITIALS=$(deploy/get_company.sh $GITHUB_REF_NAME)
REGION="${AWS_REGION:=us-east-1}"

npm install

serverless deploy -s $STAGE --region $REGION

echo 'Deployed.'
