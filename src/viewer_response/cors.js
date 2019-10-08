exports.handler = (event, context, callback) => {

    //Get contents of response
    const response = event.Records[0].cf.response;
    const headers = response.headers;
    if ('origin' in event.Records[0].cf.request.headers) {

        //The Request contains the Origin Header - Set CORS headers
        headers['access-control-allow-origin'] = [{
            key: 'Access-Control-Allow-Origin',
            value: "*"
        }];
        headers['access-control-allow-methods'] = [{
            key: 'Access-Control-Allow-Methods',
            value: "GET, PUT, POST"
        }];
        headers['access-control-allowe-headers'] = [{
            key: 'Access-Control-Allowed-Headers',
            value: "*"
        }];
        headers['access-control-max-age'] = [{
            key: 'Access-Control-Max-Age',
            value: "3000"
        }];
    }

    //Return modified response
    callback(null, response);
};