
/**
 * BASIC Authentication
 *
 * Simple authentication script intended to be run by Amazon Lambda to
 * provide Basic HTTP Authentication for a static website hosted in an
 * Amazon S3 bucket through Couldfront.
 *
 * https://hackernoon.com/serverless-password-protecting-a-static-website-in-an-aws-s3-bucket-bfaaa01b8666
 */

 // Register this as the viewer-request trigger handler

const opts = require('./opts');

'use strict';

exports.handler = (event, context, callback) => {

    // Get request and request headers
    const request = event.Records[0].cf.request;
    const { headers, uri } = request;
    const { acl } = opts;
    const authorization = headers.authorization || [{}];

    const authParams = [].concat(acl)
        .filter(({ route }) => (new RegExp(route, 'ig')).test(uri))

    console.log("az: ", authorization)

    if (!authParams.length) {
        return callback(null, request);
    }

    // Configure authentication
    const authUser = authParams[0].uname;
    const authPass = authParams[0].pword;

    // Construct the Basic Auth string
    const authBase64 = new Buffer.from(authUser + ':' + authPass).toString('base64');
    const authString = `Basic ${authBase64}`;

    console.log("ap: ", authString, authUser, authPass)
    // Require Basic authentication
    if (authorization[0].value !== authString) {

        const body = 'Unauthorized';
        const response = {
            status: '401',
            statusDescription: 'Unauthorized',
            body: body,
            headers: {
                'www-authenticate': [{key: 'WWW-Authenticate', value: 'Basic'}]
            },
        };

        return callback(null, response);
    }

    // Continue request processing if authentication passed
    return callback(null, request);
};
