# edge-lambdas
A collection of Lambda@Edge functions that do helpful things - mostly for our website.

## Things to note

- If editing this repo, please ensure that when compressed, the auth directory remains below 1mb if you are targeting viewer requests.
- You must attach different versions of a Lambda@Edge function if you are targeting multiple cloudfront distributions.

For more information, please refer to the following links.
- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-add-triggers.html
- http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-limits.html#limits-lambda-at-edge
- You cannot apply the same version of a lambda to multiple distributions, this will cause a 503 error when requesting your data

## Things to Improve

- Write a .travis.yml that will automatically zip and upload the code to s3, attach to zip to the latest version of the lambda function. (https://persistolabs.atlassian.net/browse/CP-648)

NOTE: You will have to update the latest version of the lambda function to a cloudfront behaviour each time since, at the time of writing this documentation, cloudfront does not accept `aliases`, therefore only `versioned` arn's can be applied to a cloudfront behaviour.