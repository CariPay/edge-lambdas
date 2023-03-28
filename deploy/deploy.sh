#!/bin/bash

set -e

STAGE=$(deploy/choose_stage.sh)
COMPANY_INITIALS=$(deploy/get_company.sh $TRAVIS_BRANCH)
REGION="${AWS_REGION:=us-east-1}"

serverless deploy -s $STAGE --client $COMPANY_INITIALS --region $REGION

echo 'Deployed.'
