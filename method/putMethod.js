const response = require('../response/response');

/**  
 * Method de mise a jour dans la base de donnée génerique 
 * elle dois recevoir un object update :{
 *  key1 = "value",
 *  key2 = "['val1', 'val2']"
 *  key3 = "{'k1':'v1','k2':'['v2']'}"
 *  key4 = 5
 * }
 */
const putMethod = (req, res, connect) => {
  const { table, query } = req.query
  const { Keys, Values } = req.body

  for(let i = 0 ; i < Keys.length; i++){
    const sql = `UPDATE ${table} SET ${Keys[i]}=${JSON.stringify(Values[i])} WHERE ${query}`;
      if (!!query) {
        connect.query(sql, (err, result, fields) => {
          if (err) {
            response(res, 500, 'error', err);
          }
          response(res, 200, '', result, fields);
        });
      }
    }
    connect.end();
  };

module.exports = putMethod;
