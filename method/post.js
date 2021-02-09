const response = require('../response/response');

const post = (req, res, next) => {
  response(res, 500, 'error', 'Not Function');
  next();
};

module.exports = post;
