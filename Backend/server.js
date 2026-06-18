const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Conexión a MySQL usando variables de entorno (Railway las inyecta automáticamente)
const db = mysql.createConnection({
  host:     process.env.MYSQLHOST     || 'mysql.railway.internal',
  user:     process.env.MYSQLUSER     || 'root',
  password: process.env.MYSQLPASSWORD || 'ekicWfoxWuhFySJJgxoTaAUZxSYfOZZj',
  database: process.env.MYSQLDATABASE || 'rayway',
  port:     process.env.MYSQLPORT     || 3306,
  ssl: process.env.MYSQLHOST ? { rejectUnauthorized: false } : false
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err.message);
    return;
  }
  console.log('Conectado a MySQL correctamente.');

  // Crear tabla e insertar datos si no existen (útil en Railway desde cero)
  db.query(`
    CREATE TABLE IF NOT EXISTS tareas (
      id    INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      url    VARCHAR(500) NOT NULL
    )
  `, (err) => {
    if (err) return console.error('Error creando tabla:', err.message);

    db.query('SELECT COUNT(*) AS total FROM tareas', (err, rows) => {
      if (!err && rows[0].total === 0) {
        db.query(`
          INSERT INTO tareas (titulo, url) VALUES
            ('Tarea 1 - Página Web en HTML',       'https://github.com/usuario/tarea1-html'),
            ('Tarea 2 - Estilos con CSS',           'https://github.com/usuario/tarea2-css'),
            ('Tarea 3 - JavaScript Interactivo',    'https://github.com/usuario/tarea3-js'),
            ('Tarea 4 - API REST con Node.js',      'https://github.com/usuario/tarea4-api'),
            ('Tarea 5 - Base de Datos MySQL',       'https://github.com/usuario/tarea5-mysql')
        `, () => console.log('Tareas de ejemplo insertadas.'));
      }
    });
  });
});

// GET /tareas — Retorna todas las tareas
app.get('/tareas', (req, res) => {
  db.query('SELECT id, titulo, url FROM tareas', (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err.message);
      return res.status(500).json({ error: 'Error al consultar la base de datos.' });
    }
    res.json(results);
  });
});

const path = require('path');

fetch('/tareas') 
  .then(response => response.json())
  .then(data => {
    console.log(data); 
   
  });

app.use(express.static('Frontend')); 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
