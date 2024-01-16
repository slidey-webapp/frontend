const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    console.log('host: ', process.env.REACT_APP_PROXY_API_HOST)
    console.log('api url: ', process.env.REACT_APP_API_URL)
    console.log('node: ', process.env.NODE_ENV)

    app.use(
        process.env.REACT_APP_API_URL ?? '/api',
        createProxyMiddleware({
            target: process.env.REACT_APP_PROXY_API_HOST,
            changeOrigin: true,
        }),
    );
};
