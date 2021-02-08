//* ********************************************
// connection to mySQL
const mysql = require('mysql');

const bddConnect = (config) => {
  const connection = mysql.createConnection({...config});

  connection.connect((error) => {
    if (error) {
      console.log('connection to MySQL failed');
      throw error;
    }
  });
  return connection;
};

module.exports = bddConnect;
