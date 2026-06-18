const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('./')); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// Conexión a MySQL usando variables de entorno de Railway
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306,
  ssl: { rejectUnauthorized: false } // Necesario para conexiones externas a Railway
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err.message);
    return;
  }
  console.log('Conectado a MySQL correctamente.');

  // Inicialización: Crear tabla si no existe
  db.query(`
    CREATE TABLE IF NOT EXISTS tareas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      url VARCHAR(500) NOT NULL
    )
  `, (err) => {
    if (err) return console.error('Error creando tabla:', err.message);

    // Insertar datos solo si la tabla está vacía
    db.query('SELECT COUNT(*) AS total FROM tareas', (err, rows) => {
      if (!err && rows[0].total === 0) {
        db.query(`
          INSERT INTO tareas (titulo, url) VALUES
            ('Tarea 1 - Página Web en HTML', 'https://github.com/usuario/tarea1-html'),
            ('Tarea 2 - Estilos con CSS', 'https://github.com/usuario/tarea2-css'),
            ('Tarea 3 - JavaScript Interactivo', 'https://github.com/usuario/tarea3-js'),
            ('Tarea 4 - API REST con Node.js', 'https://github.com/usuario/tarea4-api'),
            ('Tarea 5 - Base de Datos MySQL', 'https://github.com/usuario/tarea5-mysql')
        `, () => console.log('Tareas de ejemplo insertadas.'));
      }
    });
  });
});

// Ruta principal para servir el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/index.html'));
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

const fs = require('fs');

app.get('/debug', (req, res) => {
    const rootDir = process.cwd(); // ¿Dónde está parado el servidor realmente?
    const frontendDir = path.join(rootDir, 'Frontend'); 
    
    let mensaje = `Directorio raíz del servidor: ${rootDir}<br>`;
    
    if (fs.existsSync(frontendDir)) {
        const archivos = fs.readdirSync(frontendDir);
        mensaje += `¡La carpeta Frontend SÍ existe! Contiene: ${archivos.join(', ')}`;
    } else {
        mensaje += `ERROR: La carpeta 'Frontend' NO existe en ${frontendDir}.<br>`;
        mensaje += `Contenido de la raíz: ${fs.readdirSync(rootDir).join(', ')}`;
    }
    
    res.send(mensaje);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});