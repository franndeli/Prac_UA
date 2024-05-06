const express = require('express');
const router = express.Router();

// Esta función acepta la conexión a la base de datos como parámetro
const configdb = (connection) => {
  router.get('/perfil', (req, res) => {
    const SQL_QUERY = 'SELECT * FROM usuario';
    // Utiliza la conexión proporcionada para ejecutar la consulta
    connection.query(SQL_QUERY, (err, result) => {
      if(err){
        throw err;
      }
      res.json(result);
    });
  });

  return router;
};

module.exports = router;