const response = require('../response/response');

const delMethod = (req, res, next) => {
  response(res, 500, 'error', 'Not Function');
};

module.exports = delMethod;
