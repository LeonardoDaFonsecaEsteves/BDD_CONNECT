const bddConfig = require('../config/config');
const bddConnect = require('../mysql/connect');
const response = require('../response/response');

const get = (req, res, next) => {
  if (!!bddConfig[req.param('bdd')]) {
    const connect = bddConnect(bddConfig[req.param('bdd')]);
    if (!!req.param('query')) {
      connect.query(req.param('query'), (err, result, fields) => {
        if (err) {
          response(res, 500, 'error', err);
          next();
        }
        response(res, 200, '', result);
        next();
      });
    } else {
      response(res, 500, 'error', 'Requete SQL Invalid');
      next();
    }
    connect.end();
    next();
  } else {
    response(
        res,
        500,
        'error',
        `Aucune config pour ${bddConfig[req.param('bdd')]}`,
    );
    next();
  }
};

module.exports = get;
