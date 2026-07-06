import pg from 'pg';

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'turquiya',
    password: '12345', 
    port: 5432,
});

export default pool;