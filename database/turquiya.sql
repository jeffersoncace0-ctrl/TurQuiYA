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

INSERT INTO destinos(nombre,descripcion,precio,ubicacion)
VALUES
('Puerto Colombia',
'Playas y muelle histórico.',
50000,
'Atlántico'),

('Castillo de Salgar',
'Fortaleza colonial frente al mar.',
30000,
'Puerto Colombia'),

('Bocas de Ceniza',
'Encuentro del río Magdalena con el mar.',
25000,
'Barranquilla');
