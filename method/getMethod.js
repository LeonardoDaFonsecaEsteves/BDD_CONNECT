const response = require('../response/response');

const getMethod = (req, res, connect) => {
  const { table, query } = req.query
  const sql = `SELECT * FROM ${table} ${query && ' WHERE ' + query}`;
  connect.query(sql, (err, result, fields) => {
    if (err) {
      response(res, 500, 'error', err);
    }
    if (result.length) {
      response(res, 200, '', result, fields);
    } else {
      response(res, 204, '', 'no content')
    }
  });
  connect.end();
};

module.exports = getMethod;
