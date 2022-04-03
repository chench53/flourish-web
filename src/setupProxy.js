const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/ipfs-api',
    createProxyMiddleware({
      target: process.env.REACT_APP_IPFS_API,
      changeOrigin: true,
      pathRewrite: {
        '^/ipfs-api': ''
        }
    })
  );
  app.use(
    '/ipfs-gateway',
    createProxyMiddleware({
      target: process.env.REACT_APP_IPFS_GATEWAY,
      changeOrigin: true,
      pathRewrite: {
        '^/ipfs-gateway': ''
        }
    })
  );
};