import pkg from 'pg';
import dotenv from 'dotenv';

// Configurar dotenv para leer las variables del archivo .env
dotenv.config();

const { Pool } = pkg;

// Configuración del Pool utilizando la URL de conexión única de Supabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // Supabase requiere SSL para conexiones externas por seguridad
    rejectUnauthorized: false 
  }
});

// Registrar un evento por si ocurre un error inesperado en conexiones inactivas
pool.on('error', (err) => {
  console.error('Error inesperado en el pool de conexiones de PostgreSQL:', err);
  process.exit(-1);
});

// Función helper para realizar consultas en tus controladores
export const query = (text, params) => {
  return pool.query(text, params);
};

export default pool;