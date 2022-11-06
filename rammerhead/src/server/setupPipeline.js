const config = require('../config');
const getSessionId = require('../util/getSessionId');

/**
 * @param {import('../classes/RammerheadProxy')} proxyServer
 * @param {import('../classes/RammerheadSessionAbstractStore')} sessionStore
 */
module.exports = function setupPipeline(proxyServer, sessionStore) {
    // remove headers defined in config.js
    proxyServer.addToOnRequestPipeline((req, res, _serverInfo, isRoute) => {
        req["Access-Control-Allow-Origin"] = "*";
        req['Access-Control-Allow-Methods'] = '*';
        req["Access-Control-Allow-Headers"] = "*";
        res.setHeader("Content-Security-Policy", "frame-ancestors 'self' catsarecool.tk https://catsarecool.tk");
        if (isRoute) return; // only strip those that are going to the proxy destination website

        // restrict session to IP if enabled
        if (config.restrictSessionToIP) {
            const sessionId = getSessionId(req.url);
            const session = sessionId && sessionStore.get(sessionId);
            if (session && session.data.restrictIP && session.data.restrictIP !== config.getIP(req)) {
                res.writeHead(403);
                res.end('Sessions must come from the same IP');
                return true;
            }
        }

        for (const eachHeader of config.stripClientHeaders) {
            delete req.headers[eachHeader];
        }
    });
    Object.assign(proxyServer.rewriteServerHeaders, config.rewriteServerHeaders);
};
