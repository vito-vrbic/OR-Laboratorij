const { Pool } = require('pg');

/* PostgreSQL database configuration. */
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'n2uh6L-_IU',
    database: 'Albums',
    port: 5432
});

/* Handling errors on the database pool. */
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

/* Proper shutdown on app termination. */
process.on('SIGINT', async () => {
    console.log('Closing database connection...');
    await pool.end();
    console.log('Database connection closed.');
    process.exit(0);
});

/* Exporting the database. */
module.exports = {
    query: (text, params) => pool.query(text, params),
};