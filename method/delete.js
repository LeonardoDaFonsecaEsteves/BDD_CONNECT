const response = require('../response/response');

const del = (req, res, next) => {
  response(res, 500, 'error', 'Not Function');
  next();
};

module.exports = del;
