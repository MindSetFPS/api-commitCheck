const { Pool } = require('pg');
require('dotenv').config({ path: '.env.production' });

//hacemos la conexión
const pool = new Pool({
    connectionString: process.env.NEON_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 5
})

//revisamos errores
pool.on('error', (err, client) => {
    console.log(`Error al intentar conectar la base de datos: ${err} En el cliente: ${client}`);
})

module.exports = pool;