/* eslint-disable new-cap */
const winston = require('winston');

const formatLogger = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({format: 'DD/MM/YYYY HH:mm -'}),
    winston.format.json(),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
);

const options = {
  file: {
    level: 'debug',
    filename: '../logs/bdd_connect.log',
    format: winston.format.combine(
        winston.format.timestamp({format: 'DD/MM/YYYY HH:mm -'}),
        winston.format.json(),
        winston.format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
    ),
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: true,
    format: formatLogger,
  },
};

const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

module.exports = logger;
