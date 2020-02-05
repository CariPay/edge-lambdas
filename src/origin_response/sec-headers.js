// Register this as the origin-response trigger handler
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
        value: `default-src 'none'; form-action 'self'; connect-src 'self' https://*.getqkyc.com; font-src 'self' fonts.gstatic.com; frame-src 'self'; img-src 'self' www.google-analytis.com; script-src 'self' www.google-analytis.com; style-src 'self' fonts.googleapis.com; upgrade-insecure-requests; frame-ancestors 'none';`
        // @Question: what is base-uri: 'self'; doing?
    }];

    response.headers['Feature-Policy'] = [{
        key: 'Feature-Policy',
        value: `geolocation 'self';`
    }];
    callback(null, response);

};
