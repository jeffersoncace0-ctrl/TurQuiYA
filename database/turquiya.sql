CREATE DATABASE turquiya;

CREATE TABLE usuarios(
id_usuario SERIAL PRIMARY KEY,
nombre VARCHAR(100),
correo VARCHAR(100),
password VARCHAR(100)
);

CREATE TABLE destinos(
id_destino SERIAL PRIMARY KEY,
nombre VARCHAR(100),
descripcion TEXT,
precio INT,
ubicacion VARCHAR(200)
);
