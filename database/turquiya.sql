
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    bio TEXT,
    frase VARCHAR(255) DEFAULT 
    pais VARCHAR(50) DEFAULT 'Colombia',
    celular VARCHAR(20),
    moneda_preferida VARCHAR(5) DEFAULT 'COP',
    conectividad_preferida VARCHAR(10) DEFAULT 'wifi',
    instagram_link VARCHAR(255),
    facebook_link VARCHAR(255),
    tiktok_link VARCHAR(255),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS destinos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    ubicacion VARCHAR(200) NOT NULL, 
    categoria VARCHAR(50),           
    imagen_url VARCHAR(255),        
    precio_estimado INT DEFAULT 0,  
    calificacion NUMERIC(2,1) DEFAULT 4.5
);


CREATE TABLE IF NOT EXISTS favoritos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    destino_id INT REFERENCES destinos(id) ON DELETE CASCADE,
    fecha_guardado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT usuario_destino_unico UNIQUE (usuario_id, destino_id) 
);


CREATE TABLE IF NOT EXISTS presupuestos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    nombre_plan VARCHAR(100) NOT NULL,        
    presupuesto_maximo INT NOT NULL,       
    gastos_estimados INT DEFAULT 0,          
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO destinos (nombre, descripcion, ubicacion, categoria, imagen_url, precio_estimado) VALUES
('Gran Malecón del Río', 'El lugar más visitado de Colombia, perfecto para caminar al lado del Río Magdalena y disfrutar de la gastronomía local.', 'Barranquilla', 'Cultura', 'https://ejemplo.com/malecon.jpg', 0),
('Castillo de Salgar', 'Fortificación histórica con una vista espectacular del Mar Caribe, ideal para ver el atardecer.', 'Puerto Colombia', 'Historia', 'https://ejemplo.com/salgar.jpg', 5000),
('Pozos de Usiacurí', 'Pozos de aguas medicinales y senderismo natural en el pesebre del Atlántico, hogar de hermosas artesanías en palma de iraca.', 'Usiacurí', 'Naturaleza', 'https://ejemplo.com/usiacuri.jpg', 12000),
('Muelle de Puerto Colombia', 'Histórico muelle por donde entró el progreso al país, hoy restaurado con una hermosa plaza transitable.', 'Puerto Colombia', 'Historia', 'https://ejemplo.com/muelle.jpg', 0);

INSERT INTO destinos (id_destino, nombre, municipio, categoria, descripcion, eficiencia, imagen) VALUES
(22, 'Miura Steakhouse', 'Barranquilla', 'Gastronomía', 'Exclusivo restaurante especializado en cortes de carne premium y coctelería de autor.', 'Excelente (9.6/10)', './img/Rsquilla%20miura.jpg'),
(23, 'Porthos Steakhouse', 'Barranquilla', 'Gastronomía', 'Reconocido por sus deliciosas hamburguesas y ambiente perfecto para ir con amigos y familia.', 'Excelente (9.5/10)', './img/RsquillaPorthos.jpg'),
(24, 'Sabina Restaurante', 'Barranquilla', 'Gastronomía', 'Restaurante de comida mediterránea con un ambiente elegante, ideal para cenas románticas.', 'Muy Buena (9.2/10)', './img/RsquillaSabina.jpg'),
(25, 'Restaurante Amor', 'Barranquilla', 'Gastronomía', 'Un lugar mágico lleno de detalles románticos, excelente gastronomía local y buena música.', 'Excelente (9.4/10)', './img/Rsquilla%20amor.jpg'),
(26, 'Risto Bar', 'Barranquilla', 'Gastronomía', 'Lugar moderno para disfrutar de buenos tragos, excelente música y un ambiente inigualable.', 'Muy Buena (9.0/10)', './img/BrRistoBar.jpg'),
(27, 'Kilymandiaro', 'Puerto Colombia', 'Fiesta', 'Famoso club de playa en Pradomar con ambiente de fiesta, excelente música y vistas al mar.', 'Excelente (9.3/10)', './img/Rspuerto%20kilymandiaro.jpg'),
(28, 'Restaurante Muelle', 'Puerto Colombia', 'Gastronomía', 'Ubicado frente al histórico muelle, ofrece los mejores pescados y mariscos del Caribe.', 'Muy Buena (9.1/10)', './img/Rspuerto%20muelle.jpg'),
(29, 'Restaurante Playa', 'Puerto Colombia', 'Gastronomía', 'Restaurante a la orilla del mar, perfecto para disfrutar de un coctel mientras cae el sol.', 'Buena (8.8/10)', './img/RsPuerto%20playa.jpg'),
(30, 'Bar Sofi', 'Puerto Colombia', 'Fiesta', 'Un rincón acogedor en Puerto para disfrutar de unas cervezas frías y buena compañía.', 'Muy Buena (8.9/10)', './img/Brpuerto%20sofi.jpg'),
(31, 'Restaurante Nikky', 'Puerto Colombia', 'Gastronomía', 'Excelente oferta gastronómica con vistas impresionantes al mar de Puerto Colombia.', 'Excelente (9.2/10)', './img/Rspuerto%20nikky.jpg'),
(32, 'Bar Mirador', 'Puerto Colombia', 'Fiesta', 'Bar con la mejor vista panorámica para relajarse al final de la tarde.', 'Muy Buena (9.0/10)', './img/Barpuerto%20mirador.jpg');