// See https://medium.com/@chrispointon/default-files-in-s3-subdirectories-using-cloudfront-and-lambda-edge-941100a3c629
// Register this as the viewer-request trigger handler

'use strict';

exports.handler = (event, context, callback) => {
    // Extract the request from the CloudFront event that is sent to Lambda@Edge
    var request = event.Records[0].cf.request;

    // Extract the URI and params from the request
    var oldUri = request.uri;

    // Match any uri that ends with some combination of
    // [0-9][a-z][A-Z]_- and append a slash
    var endslashUri = oldUri.replace(/(\/[\w\-]+)$/, '$1/');

    //console.log("Old URI: " + oldUri);
    //console.log("End slash URI: " + endslashUri);

    if (endslashUri != oldUri) {
        // If we changed the uri, 301 to the version with a slash, appending querystring
        var params = '';
        if (('querystring' in request) && (request.querystring.length > 0)) {
            params = '?' + request.querystring;
        }
        var newUri = endslashUri + params;

        //console.log("Params: " + params);
        //console.log("New URI: " + newUri);

        const response = {
            status: '301',
            statusDescription: 'Permanently moved',
            headers: {
                location: [{
                    key: 'Location',
                    value: newUri
                }]
            }
        };
        return callback(null, response);
    } else {
        // Return to CloudFront
        return callback(null, request);
    }
};
