require('dotenv').config();
const express = require('express');
const cors = require('cors');
const verifyRequest = require('./middleware/verify-request');
const graphQLProxy = require('./middleware/shopify-graphql-proxy');
const logger = require('morgan');

const app = express();

const {
  SHARED_SECRET,
  ACCESS_TOKEN,
  SHOP
} = process.env;

app.use(logger('dev'));
app.use(cors());
app.use(verifyRequest({ secret: SHARED_SECRET }));
app.use(graphQLProxy({ accessToken: ACCESS_TOKEN, shop: SHOP }));

module.exports = app;
