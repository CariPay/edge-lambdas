#!/bin/bash
echo "Installing serverless..."
npm i -g serverless
yarn install --production=true

sudo apt-get update
sudo apt-get install awscli -y
aws --version