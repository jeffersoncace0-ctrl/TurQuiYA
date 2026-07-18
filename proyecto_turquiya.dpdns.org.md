# Publicación de TurQuiYA en Internet

## Objetivo

Publicar la aplicación TurQuiYA para que pudiera ser accesible desde cualquier navegador utilizando un dominio personalizado y una base de datos en la nube.

Arquitectura final:

Frontend (GitHub Pages)
        │
        ▼
Edge Functions (Supabase)
        │
        ▼
PostgreSQL (Supabase)

Dominio:
https://turquiya.dpdns.org

---

# Paso 1. Preparación del dominio

El dominio fue adquirido previamente en DPDNS.

Posteriormente se agregó a Cloudflare para administrar la zona DNS.

Durante este proceso se reemplazaron los Name Servers originales del proveedor por los Name Servers generados por Cloudflare.

Después de realizar el cambio fue necesario esperar la propagación del dominio.

Una vez finalizada la propagación, Cloudflare confirmó que el dominio estaba activo.

---

# Paso 2. Configuración de GitHub Pages

El proyecto fue preparado para publicarse desde la rama principal del repositorio.

Se verificó que el archivo:

index.html

estuviera ubicado en la raíz del proyecto, ya que GitHub Pages únicamente utiliza ese archivo como punto de entrada.

Posteriormente se habilitó GitHub Pages desde:

Settings
→ Pages

Configuración utilizada:

Source:
Deploy from a Branch

Branch:
main

Folder:
/ (root)

Una vez realizado el despliegue GitHub asignó una URL temporal.

---

# Paso 3. Configuración del dominio personalizado

Dentro de GitHub Pages se configuró:

Custom Domain

turquiya.dpdns.org

Inicialmente GitHub mostró el error:

NotServedByPagesError

La causa fue que todavía no existían los registros DNS apuntando hacia GitHub Pages.

---

# Paso 4. Configuración DNS en Cloudflare

Se configuraron los registros DNS necesarios para que el dominio apuntara correctamente hacia GitHub Pages.

Posteriormente GitHub validó automáticamente la configuración.

Cuando el proceso finalizó correctamente apareció el mensaje:

Your site is live

confirmando que el dominio ya resolvía correctamente.

---

# Paso 5. Primer despliegue

El sitio quedó accesible mediante:

https://turquiya.dpdns.org

En esta etapa únicamente funcionaba el Landing Page.

Los botones no ejecutaban ninguna acción debido a que el frontend todavía dependía de un servidor Express ejecutándose localmente.

---

# Paso 6. Migración de la base de datos

Se creó un proyecto en Supabase.

Se utilizó PostgreSQL administrado por Supabase como nueva base de datos remota.

Posteriormente se ejecutó el script:

database/turquiya.sql

para crear las tablas del proyecto.

También se insertaron los primeros registros de destinos turísticos.

---

# Paso 7. Configuración de la conexión

Se creó el archivo:

.env

utilizando la cadena de conexión proporcionada por Supabase.

Ejemplo:

DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres

Inicialmente el backend utilizaba PostgreSQL local.

Después se modificó para utilizar la base de datos remota.

---

# Paso 8. Desarrollo de la API

Inicialmente la API fue implementada utilizando:

Node.js

Express

pg

Se desarrollaron los endpoints:

GET /

GET /destinos

GET /destinos/:id

Esta versión únicamente funcionaba ejecutando:

npm start

desde la carpeta backend.

---

# Paso 9. Problema detectado

Aunque GitHub Pages publicaba correctamente el frontend, los usuarios externos no podían consultar los destinos.

La razón era que la API solamente existía en el computador local.

Arquitectura inicial:

GitHub Pages
        │
        ▼
localhost:3000

Como localhost únicamente existe en el computador del desarrollador, el sitio publicado no podía acceder a la API.

---

# Paso 10. Eliminación de la dependencia de Express local

Para evitar que todos los integrantes del proyecto tuvieran que instalar Node.js y ejecutar Express manualmente, se decidió migrar completamente la API hacia Supabase Edge Functions.

De esta forma la API quedó disponible permanentemente desde Internet.

---

# Paso 11. Creación de Edge Functions

Se creó una función llamada:

Destinos

Inicialmente se intentó utilizar la plantilla:

withSupabase()

Sin embargo aparecieron errores relacionados con:

JWT

CORS

Auth Mode

Versiones del SDK

Finalmente se reemplazó completamente la plantilla utilizando una implementación basada en Express.

La nueva función quedó encargada de consultar la tabla:

destinos

y devolver los resultados en formato JSON.

---

# Paso 12. Consumo desde el frontend

El archivo:

frontend/js/services/api.js

dejó de consultar:

http://localhost:3000

y pasó a consumir directamente:

https://avnlxruzurvtybzoficd.supabase.co/functions/v1/Destinos

Con este cambio el frontend ya no depende de un servidor local.

---

# Resultado final

La aplicación quedó preparada para funcionar utilizando únicamente servicios en la nube.

Arquitectura final:

Usuario
      │
      ▼
GitHub Pages
      │
      ▼
Supabase Edge Function
      │
      ▼
PostgreSQL (Supabase)

No es necesario:

- Instalar PostgreSQL local.
- Ejecutar Docker.
- Ejecutar Express.
- Ejecutar Node.js para consultar los datos.

Únicamente es necesario publicar los cambios del frontend en GitHub para que el sitio web se actualice automáticamente.

---

# Problemas encontrados

## GitHub Pages

Problema:

NotServedByPagesError

Solución:

Configurar correctamente los registros DNS y esperar la propagación.

---

## Cloudflare

Problema:

El dominio permanecía pendiente de validación.

Solución:

Actualizar los Name Servers en el proveedor del dominio y esperar la propagación.

---

## Backend

Problema:

La API solamente existía en localhost.

Solución:

Migrar la lógica hacia Supabase Edge Functions.

---

## Supabase

Problema:

Errores relacionados con JWT, CORS y autenticación utilizando la plantilla predeterminada.

Solución:

Reemplazar la plantilla por una implementación basada en Express que expone los endpoints necesarios para el proyecto.

---

# Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript Vanilla
- Git
- GitHub
- GitHub Pages
- Cloudflare
- Supabase
- PostgreSQL
- Express
- Edge Functions

---

# Estado actual

✔ Dominio personalizado configurado.

✔ Frontend publicado mediante GitHub Pages.

✔ Base de datos alojada en Supabase.

✔ API publicada mediante Edge Functions.

✔ Catálogo de destinos consumido desde la nube.

✔ Arquitectura preparada para continuar con los siguientes Sprints sin depender de un servidor local.