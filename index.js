'use strict';

exports.handler = (event, context, callback) => {
    console.log(event)
    const response = event.Records[0].cf.response;
    const headers = response.headers;

    response.headers['Strict-Transport-Security'] = [{
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload',
    }];
    response.headers['X-XSS-Protection'] = [{
        key: 'X-XSS-Protection',
        value: '1; mode=block',
    }];
    response.headers['X-Content-Type-Options'] = [{
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    }];
    response.headers['X-Frame-Options'] = [{
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
    }];
    response.headers['Referrer-Policy'] = [{
        key: 'Referrer-Policy',
        value: 'no-referrer-when-downgrade',
    }];
    response.headers['Content-Security-Policy'] = [{
        key: 'Content-Security-Policy',
        value: `default-src 'none'; base-uri: 'self'; form-action 'self'; connect-src 'self'; font-src 'self' fonts.gstatic.com; frame-src 'self'; img-src 'self'; script-src 'self'; style-src 'self' fonts.googleapis.com; upgrade-insecure-requests; frame-ancestors 'none';`
    }];

    response.headers['Feature-Policy'] = [{
        key: 'Feature-Policy',
        value: `geolocation 'self';`
    }];
    callback(null, response);

};
