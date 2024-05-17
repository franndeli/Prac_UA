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


app.get('/api/publicaciones', (req, res) => {
  const SQL_QUERY = 'SELECT * FROM publicacion';
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
  const SQL_QUERY = 'SELECT p.*, u.nombre AS nombre_usuario, u.id as id_usuario FROM publicacion p INNER JOIN usuario u ON p.autor = u.id WHERE p.id = ?';
  connection.query(SQL_QUERY, [id], (err, result) => {
    if (err) {
      console.error("Error al obtener las publicaciones:", err);
      res.status(500).json({ error: "Error al obtener las publicaciones" });
      return;
    }
    res.json(result);
  });
});

app.get('/api/misPublicaciones/:id', (req, res) => {
  const userId = req.params.id; // Obtener userId de los parámetros de la solicitud
  const SQL_QUERY = 'SELECT * FROM publicacion WHERE autor = ?';
  connection.query(SQL_QUERY, [userId], (err, result) => {
    if(err){
      console.error("Error al obtener las publicaciones del usuario:", err);
      res.status(500).json({ error: "Error al obtener las publicaciones del usuario" });
      return;
    }
    res.json(result);
  });
});

app.put('/api/ajustesUsuario/:id', (req, res) => {
  // Obtener el ID del usuario
  const userId = req.params.id;
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
  connection.query(SQL_QUERY, [...values, userId], (err, result) => {
    if (err) {
      console.error("Error al modificar los datos:", err);
      res.status(500).json({ error: "Error al modificar los datos" });
      return;
    }
    console.log("Datos modificados correctamente en la base de datos");
    res.status(200).json({ message: "Datos modificados correctamente" });
    
  })
});

app.put('/api/guardarPubli/:idpubli', (req, res) => {
  // Obtener el ID del usuario
  const idpubli = req.params.idpubli;
  let SQL_QUERY = 'UPDATE publicacion SET guardado = 1 WHERE id = ?';

  connection.query(SQL_QUERY, [idpubli], (err, result) => {
    if (err) {
      console.error("Error al guardar la publicación:", err);
      res.status(500).json({ error: "Error al guardar la publicación" });
      return;
    }
    console.log("Archivo guardado correctamente");
    res.status(200).json({ message: "Archivo guardado correctamente" });
    
  })
});

app.put('/api/desguardarPubli/:idpubli', (req, res) => {
  // Obtener el ID del usuario
  const idpubli = req.params.idpubli;
  let SQL_QUERY = 'UPDATE publicacion SET guardado = 0 WHERE id = ?';

  connection.query(SQL_QUERY, [idpubli], (err, result) => {
    if (err) {
      console.error("Error al desguardar la publicación:", err);
      res.status(500).json({ error: "Error al desguardar la publicación" });
      return;
    }
    console.log("Archivo desguardado correctamente");
    res.status(200).json({ message: "Archivo desguardado correctamente" });
    
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

app.get('/api/titulaciones', (req, res) => {
  const SQL_QUERY = 'SELECT nombre FROM titulaciones';
  connection.query(SQL_QUERY, (err, results) => {
      if (err) {
          console.error("Error al obtener las titulaciones:", err);
          res.status(500).json({ error: "Error al obtener las titulaciones" });
          return;
      }
      res.json(results);
  });
});

app.get('/api/tipo_academico', (req, res) => {
  const SQL_QUERY = 'SELECT nombre FROM tipo_academico';
  connection.query(SQL_QUERY, (err, results) => {
      if (err) {
          console.error("Error al obtener los tipo_academico:", err);
          res.status(500).json({ error: "Error al obtener los tipo_academico" });
          return;
      }
      res.json(results);
  });
});

app.get('/api/publicacion_tipo/:id', (req, res) => {
  const SQL_QUERY = 'SELECT * FROM tipo_academico';
  connection.query(SQL_QUERY, (err, results) => {
      if (err) {
          console.error("Error al obtener los tipo_academico:", err);
          res.status(500).json({ error: "Error al obtener los tipo_academico" });
          return;
      }
      res.json(results);
  });
});

app.get('/api/busqueda', (req, res) => {
      const { busqueda } = req.query; // Recibe el término de búsqueda desde la URL
  
      // Realiza la consulta a la base de datos para buscar fotos según el término de búsqueda
      const SQL_QUERY = 'SELECT * FROM publicacion WHERE nombre LIKE ?';
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
    // console.log(req.body);

    // Verificar si la titulación existe utilizando el nombre de la titulación
    const TITULACION_QUERY = 'SELECT id FROM titulaciones WHERE nombre = ?';
    // console.log(TITULACION_QUERY);
    connection.query(TITULACION_QUERY, [titulacion], (err, result) => {
        if (err) {
            console.error("Error al verificar la titulación:", err);
            res.status(500).json({ error: "Error al verificar la titulación" });
            return;
        }

        if (result.length === 0) {
            res.status(400).json({ error: "La titulación no existe" });
            return;
        }

        const titulacionId = result[0].id;

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
                connection.query(INSERT_QUERY, [nombre, usuario, contraseña, email, titulacionId, repetir_contraseña], (err, result) => {
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

app.get('/api/mostrarComentarios/:idPublicacion', (req, res) => {
  const idPublicacion = req.params.idPublicacion;
  const query = 'SELECT c.*, u.usuario AS usuario FROM comentarios c , publicacion p, usuario u where p.id = ? and p.autor = u.id and c.id_publicacion = p.id';

  connection.query(query, [idPublicacion] ,(error, results) => {
    if (error) {
      console.error('Error al obtener comentarios:', error);
      res.status(500).json({ error: 'Error al obtener comentarios' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/biblioteca', (req, res) => {
  const idPublicacion = req.params.idPublicacion;
  const query = 'SELECT * FROM publicacion WHERE guardado = 1';

  connection.query(query, [idPublicacion] ,(error, results) => {
    if (error) {
      console.error('Error al obtener publicaciones de tu biblioteca:', error);
      res.status(500).json({ error: 'Error al obtener publicaciones de tu biblioteca' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/guardarComentarios', (req, res) => {
  const { comment, rating, userId ,photoId, commentTitle} = req.body;

  const query = 'INSERT INTO comentarios (id_usuario, id_publicacion, comentario, valoraciones, titulo) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [userId, photoId, comment, rating, commentTitle], (error, result) => {
    if (error) {
      console.error('Error al crear comentario:', error);
      res.status(500).json({ error: 'Error al crear comentario' });
    }else{
      res.status(200).json("Comentario subido con exito");
    }
  });
});

app.get('/api/datosUsuarioPubli/:idPublicacion', (req, res) => {
  const idPublicacion = req.params.idPublicacion;

  const query = 'SELECT u.*, p.*, COUNT(valoraciones) AS totalValoraciones, ROUND(AVG(c.valoraciones)) as Valor, u.id as id_usuario FROM publicacion p, usuario u, comentarios c where p.id = ? and p.autor = u.id and c.id_publicacion = p.id';
  connection.query(query, [idPublicacion] ,(error, results) => {
    if (error) {
      console.error('Error al obtener comentarios:', error);
      res.status(500).json({ error: 'Error al obtener comentarios' });
    } else {
      res.json(results);
    }
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

const uploadsDir = path.join(__dirname, 'uploads');

// Verifica si el directorio existe, si no, lo crea
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
app.use('/uploads', express.static('uploads'));

app.post('/api/subirArchivo/:userId', upload.fields([{ name: 'file' }, { name: 'file-array' }]), async (req, res) => {
  const userId = req.params.userId;

  const { titulo, etiquetas, tipoArchivo, descripcion } = req.body;
  const singleFilePath = req.files['file'][0].path;

  // Obtén solo el nombre del archivo único
  const singleFileName = path.basename(singleFilePath);

  // Obtén solo los nombres de los archivos múltiples
  const multipleFilesNames = req.files['file-array'].map((file) => {
    const filePath = file.path;
    const fileName = path.basename(filePath);
    return fileName;
  });

  try {
    const TIPO_ARCHIVO_QUERY = 'SELECT id FROM tipo_academico WHERE nombre = ?';
    console.log(TIPO_ARCHIVO_QUERY);

    connection.query(TIPO_ARCHIVO_QUERY, [tipoArchivo], (err, result) => {
      // console.log('hola')
      if (err) {
        console.error("Error al verificar el tipo de archivo:", err);
        res.status(500).json({ error: "Error al verificar el tipo de archivo" });
        return;
      }

      console.log('hola1')
      console.log(tipoArchivo);

      if (result.length === 0) {
        res.status(400).json({ error: "El tipo de archivo no existe" });
        return;
      }

      const tipoArchivoId = result[0].id;
      
      const query = 'INSERT INTO publicacion (autor, titulo, etiquetas, tipo_archivo, descripcion, ruta_archivo, ruta_archivo_array) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [userId, titulo, etiquetas, tipoArchivoId, descripcion, singleFileName, multipleFilesNames.join(',')];

      connection.query(query, values, (err, result) => {
        if (err) {
          console.error('Error al insertar archivo en la base de datos:', err);
          res.status(500).send('Error al subir archivo aaaaaaaaaaaaaaah');
        } else {
          res.status(200).send('Archivo subido correctamente');
        }
      });
    });
  } catch (error) {
    console.error("Error al redimensionar la imagen:", error);
    res.status(500).json({ error: "Error al redimensionar la imagen" });
  }
});