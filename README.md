# Proyecto Final Individual — Portafolio Escolar

## Estructura del proyecto

```
proyecto/
├── Backend/
│   ├── server.js        ← API REST con Node.js + Express
│   ├── package.json     ← Dependencias del servidor
│   ├── railway.json     ← Configuración de despliegue
│   ├── database.sql     ← Script para BD local (opcional)
│   └── .gitignore
└── Frontend/
    └── index.html       ← Página web con datos escolares y tareas
```

---

## Opción A — Subir a Railway (recomendado)

### Paso 1 — Crear cuenta y proyecto en Railway
1. Entra a [railway.app](https://railway.app) y regístrate con GitHub.
2. Haz clic en **New Project → Deploy from GitHub repo**.

### Paso 2 — Agregar MySQL
1. Dentro de tu proyecto en Railway, haz clic en **+ New → Database → MySQL**.
2. Railway crea la base de datos y agrega las variables de entorno automáticamente.

### Paso 3 — Subir el Backend a GitHub
```bash
cd Backend
git init
git add .
git commit -m "primer commit"
git remote add origin https://github.com/TU_USUARIO/backend-tareas.git
git push -u origin main
```

### Paso 4 — Conectar el repo a Railway
1. En Railway, haz clic en **+ New → GitHub Repo** y selecciona tu repositorio.
2. Railway detecta el `package.json` y despliega automáticamente.
3. Las variables `MYSQLHOST`, `MYSQLUSER`, etc. ya están inyectadas por el servicio de MySQL.

### Paso 5 — Obtener la URL pública
1. En tu servicio de backend en Railway, ve a **Settings → Networking → Generate Domain**.
2. Copia la URL, se ve así: `https://backend-tareas-production.up.railway.app`

### Paso 6 — Actualizar el Frontend
Abre `Frontend/index.html` y reemplaza la URL de la API:

```js
// Línea ~170 del index.html
const API_URL = 'https://TU-URL.up.railway.app/tareas';
```

Luego abre `index.html` directamente en el navegador (o súbelo a GitHub Pages).

---

## Opción B — Ejecutar en local

### 1. Ejecutar el script SQL
```bash
mysql -u root -p < Backend/database.sql
```

### 2. Instalar dependencias
```bash
cd Backend
npm install
```

### 3. Iniciar el servidor
```bash
node server.js
# → Servidor corriendo en el puerto 3000
```

### 4. Abrir el frontend
Abre `Frontend/index.html` en el navegador (la API_URL ya apunta a `localhost:3000`).

---

## Tecnologías

| Capa | Tecnología |
|------|------------|
| Base de datos | MySQL (Railway o local) |
| Backend / API | Node.js + Express |
| Frontend | HTML5 + CSS3 + Fetch API |
| Deploy | Railway |
