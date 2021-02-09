const logger = require('../logs/logger');

const response = (res, status, type, resulte) => {
  switch (type) {
    case 'error':
      logger.error(resulte);
      res.status(status).json({
        level: type,
        message: resulte,
      });
      break;
    default:
      logger.info(
          `status: ${status}, resulte: ${JSON.stringify(resulte)}  `,
      );
      res.status(status).json({...resulte});
      break;
  }
};

module.exports = response;
