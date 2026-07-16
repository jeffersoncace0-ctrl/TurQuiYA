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

avabababab