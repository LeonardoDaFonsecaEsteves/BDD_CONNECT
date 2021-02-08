const bddConfig = require('./config.js');
const bddConnection = require('./connect.js');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const logger = require('./logs/logger.js');

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-HeBBD_CONNECT/nodaders',
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
  logger.info(`  ${req.originalUrl} - ${req.method}`);
  next();
});

app.all('/', (req, res) => {
  if (!!bddConfig[req.param('bdd')]) {
    const connect = bddConnection(BDD_CONFIG[req.param('bdd')]);
    if (!!req.param('query')) {
      connect.query(req.param('query'), (err, result, fields) => {
        if (err) {
          logger.error(err);
          res.json({
            level: 'error',
            message: err,
          });
        }
        logger.info(JSON.stringify(result));
        res.json({...result});
      });
    } else {
      logger.error('Requete SQL Invalid');
      res.json({
        level: 'error',
        message: 'Requete SQL Invalid',
      });
    }
    connect.end();
  } else {
    logger.error(`Aucune config pour ${bddConfig[req.param('bdd')]}`);
    res.json({
      level: 'error',
      message: `Aucune config pour ${bddConfig[req.param('bdd')]}`,
    });
  }
});

app.listen(port, () => {
  logger.info('BDD_CONNECTING RUN ');
});
