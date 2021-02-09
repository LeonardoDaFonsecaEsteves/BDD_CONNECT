//* ********************************************
// connection to mySQL
const mysql = require('mysql');
const logger = require('./logs/logger.js');
const bddConnect = (config) => {
  const connection = mysql.createConnection({...config});

  connection.connect((error) => {
    if (error) {
      logger.error('connection to MySQL failed');
      throw error;
    }
  });
  return connection;
};

module.exports = bddConnect;
