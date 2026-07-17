# Actualización — 14/07/2026

## Estado actual del proyecto

Actualmente TurQuiYA funciona mediante una arquitectura cliente-servidor:

Frontend (HTML + CSS + JavaScript)
        ↓
API REST (Node.js + Express)
        ↓
Supabase (PostgreSQL)

El frontend ya no consume datos estáticos, sino que obtiene la información directamente desde la API, la cual consulta una base de datos PostgreSQL alojada en Supabase.

Actualmente funcionan correctamente:

- Navegación SPA mediante Router.
- Catálogo dinámico de destinos.
- Consulta individual de destinos.
- Conexión del backend con Supabase.
- API REST funcionando sobre Express.
- Base de datos remota accesible mediante DATABASE_URL.

---

# Trabajo realizado

## Migración del backend hacia Supabase

Se creó el archivo:

backend/db.js

encargado de administrar el pool de conexiones utilizando:

- pg
- dotenv

La conexión ahora utiliza la variable:

DATABASE_URL

almacenada dentro del archivo `.env`.

---

## Variables de entorno

Se configuró el proyecto para utilizar:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:********@db.xxxxxxxxx.supabase.co:5432/postgres
```

De esta forma la contraseña queda fuera del código fuente.

---

## Dependencias instaladas

Dentro de `backend` se instalaron:

```bash
npm install pg
npm install dotenv
```

---

## Refactor del servidor

`server.js` fue modificado para utilizar el pool de conexiones centralizado (`db.js`) en lugar de crear una conexión nueva en cada archivo.

---

## Base de datos

La tabla `destinos` fue ampliada para adaptarse al frontend.

Se ejecutaron las siguientes consultas SQL.

### Agregar columnas

```sql
ALTER TABLE destinos
ADD COLUMN categoria VARCHAR(50);

ALTER TABLE destinos
ADD COLUMN imagen TEXT;
```

---

### Actualizar registros

```sql
UPDATE destinos
SET
categoria='Historia',
imagen='https://images.unsplash.com/photo-1507525428034-b723cf961d3e'
WHERE id_destino=1;

UPDATE destinos
SET
categoria='Historia',
imagen='https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86'
WHERE id_destino=2;

UPDATE destinos
SET
categoria='Naturaleza',
imagen='https://images.unsplash.com/photo-1500530855697-b586d89ba3ee'
WHERE id_destino=3;
```

---

### Verificación

```sql
SELECT * FROM destinos;
```

---

### Ampliación del modelo de datos

Se agregaron campos pensando en futuras funcionalidades.

```sql
ALTER TABLE destinos
ADD COLUMN IF NOT EXISTS calificacion NUMERIC(2,1) DEFAULT 4.5,

ADD COLUMN IF NOT EXISTS duracion VARCHAR(50),

ADD COLUMN IF NOT EXISTS horario VARCHAR(100),

ADD COLUMN IF NOT EXISTS latitud DECIMAL(10,8),

ADD COLUMN IF NOT EXISTS longitud DECIMAL(11,8),

ADD COLUMN IF NOT EXISTS activo BOOLEAN DEFAULT TRUE,

ADD COLUMN IF NOT EXISTS fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
```

---

### Datos de ejemplo

```sql
UPDATE destinos
SET
calificacion = 4.8,
duracion = '3 horas',
horario = '08:00 - 18:00',
latitud = 11.016700,
longitud = -74.950000
WHERE id_destino = 1;

UPDATE destinos
SET
calificacion = 4.7,
duracion = '2 horas',
horario = '09:00 - 17:00',
latitud = 11.000900,
longitud = -74.958200
WHERE id_destino = 2;

UPDATE destinos
SET
calificacion = 4.9,
duracion = 'Todo el día',
horario = '08:00 - 17:00',
latitud = 10.743600,
longitud = -74.976300
WHERE id_destino = 3;
```

---

## Problemas encontrados

### Error

```
Cannot find module 'pg'
```

Solución:

Instalar la dependencia dentro de `backend`.

```bash
npm install pg
```

---

### Error

```
ReferenceError: app is not defined
```

Causa:

Durante la refactorización se eliminó accidentalmente la inicialización de Express.

Solución:

Restaurar:

```javascript
const app = express();

app.use(cors());
app.use(express.json());
```

---

### Error

```
getaddrinfo ENOTFOUND
```

Causa:

La URL de conexión de Supabase era incorrecta o contenía una contraseña incompleta.

Solución:

Obtener nuevamente la cadena de conexión desde:

Settings → Database → Connection String

y actualizar `DATABASE_URL`.

---

### Error

```
GET http://127.0.0.1:5500/undefined
```

Diagnóstico:

El frontend intentaba cargar:

```javascript
destino.imagen
```

pero dicho campo aún no existía en la base de datos.

Solución:

Agregar la columna `imagen` en PostgreSQL y actualizar los registros.

---

## Estado al finalizar la jornada

Actualmente:

- Backend funcionando con Express.
- Base de datos migrada a Supabase.
- Endpoints funcionando correctamente.
- Consulta de destinos operativa.
- Router SPA funcionando.
- Navegación entre vistas correcta.
- Proyecto preparado para comenzar la HU de Presupuesto Inteligente.

# Actualización — 16/07/2026

## Refactorización de Seguridad y Autenticación en la Nube

Se realizó una migración crítica en el sistema de autenticación y enrutamiento para garantizar el correcto funcionamiento de la aplicación en entornos de producción (GitHub Pages / Cloudflare).

### Problemas resueltos
* **Error `Failed to fetch`:** Se eliminó la dependencia de un servidor local (`localhost:3000`) para el inicio de sesión.
* **Pantalla en blanco (Crash del DOM):** Se corrigió la lógica de inicialización en `app.js` que bloqueaba la renderización del Landing Page al no encontrar credenciales previas.

### Nuevas Funcionalidades Implementadas

#### 1. Supabase Auth (Serverless)
El sistema de registro e inicio de sesión ahora utiliza directamente el SDK oficial de Supabase.
* Creación de usuarios de forma segura.
* Manejo de sesiones y tokens nativos de Supabase.
* Cierre de sesión sincronizado con la base de datos en la nube.

#### 2. Guardián de Rutas (Route Guard)
Se implementó un middleware nativo en Vanilla JS dentro de `app.js`.
* **Rutas Públicas:** `home`, `login`, `registro`.
* **Rutas Privadas:** Redirigen automáticamente al `login` si se intenta acceder a ellas sin un token válido en el `localStorage`.
* El menú de navegación se actualiza dinámicamente según el estado de la sesión, ocultando estrictamente el contenido privado.

#### 3. Refactorización del Router
Se separó la responsabilidad de la navegación:
* `router.js` se encarga exclusivamente de inyectar las vistas y manejar errores de carga (404).
* `app.js` controla el historial de navegación y la seguridad de las rutas.

### Archivos clave actualizados:
- `frontend/js/app.js` (Guardián de rutas y control de estado)
- `frontend/js/router.js` (Inyección limpia de HTML)
- `frontend/js/views/login.js` & `registro.js` (Conexión con Supabase)
- `frontend/js/services/api.js` (Centralización del cliente de Supabase)





Reporte de Actualizaciones — TurQuiYA
Estado Actual del Proyecto (Consolidado)
La arquitectura de TurQuiYA ha evolucionado de un modelo tradicional con servidor local hacia un entorno moderno enfocado en la nube (Serverless) para la autenticación.

Actualmente, las funcionalidades operativas incluyen:

Una Single Page Application (SPA) con navegación dinámica y un enrutador (Router) independiente.

Un catálogo dinámico que permite la consulta individual de destinos turísticos.

Una base de datos PostgreSQL alojada en Supabase, accesible de forma segura.

Un sistema de autenticación gestionado directamente mediante el SDK de Supabase Auth, preparando el proyecto para entornos de producción como GitHub Pages o Cloudflare.

Actualización — 16/07/2026: Seguridad y Autenticación Serverless
Durante esta jornada, se realizó una migración crítica en el enrutamiento y la validación de usuarios, eliminando la dependencia de un backend local para el inicio de sesión.

1. Integración de Supabase Auth
El sistema de registro e inicio de sesión ahora utiliza directamente el SDK oficial de Supabase.

Se implementó la creación de usuarios de forma segura y el manejo de sesiones con tokens nativos de la plataforma.

El cierre de sesión está completamente sincronizado con la base de datos en la nube.

Archivos modificados: frontend/js/views/login.js, frontend/js/views/registro.js y frontend/js/services/api.js (ahora centraliza el cliente de Supabase).

2. Guardián de Rutas (Route Guard)
Se implementó un middleware nativo en Vanilla JS dentro de frontend/js/app.js.

Se definieron home, login y registro estrictamente como rutas públicas.

Las rutas privadas ahora evalúan el localStorage; si no existe un token válido, redirigen automáticamente al login.

El menú de navegación se actualiza dinámicamente según el estado de la sesión, ocultando el contenido restringido.

3. Refactorización del Router
Se separaron las responsabilidades de la navegación: frontend/js/app.js controla el historial y la seguridad, mientras que frontend/js/router.js se encarga exclusivamente de inyectar las vistas HTML y manejar errores de carga (pantallas 404).

4. Corrección de Errores Críticos
Error Failed to fetch: Solucionado al eliminar la llamada al servidor local (localhost:3000) durante el inicio de sesión.

Crash del DOM (Pantalla en blanco): Se corrigió la lógica de inicialización en app.js que bloqueaba la renderización del Landing Page cuando el usuario no tenía credenciales previas.

Actualización — 14/07/2026: Migración de Base de Datos y Backend
Esta actualización se centró en la conexión de la base de datos a Supabase y la ampliación del modelo de información de los destinos.

1. Migración y Configuración (Node.js + Express)
Se instalaron las dependencias pg y dotenv dentro del entorno del backend.

Se creó el archivo backend/db.js para administrar el pool de conexiones centralizado, reemplazando la creación de conexiones individuales por archivo en server.js.

La conexión ahora utiliza la variable DATABASE_URL (obtenida desde Supabase), la cual se mantiene oculta en el código fuente gracias a un archivo .env.

2. Ampliación del Modelo de Datos (PostgreSQL)
La tabla destinos fue ampliada para coincidir con las necesidades visuales del frontend, añadiendo las columnas categoria e imagen.

Se actualizaron los registros existentes con información real de ejemplo, como URLs fotográficas y categorías (ej. 'Historia', 'Naturaleza').

Anticipando funcionalidades futuras, se añadieron los campos: calificacion, duracion, horario, latitud, longitud, activo y fecha_creacion.

3. Resolución de Problemas Técnicos
Módulo faltante (Cannot find module 'pg'): Resuelto mediante la instalación directa de la dependencia en el directorio del backend.

Servidor caído (ReferenceError: app is not defined): Se restauró accidentalmente código borrado, volviendo a inicializar la instancia de Express y sus dependencias (cors, express.json()).

Fallo de conexión a la BD (getaddrinfo ENOTFOUND): Se corrigió actualizando la cadena de conexión DATABASE_URL con los parámetros exactos provistos por los ajustes de Supabase.

Imágenes rotas en Frontend (undefined): Se solucionó agregando la columna imagen en la base de datos y poblándola con datos, ya que el frontend intentaba renderizar un campo inexistente.