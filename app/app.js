const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('../logs/logger');
const bddConfig = require('../config/config');
const bddConnect = require('../mysql/connect');

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

app.all('/', (req, res) => {
  if (!!bddConfig[req.param('bdd')]) {
    const connect = bddConnect(bddConfig[req.param('bdd')]);
    if (!!req.param('query')) {
      connect.query(req.param('query'), (err, result, fields) => {
        if (err) {
          logger.error(err);
          res.status(500).json({
            level: 'error',
            message: err,
          });
        }
        logger.info(JSON.stringify(result));
        res.status(200).json({...result});
      });
    } else {
      logger.error('Requete SQL Invalid');
      res.status(500).json({
        level: 'error',
        message: 'Requete SQL Invalid',
      });
    }
    connect.end();
  } else {
    logger.error(`Aucune config pour ${bddConfig[req.param('bdd')]}`);
    res.status(500).json({
      level: 'error',
      message: `Aucune config pour ${bddConfig[req.param('bdd')]}`,
    });
  }
});

module.exports = app;
