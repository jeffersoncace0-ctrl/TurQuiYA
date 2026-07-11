
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
