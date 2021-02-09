const response = require('../response/response');

const put = (req, res, next) => {
  response(res, 500, 'error', 'Not Function');
  next();
};

module.exports = put;
