#!/bin/bash

if [[ $BRANCH_NAME =~ develop|feature ]]; then
  echo 'Deploying to dev: ' $BRANCH_NAME
  STAGE=dev
elif [[ $BRANCH_NAME =~ bug|release ]]; then
  echo 'Deploying to qa: ' $BRANCH_NAME
  STAGE=qa
elif [[ $BRANCH_NAME =~ master ]]; then
  echo 'Deploying to prod: ' $BRANCH_NAME
  STAGE=prod
else
  echo 'Deploying to dev, no matching branch found: ' $BRANCH_NAME
  STAGE=dev
fi

COMPANY_INITIALS=$(deploy/get_company.sh $BRANCH_NAME)
REGION="${AWS_REGION:=us-east-1}"

npm install

serverless deploy -s $STAGE --region $REGION

echo 'Deployed.'
