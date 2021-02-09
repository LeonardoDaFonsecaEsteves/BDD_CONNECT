const bddConfig = require('../config/config');
const bddConnect = require('../mysql/connect');
const response = require('../response/response');

const getMethod = (req, res, next) => {
  if (!!bddConfig[req.param('bdd')]) {
    const connect = bddConnect(bddConfig[req.param('bdd')]);
    if (!!req.param('query')) {
      connect.query(req.param('query'), (err, result, fields) => {
        if (err) {
          response(res, 500, 'error', err);
        }
        response(res, 200, '', result);
      });
    } else {
      response(res, 500, 'error', 'Requete SQL Invalid');
    }
    connect.end();
  } else {
    response(
        res,
        500,
        'error',
        `Aucune config pour ${bddConfig[req.param('bdd')]}`,
    );
  }
};

module.exports = getMethod;
