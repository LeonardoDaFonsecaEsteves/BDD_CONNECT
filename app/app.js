const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('../logs/logger');
const get = require('../method/get');

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  );
  next();
});

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
);

app.use((req, _, next) => {
  logger.info(`  ${req.ip} - ${req.method}  -  ${req.originalUrl}`);
  next();
});

/**
 * get bdd result
 */
app.route('/').get((req, res, next) => get(req, res, next));

/**
 * update bdd
 */

module.exports = app;
