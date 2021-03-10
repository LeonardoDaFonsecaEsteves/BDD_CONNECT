const logger = require('../logs/logger');

const response = (res, status, type, result, fields) => {
  switch (type) {
    case 'error':
      logger.error('[BDD] : ' + result);
      res.status(status).json({ level: type, message: result });
      break;
    default:
      logger.info(`[BDD] : status: ${status}`);
      res.status(status).json({ result: result, fields: fields });
      break;
  }
};

module.exports = response;
