import pool from '../config/db.js';

const Usuario = {
    buscarPorCorreo: async (correo) => {
        const query = 'SELECT * FROM usuarios WHERE correo = $1';
        const { rows } = await pool.query(query, [correo]);
        return rows[0];
    },

    crear: async (nombre, correo, passwordEncriptado) => {
        const query = `
            INSERT INTO usuarios (nombre, correo, password) 
            VALUES ($1, $2, $3) 
            RETURNING id_usuario, nombre, correo;
        `;
        const { rows } = await pool.query(query, [nombre, correo, passwordEncriptado]);
        return rows[0];
    }
};

export default Usuario;