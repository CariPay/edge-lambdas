// Register this as the viewer-request trigger handler

'use strict';

const unauthorizedResponse = (message) => {
    return {
        status: '401',
        statusDescription: message || 'Unauthorized',
    };
};

const getValue = (data) => data && data.length ? data[0].value : null;

const checkDomainMatch = (host, referer) => {
    const hostName = getValue(host);
    const refererName = getValue(referer);

    console.log('Host name: ', hostName);
    console.log('Referer name: ', refererName);

    if (!hostName || !refererName) {
        return false;
    }
    const domainMatch = hostName.match(/[a-z]+.getqkyc.com/);
    console.log(domainMatch);
    if (!domainMatch || !domainMatch[0]) {
        return false;
    }
    return new RegExp(domainMatch[0]).test(refererName);
}

exports.checkDomainMatch = checkDomainMatch;
exports.getValue = getValue;

exports.handler = (event, context, callback) => {

    // Get request and request headers
    const request = event.Records[0].cf.request;
    const { host, referer } = request.headers;

    const domainMatches = checkDomainMatch(host, referer);
    
    console.log('Domains are the same:', domainMatches);
    if (!domainMatches) {
        callback(null, unauthorizedResponse('Invalid token access')); 
    }

    // Continue request processing if authentication passed
    callback(null, request)
};
