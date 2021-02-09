const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('../logs/logger');
const getMethod = require('../method/getMethod');
const postMethod = require('../method/postMethod');
const putMethod = require('../method/putMethod');
const delMethod = require('../method/delMethod');

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

app.get('/', (req, res, next) => getMethod(req, res, next));
app.put('/', (req, res, next) => putMethod(req, res, next));
app.post('/', (req, res, next) => postMethod(req, res, next));
app.delete('/', (req, res, next) => delMethod(req, res, next));

module.exports = app;
