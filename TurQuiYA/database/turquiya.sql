-- ============================================================
-- ESQUEMA DE BASE DE DATOS: TURQUIYA
-- Plataforma Turística Inteligente del Atlántico
-- ============================================================

-- 1. TABLA DE USUARIOS
-- Almacena las credenciales y las preferencias de personalización de la SPA
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    bio TEXT,
    frase VARCHAR(255) DEFAULT '¡Listo para explorar el Atlántico! 🌴',
    pais VARCHAR(50) DEFAULT 'Colombia',
    celular VARCHAR(20),
    moneda_preferida VARCHAR(5) DEFAULT 'COP',
    conectividad_preferida VARCHAR(10) DEFAULT 'wifi',
    instagram_link VARCHAR(255),
    facebook_link VARCHAR(255),
    tiktok_link VARCHAR(255),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABLA DE DESTINOS
-- Lugares turísticos clave de Barranquilla y los municipios del Atlántico
CREATE TABLE IF NOT EXISTS destinos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    ubicacion VARCHAR(200) NOT NULL, -- Ej: 'Puerto Colombia', 'Usiacurí', 'Barranquilla'
    categoria VARCHAR(50),           -- Ej: 'Playa', 'Cultura', 'Gastronomía', 'Naturaleza'
    imagen_url VARCHAR(255),         -- Ruta o enlace de la foto del destino
    precio_estimado INT DEFAULT 0,   -- Costo aproximado de entrada o pasadía en COP
    calificacion NUMERIC(2,1) DEFAULT 4.5
);

-- 3. TABLA DE FAVORITOS
-- Relaciona qué usuarios guardaron qué destinos en su lista de deseos
CREATE TABLE IF NOT EXISTS favoritos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    destino_id INT REFERENCES destinos(id) ON DELETE CASCADE,
    fecha_guardado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT usuario_destino_unico UNIQUE (usuario_id, destino_id) -- Evita duplicados
);

-- 4. TABLA DE PLANIFICADOR / PRESUPUESTOS
-- Guarda los planes de viaje creados por los usuarios en la SPA
CREATE TABLE IF NOT EXISTS presupuestos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    nombre_plan VARCHAR(100) NOT NULL,        -- Ej: 'Fin de semana en Puerto Colombia'
    presupuesto_maximo INT NOT NULL,          -- Dinero total disponible
    gastos_estimados INT DEFAULT 0,           -- Suma calculada de los destinos agregados
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- REGISTROS DE PRUEBA (DATA INICIAL)
-- Para que la SPA no aparezca vacía al conectarla
-- ============================================================

INSERT INTO destinos (nombre, descripcion, ubicacion, categoria, imagen_url, precio_estimado) VALUES
('Gran Malecón del Río', 'El lugar más visitado de Colombia, perfecto para caminar al lado del Río Magdalena y disfrutar de la gastronomía local.', 'Barranquilla', 'Cultura', 'https://ejemplo.com/malecon.jpg', 0),
('Castillo de Salgar', 'Fortificación histórica con una vista espectacular del Mar Caribe, ideal para ver el atardecer.', 'Puerto Colombia', 'Historia', 'https://ejemplo.com/salgar.jpg', 5000),
('Pozos de Usiacurí', 'Pozos de aguas medicinales y senderismo natural en el pesebre del Atlántico, hogar de hermosas artesanías en palma de iraca.', 'Usiacurí', 'Naturaleza', 'https://ejemplo.com/usiacuri.jpg', 12000),
('Muelle de Puerto Colombia', 'Histórico muelle por donde entró el progreso al país, hoy restaurado con una hermosa plaza transitable.', 'Puerto Colombia', 'Historia', 'https://ejemplo.com/muelle.jpg', 0);