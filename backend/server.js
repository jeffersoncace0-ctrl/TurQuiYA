const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'turquiya',
    password: 'postgres',
    port: 5432
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: 'API TurquiYA funcionando' });
});

// Consultar todos los destinos
app.get('/destinos', async (req, res) => {

    try {

        const resultado = await pool.query(
            'SELECT * FROM destinos'
        );

        res.status(200).json(resultado.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al consultar los destinos'
        });

    }

});


// Consultar un destino por ID
app.get('/destinos/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            'SELECT * FROM destinos WHERE id_destino = $1',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Destino no encontrado'
            });
        }

        res.json(resultado.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error consultando el destino'
        });

    }

});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});