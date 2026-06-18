-- Crear base de datos
CREATE DATABASE IF NOT EXISTS tareas_db;
USE tareas_db;

-- Crear tabla tareas
CREATE TABLE IF NOT EXISTS tareas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL
);

-- Insertar tareas del semestre (ejemplo)
INSERT INTO tareas (titulo, url) VALUES
  ('Tarea 1 - Página Web en HTML', 'https://github.com/usuario/tarea1-html'),
  ('Tarea 2 - Estilos con CSS', 'https://github.com/usuario/tarea2-css'),
  ('Tarea 3 - JavaScript Interactivo', 'https://github.com/usuario/tarea3-js'),
  ('Tarea 4 - API REST con Node.js', 'https://github.com/usuario/tarea4-api'),
  ('Tarea 5 - Base de Datos MySQL', 'https://github.com/usuario/tarea5-mysql');

SELECT * FROM tareas;
