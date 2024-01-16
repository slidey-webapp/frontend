const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        process.env.REACT_APP_API_URL ?? '/api',
        createProxyMiddleware({
            target: process.env.REACT_APP_PROXY_API_HOST,
            changeOrigin: true,
        }),
    );
};
