const mysql = require('mysql');
const express = require ('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = 3001;
app.use(cors());
app.use(bodyParser.json()); // Para analizar solicitudes con cuerpo en formato JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para analizar solicitudes con cuerpo en formato URL-encoded

app.use(session({
  secret: 'UA', // Cambia esto por una cadena secreta para firmar las cookies de sesión
  resave: false,
  saveUninitialized: false
}));


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

app.post('/api/iniciarSesion', (req, res) => {
  const { usuario, contraseña } = req.body; // Obtener usuario y contraseña del cuerpo de la solicitud

  // Consulta SQL para verificar las credenciales del usuario
  const SQL_QUERY = 'SELECT * FROM usuario WHERE usuario = ? AND contraseña = ?';
  connection.query(SQL_QUERY, [usuario, contraseña], (err, result) => {
    if (err) {
      console.error("Error al verificar las credenciales:", err);
      res.status(500).json({ error: "Error al verificar las credenciales" });
      return;
    }
    // Verifica si se encontró un usuario con las credenciales proporcionadas
    if (result.length > 0) {
      req.session.usuario = result[0];
      // Usuario autenticado, devolver datos del usuario
      res.status(200).json({ message: "Inicio de sesión exitoso"});
    } else {
      // Usuario no encontrado o credenciales incorrectas
      res.status(401).json({ error: "Usuario no encontrado o credenciales incorrectas" });
    }
  });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(); // Destruye la sesión
  res.status(200).json({ message: "Sesión cerrada correctamente" });
});

app.get('/api/publicaciones', (req, res) => {
  const SQL_QUERY = 'SELECT * FROM publicaciones';
  connection.query(SQL_QUERY, (err, result) => {
    if(err){
      console.error("Error al obtener las publicaciones:", err);
      res.status(500).json({ error: "Error al obtener las publicaciones" });
      return;
    }
    res.json(result);
  });
})

app.get('/api/publicaciones/:id', (req, res) => {
  const { id } = req.params;
  const SQL_QUERY = 'SELECT * FROM publicaciones where ID = ?';
  connection.query(SQL_QUERY, [id],(err, result) => {
    if(err){
      console.error("Error al obtener las publicaciones:", err);
      res.status(500).json({ error: "Error al obtener las publicaciones" });
      return;
    }
    res.json(result);
  });
})

app.get('/api/misPublicaciones', (req, res) => {
  const userId = req.session.usuario.id; // Suponiendo que el objeto de sesión contiene el ID del usuario
  const SQL_QUERY = 'SELECT * FROM publicaciones WHERE ID = ?';
  connection.query(SQL_QUERY, [userId], (err, result) => {
    if(err){
      console.error("Error al obtener las publicaciones del usuario:", err);
      res.status(500).json({ error: "Error al obtener las publicaciones del usuario" });
      return;
    }
    res.json(result);
  });
});

app.put('/api/ajustesUsuario', (req, res) => {
  const idUsuario = req.session.usuario.id;
  const { Nombre, Contraseña, Email, Descripcion, Color, Idioma, ModoDaltónico, Letra } = req.body; // Obtener datos del cuerpo de la solicitud

  let SQL_QUERY = 'UPDATE usuario SET ';
  const values = [];

  if (Nombre !== undefined) {
    SQL_QUERY += 'nombre = ?, ';
    values.push(Nombre);
  }
  if (Contraseña !== undefined) {
    SQL_QUERY += 'contraseña = ?, ';
    values.push(Contraseña);
  }
  if (Email !== undefined) {
    SQL_QUERY += 'email = ?, ';
    values.push(Email);
  }
  if (Descripcion !== undefined) {
    SQL_QUERY += 'descripcion = ?, ';
    values.push(Descripcion);
  }
  if (Color !== undefined) {
    SQL_QUERY += 'color = ?, ';
    values.push(Color);
  }
  if (Idioma !== undefined) {
    SQL_QUERY += 'idioma = ?, ';
    values.push(Idioma);
  }
  if (ModoDaltónico !== undefined) {
    SQL_QUERY += 'daltonico = ?, ';
    values.push(ModoDaltónico);
  }
  if (Letra !== undefined) {
    SQL_QUERY += 'letra = ?, ';
    values.push(Letra);
  }

  // Elimina la coma y el espacio extra al final de la cadena SQL
  SQL_QUERY = SQL_QUERY.slice(0, -2);

  // Agrega la condición WHERE
  SQL_QUERY += ' WHERE id = 1';

  console.log('SQL Query:', SQL_QUERY); // Agregamos esto para verificar la consulta SQL generada

  // Inserta los datos en la base de datos
  connection.query(SQL_QUERY, values, (err, result) => {
    if (err) {
      console.error("Error al modificar los datos:", err);
      res.status(500).json({ error: "Error al modificar los datos" });
      return;
    }
    console.log("Datos modificados correctamente en la base de datos");
    res.status(200).json({ message: "Datos modificados correctamente" });
  });
});

app.get('/api/perfil', (req, res) => {
  const SQL_QUERY = 'SELECT * FROM usuario';
  connection.query(SQL_QUERY, [idUsuario], (err, result) => {
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
