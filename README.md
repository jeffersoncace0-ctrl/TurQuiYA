# TurquiYA

Aplicacion web turistica inteligente SPA.

Tecnologias:
- Frontend: HTML5, CSS3, JavaScript Vanilla
- Backend preparado: Node.js + Express
- Base de datos: PostgreSQL

Funciones iniciales:
- Inicio
- Registro
- Login
- Destinos turisticos
- Presupuesto inteligente
- Perfil usuario



# Sprint 2 - HU-04: Consultar destinos turísticos

## Historia de Usuario

**HU-04 – Consultar destinos turísticos**

### Objetivo

Implementar un catálogo dinámico de destinos turísticos consumiendo información desde una API desarrollada en Express y almacenada en PostgreSQL.

---

# Funcionalidades implementadas

## Backend

### Configuración del entorno

* Se inicializó el proyecto Node.js dentro de la carpeta `backend`.
* Se creó el archivo `package.json`.
* Se instalaron las dependencias:

  * express
  * cors
  * pg
* Se levantó un contenedor Docker con PostgreSQL 16.
* Se creó la base de datos `turquiya`.

---

### Base de datos

Se creó la tabla `destinos`.

Posteriormente se amplió el modelo agregando los campos:

* categoria
* imagen

Estos campos permiten cumplir con los criterios de aceptación de la historia de usuario.

También se actualizaron los registros existentes para incluir:

* categoría del destino.
* URL de imagen.

---

### API REST

Se implementaron los siguientes endpoints:

## GET /

Ruta de prueba para comprobar el funcionamiento del servidor.

Respuesta:

```json
{
  "mensaje": "API TurquiYA funcionando"
}
```

---

## GET /destinos

Consulta todos los destinos registrados en PostgreSQL.

Devuelve un arreglo JSON.

---

## GET /destinos/:id

Consulta un único destino utilizando su identificador.

Permite construir la vista de detalle.

---

# Frontend

## Servicio API

Se mejoró `services/api.js`.

Antes únicamente hacía:

* fetch()

Ahora:

* centraliza todas las consultas

* convierte automáticamente la respuesta a JSON

* valida errores HTTP

* incorpora funciones específicas como:

* obtenerDestinos()

* obtenerDestino(id)

---

## Router

Se refactorizó completamente el router.

Antes únicamente aceptaba:

```javascript
navigate("destinos")
```

Ahora acepta parámetros:

```javascript
navigate("detalle", id)
```

Esto permite reutilizar el router para cualquier vista que necesite información adicional.

---

## Vista Destinos

La vista dejó de contener información estática.

Anteriormente las tarjetas estaban escritas manualmente.

Ahora:

* consulta la API
* obtiene la información desde PostgreSQL
* genera automáticamente todas las tarjetas
* muestra un mensaje cuando no existen destinos
* crea un botón "Ver detalle" para cada registro

---

## Catálogo

Se implementó un catálogo dinámico mostrando:

* imagen
* nombre
* categoría
* descripción

Las tarjetas son generadas automáticamente mediante JavaScript.

---

## Vista Detalle

Se creó una nueva vista:

```
detalleDestino.js
```

Esta vista consulta:

```
GET /destinos/:id
```

y muestra:

* imagen
* nombre
* categoría
* ubicación
* precio
* descripción

Además incorpora un botón para regresar al catálogo.

---

## CSS

Se añadieron nuevos estilos para el catálogo:

* distribución responsive mediante Grid.
* imágenes adaptables.
* tarjetas con mejor presentación.

---

# Problemas encontrados

## 1. No existía package.json

Problema:

No era posible ejecutar npm.

Solución:

Se inicializó el proyecto con:

```bash
npm init -y
```

---

## 2. PostgreSQL no estaba instalado localmente

Problema:

Los comandos:

```bash
psql --version
```

y

```bash
mysql --version
```

no existían.

Solución:

Se reutilizó Docker para levantar PostgreSQL en un contenedor.

---

## 3. La base de datos estaba vacía

Problema:

Existía el archivo `turquiya.sql`, pero PostgreSQL no tenía tablas.

Comprobación:

```
\dt
```

respondía:

```
Did not find any relations.
```

Causa:

El archivo SQL nunca había sido ejecutado.

Solución:

Se importó el script dentro del contenedor utilizando `psql`.

Resultado:

Las tablas fueron creadas correctamente.

---

## 4. Error:

```
Error al consultar los destinos
```

Causa:

La tabla no existía todavía.

Solución:

Crear las tablas e insertar la información desde el script SQL.

---

## 5. Error:

```
Missing script: start
```

Causa:

Se estaba ejecutando npm desde la carpeta raíz del proyecto.

Solución:

Ejecutar el servidor desde:

```
backend/
```

donde sí existe el archivo `package.json`.

---

## 6. Error:

```
Cannot GET /destinos
```

Causa:

Durante la implementación de:

```
GET /destinos/:id
```

se reemplazó accidentalmente la ruta:

```
GET /destinos
```

por la nueva.

Como consecuencia:

* el detalle funcionaba
* el catálogo dejó de funcionar

Solución:

Restaurar ambas rutas:

```
GET /destinos
GET /destinos/:id
```

manteniéndolas como endpoints independientes.

---

## 7. Error:

```
No fue posible cargar el destino
```

Diagnóstico:

Se comprobó directamente la URL:

```
http://localhost:3000/destinos/1
```

Esta prueba permitió detectar que el problema estaba en la API y no en el frontend.

Una vez restaurado el endpoint correcto, la vista de detalle comenzó a funcionar sin modificar el frontend.

---

# Resultado final

La historia HU-04 quedó implementada satisfactoriamente.

Actualmente el sistema permite:

* consultar todos los destinos desde PostgreSQL.
* visualizar un catálogo dinámico.
* mostrar imágenes.
* mostrar categorías.
* seleccionar un destino.
* consultar el detalle del destino.
* navegar entre catálogo y detalle sin recargar la página.
* mantener una arquitectura modular basada en:

  * Router
  * Views
  * Services
  * Express
  * PostgreSQL

La aplicación ya no depende de datos estáticos escritos manualmente, sino que consume información directamente desde la base de datos mediante una API REST.
