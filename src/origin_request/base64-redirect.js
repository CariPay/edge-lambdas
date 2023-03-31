// Redirects based on a base64 path

'use strict';

// Expect path like https://site.lynk-me.com/base64stringhere
const getPathAndDecode = (uri) => {
    const encodedPath = uri.split('/').slice(-1)[0];
    const decodedPath = Buffer.from(encodedPath, "base64");
    const data = JSON.parse(decodedPath);

    return data;
};

exports.getPathAndDecode = getPathAndDecode;

exports.handler = (event, context, callback) => {

    // Extract the request from the CloudFront event that is sent to Lambda@Edge
    var request = event.Records[0].cf.request;
    const { uri } = request;

    try {
        const data = getPathAndDecode(uri);
        const { path } = data;

        console.log(`Redirecting to ${path}`);
        const response = {
            status: '301',
            statusDescription: 'Found',
            headers: {
                location: [{
                    key: 'Location',
                    value: path,
                }],
            },
        };  
        callback(null, response);
    } catch (error) {
        // Handle error or redirect to error page
        console.log(error);
    }

    // Return to CloudFront
    callback(null, request);
};