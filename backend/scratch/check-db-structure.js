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
    }
};

async function test() {
    try {
        await sql.connect(config);
        console.log('✅ Conectado');
        const result = await sql.query`
            SELECT COLUMN_NAME, COLUMN_DEFAULT, IS_NULLABLE, DATA_TYPE 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'APP_USUARIOS'
        `;
        console.table(result.recordset);
        
        const constraints = await sql.query`
            SELECT CHECK_CLAUSE 
            FROM INFORMATION_SCHEMA.CHECK_CONSTRAINTS 
            WHERE CONSTRAINT_NAME = 'CK_APP_USUARIOS_ROL'
        `;
        console.log('Constraint ROL:', constraints.recordset[0]?.CHECK_CLAUSE);
        
        await sql.close();
    } catch (err) {
        console.error('❌ Error:', err.message);
    }
}

test();
