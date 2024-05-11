const mysql = require('mysql');
const express = require ('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');

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
  password: 'lhc15',
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
      const user = result[0];
      console.log(user);
      // Devolver datos del usuario para uso en el cliente
      res.status(200).json({
        message: "Inicio de sesión exitoso desde el backend",
        user: { id: user.id, usuario: user.usuario }
      });
    } else {
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
  const SQL_QUERY = 'SELECT p.*, u.nombre AS nombre_usuario, u.id as id_usuario FROM publicaciones p INNER JOIN usuario u ON p.autor = u.id WHERE p.id = ?';
  connection.query(SQL_QUERY, [id], (err, result) => {
    if (err) {
      console.error("Error al obtener las publicaciones:", err);
      res.status(500).json({ error: "Error al obtener las publicaciones" });
      return;
    }
    res.json(result);
  });
});

app.get('/api/misPublicaciones/:userId', (req, res) => {
  const userId = req.params.userId;
  const SQL_QUERY = `SELECT * FROM publicaciones WHERE autor = ${userId}`;
  connection.query(SQL_QUERY, (err, result) => {
    if(err){
      console.error("Error al obtener las publicaciones del usuario:", err);
      res.status(500).json({ error: "Error al obtener las publicaciones del usuario" });
      return;
    }
    res.json(result);
  });
});

app.put('/api/ajustesUsuario', (req, res) => {
  // Obtener el ID del usuario
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
  SQL_QUERY += ' WHERE id = ?';

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
    
  })
});



app.get('/api/perfil/:idUsuario', (req, res) => {
  const { idUsuario } = req.params;
  const SQL_QUERY = 'SELECT * FROM usuario WHERE id = ?';
  connection.query(SQL_QUERY, [idUsuario], (err, result) => {
    if (err) {
      console.error("Error al obtener el perfil del usuario:", err);
      res.status(500).json({ error: "Error al obtener el perfil del usuario" });
    } else {
      res.json(result);
    }
  });
});

app.get('/api/busqueda', (req, res) => {
      const { busqueda } = req.query; // Recibe el término de búsqueda desde la URL
  
      // Realiza la consulta a la base de datos para buscar fotos según el término de búsqueda
      const SQL_QUERY = 'SELECT * FROM publicaciones WHERE nombre LIKE ?';
      connection.query(SQL_QUERY, [`%${busqueda}%`], (err, result) => {
          if (err) {
              console.error("Error al buscar fotos:", err);
              res.status(500).json({ error: "Error al buscar fotos" });
              return;
          }
          res.json(result);
      });
  });

  app.post('/api/registro', (req, res) => {
    const { nombre, usuario, contraseña, email, titulacion, repetir_contraseña } = req.body;

    // Verificar si el usuario ya está registrado
    const SQL_QUERY = 'SELECT * FROM usuario WHERE usuario = ?';
    connection.query(SQL_QUERY, [usuario], (err, result) => {
        if (err) {
            console.error("Error al verificar el usuario:", err);
            res.status(500).json({ error: "Error al verificar el usuario" });
            return;
        }

        if (result.length > 0) {
            res.status(400).json({ error: "El usuario ya está registrado" });
        } else {
            // Insertar el nuevo usuario en la base de datos
            const INSERT_QUERY = 'INSERT INTO usuario (nombre, usuario, contraseña, email, titulacion, repetircontraseña) VALUES (?, ?, ?, ?, ?, ?)';
            connection.query(INSERT_QUERY, [nombre, usuario, contraseña, email, titulacion, repetir_contraseña], (err, result) => {
                if (err) {
                    console.error("Error al registrar el usuario:", err);
                    res.status(500).json({ error: "Error al registrar el usuario" });
                    return;
                }
                console.log('SQL Query:', SQL_QUERY);
                console.log("Usuario registrado correctamente");
                res.status(200).json({ message: "Usuario registrado correctamente" });
            });
        }
    });
});

app.delete('/api/borrarUsuario/:id', (req, res) => {
  const { id } = req.params;
  const DELETE_QUERY = 'DELETE FROM usuario WHERE id = ?';
  connection.query(DELETE_QUERY, [id], (err, result) => {
    if (err) {
      console.error("Error al borrar el usuario:", err);
      res.status(500).json({ error: "Error al borrar el usuario" });
      return;
    }
    res.json({ message: "Usuario borrado correctamente" });
  });
});

app.listen(PORT, () =>{
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});

//module.exports = connection;


//PARA LA PARTE DE SUBIR ARCHIVOS

//primero configuramos multer para que nos cree el directorio uploads si no lo tenemos
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Verifica si el directorio existe, si no, lo crea
const uploadsDir = path.join(__dirname, 'uploads');
fs.existsSync(uploadsDir) || fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

//ahora para que se compenetre con la bd
app.post('/api/subirArchivo', upload.single('file'), (req, res) => {
  const { titulo, etiquetas, tipo_archivo, descripcion } = req.body;
  const file = req.file;
  const SQL_QUERY = `INSERT INTO publicacion (titulo, etiquetas, tipo_archivo, descripcion, ruta_archivo) VALUES (?, ?, ?, ?, ?)`;

  connection.query(SQL_QUERY, [titulo, etiquetas, tipo_archivo, descripcion, file.path], (err, result) => {
    if (err) {
      console.error("Error al insertar los datos:", err);
      res.status(500).json({ error: "Error al insertar los datos" });
      return;
    }
    res.status(200).json({ message: "Archivo subido y datos guardados correctamente" });
  });
});
