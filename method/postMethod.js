const response = require('../response/response');

const postMethod = (req, res, next) => {
  response(res, 500, 'error', 'Not Function');
  next();
};

module.exports = postMethod;
