const response = require('../response/response');

const delMethod = (req, res, next) => {
  const {  table, query } = req.query
  const sql = `DELETE FROM ${table} WHERE ${query}`;
  connect.query(sql, (err, result, fields) => {
    if (err) {
      response(res, 500, 'error', err);
    }
    response(res, 200, '', result, fields);
  });
  connect.end();

};

module.exports = delMethod;
