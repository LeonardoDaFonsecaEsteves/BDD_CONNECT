const response = require('../response/response');

const putMethod = (req, res, next) => {
  response(res, 500, 'error', 'Not Function');
};

module.exports = putMethod;
