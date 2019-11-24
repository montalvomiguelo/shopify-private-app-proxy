const createError = require('http-errors');
const proxy = require('express-http-proxy');

const PROXY_BASE_PATH = '/graphql';
const GRAPHQL_PATH = '/admin/api/2019-10/graphql.json';

const shopifyGraphQLProxy = ({ accessToken, shop }) => {
  return (req, res, next) => {
    if (req.path !== PROXY_BASE_PATH || req.method !== 'POST') {
      return next();
    }

    if (!accessToken || !shop) {
      return next(createError(403, 'Unauthorized'));
    }

    proxy(shop, {
      https: true,
      parseReqBody: false,
      headers: {
        'X-Shopify-Access-Token': accessToken
      },
      proxyReqPathResolver() {
        return `https://${shop}${GRAPHQL_PATH}`;
      }
    })(req, res, next);
  };
};

module.exports = shopifyGraphQLProxy;
