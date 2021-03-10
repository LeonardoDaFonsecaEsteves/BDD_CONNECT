const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('../logs/logger');
const getMethod = require('../method/getMethod');
const postMethod = require('../method/postMethod');
const putMethod = require('../method/putMethod');
const delMethod = require('../method/delMethod');
const bddConnect = require('../mysql/connect');
const bddConfig = require('../config/config');
const response = require('../response/response');

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
  const { bdd } = req.query
  logger.info(`[BDD] : ${bdd} | IP: ${req.ip} - ${req.method}`);
  next();
});

app.get('/', (req, res, next) => {
  const { bdd } = req.query
  if (!!bddConfig[bdd]) {
    const connect = bddConnect(bddConfig[bdd])
    return getMethod(req, res, connect);
  }
  const error = new Error(`Aucune config pour ${bddConfig[bdd]}`);
  error.status = 500;
  next(error);
})

app.put('/', (req, res, next) => {
  const { bdd } = req.query
  if (!!bddConfig[bdd]) {
    const connect = bddConnect(bddConfig[bdd])
    return putMethod(req, res, connect);
  }
  const error = new Error(`Aucune config pour ${bddConfig[bdd]}`);
  error.status = 500;
  next(error);

})

app.post('/', (req, res, next) => {
  const { bdd } = req.query
  if (!!bddConfig[bdd]) {
    const connect = bddConnect(bddConfig[bdd])
    return postMethod(req, res, connect);
  }
  const error = new Error(`Aucune config pour ${bddConfig[bdd]}`);
  error.status = 500;
  next(error);
})


app.delete('/', (req, res, next) => {
  const { bdd } = req.query
  if (!!bddConfig[bdd]) {
    const connect = bddConnect(bddConfig[bdd])
    return delMethod(req, res, connect);
  }
  const error = new Error(`Aucune config pour ${bddConfig[bdd]}`);
  error.status = 500;
  next(error);
})

// error handler middleware
app.use((error, req, res) => {
  logger.error(
    `[BDD] : STATUS: ${error.status}, ${error.message} -
    IP: ${req.ip} - URL: ${req.originalUrl}`,
  );
  res.status(error.status || 500).send({
    status: error.status,
    message: error.message
  });
});



module.exports = app;
