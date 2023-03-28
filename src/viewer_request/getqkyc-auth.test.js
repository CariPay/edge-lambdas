const { checkDomainMatch } = require('./getqkyc-auth');

test('Expect that when host and referer are the same, domain match is true', () => {
    const referer = [ { key: 'referer', value: 'https://cp-admin.dev.getqkyc.com/' } ];
    const host = [ { key: 'Host', value: 'assets-cp-credential-ocr.dev.getqkyc.com' } ];

    const domainMatches = checkDomainMatch(host, referer);
    expect(domainMatches).toBe(true);
});

test('Expect that when host and referer are different, domain match is false', () => {
    const referer = [ { key: 'referer', value: 'https://cp-admin.dev.getqkyc.com/' } ];
    const host = [ { key: 'Host', value: 'assets-cp-credential-ocr.dev.api.d-id.mobi' } ];

    const domainMatches = checkDomainMatch(host, referer);
    expect(domainMatches).toBe(false);
});

test('Expect that when host and referer are the same but in different stages, domain match is false', () => {
    // Prevent viewing data from different stages
    const referer = [ { key: 'referer', value: 'https://cp-admin.dev.getqkyc.com/' } ];
    const host = [ { key: 'Host', value: 'assets-cp-credential-ocr.qa-1.getqkyc.com' } ];

    const domainMatches = checkDomainMatch(host, referer);
    expect(domainMatches).toBe(false);
});

test('Expect that when there is no refer, domain match is false', () => {
    // This situation can happen if the user clicks on the link directly
    const referer = undefined;
    const host = [ { key: 'Host', value: 'assets-cp-credential-ocr.dev.api.d-id.mobi' } ];

    const domainMatches = checkDomainMatch(host, referer);
    expect(domainMatches).toBe(false);
});