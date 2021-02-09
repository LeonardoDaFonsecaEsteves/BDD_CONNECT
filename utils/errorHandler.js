const {ERROR_CONSTANT} = require('../constant/error.constant');
const logger = require('../logs/logger');

const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind =
        typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case ERROR_CONSTANT.EACCES:
      logger.error(bind + ERROR_CONSTANT.RequiresPrivileges);
      process.exit(1);
    case ERROR_CONSTANT.EADDRINUSE:
      logger.error(bind + ERROR_CONSTANT.AlreadyUse);
      process.exit(1);
    default:
      throw error;
  }
};

module.exports = errorHandler;
