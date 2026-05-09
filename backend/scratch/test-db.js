const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: false,
        trustServerCertificate: true,
        // trustedConnection: true // Comenta esto para probar con sa
    }
};

async function test() {
    try {
        console.log('Intentando conectar con:', {
            server: config.server,
            user: config.user,
            database: config.database
        });
        await sql.connect(config);
        console.log('✅ Conexión exitosa!');
        const result = await sql.query`SELECT @@version as version`;
        console.log(result.recordset[0].version);
        await sql.close();
    } catch (err) {
        console.error('❌ Error de conexión:', err.message);
    }
}

test();
