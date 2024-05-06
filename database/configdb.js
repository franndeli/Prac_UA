const mysql = require('mysql');
const express = require ('express');
const cors = require ('cors');

const app = express();
const PORT = 3001;
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'prac_ua'
});

connection.connect(error => {
  if (error) throw error;
  console.log("Conectado correctamente a la base de datos");
});


app.get('/api/perfilPrivado', (req, res) => {
  const SQL_QUERY = 'SELECT * FROM usuario';
  connection.query(SQL_QUERY, (err, result) => {
    if(err){
      throw err;
    }
    res.json(result);
  });
});

app.listen(PORT, () =>{
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});

//module.exports = connection;
