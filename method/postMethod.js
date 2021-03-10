const response = require('../response/response');

/**  
 * Method d'insertion dans la base de donnée génerique 
 * elle dois recevoir Keys = la signature de 
 * Values : les valeur 
 */
const postMethod = (req, res, connect) => {
  const { table } = req.query
  const { Keys, Values } = req.body

  const sql = `INSERT INTO ${table} (${Keys}) VALUES (${Values})`;
  connect.query(sql, (err, result, fields) => {
    if (err) {
      response(res, 500, 'error', err);
    }
    response(res, 200, '', result, fields);
  });
  connect.end();
};

module.exports = postMethod;
