
const { createConnection } = require('typeorm');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');

async function debug() {
  try {
    dotenv.config();
    
    const connection = await createConnection({
      type: 'mssql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 1433,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      options: { encrypt: false, trustServerCertificate: true }
    });

    const result = await connection.query("SELECT EMAIL, PASSWORD_HASH FROM APP_USUARIOS WHERE COD_EMPLEADO = 10316");
    
    if (result.length === 0) {
      console.log('--- ERROR: Usuario 10316 no encontrado ---');
    } else {
      const dbUser = result[0];
      const dbHash = dbUser.PASSWORD_HASH ? dbUser.PASSWORD_HASH.trim() : '';
      
      console.log('--- RESULTADOS DEL DIAGNÓSTICO ---');
      console.log('Email detectado:', '|' + dbUser.EMAIL + '|');
      console.log('Hash detectado :', '|' + dbHash + '|');
      console.log('Longitud hash :', dbHash.length);
      
      if (!dbHash) {
          console.log('CAUSA: El campo PASSWORD_HASH está VACÍO en la base de datos.');
      } else {
          const test1 = bcrypt.compareSync('Finotex2029', dbHash);
          console.log('Validación con "Finotex2029":', test1 ? 'ÉXITO ✅' : 'FALLO ❌');
          
          if (!test1) {
              const test2 = bcrypt.compareSync('finotex2029', dbHash);
              console.log('Validación con "finotex2029":', test2 ? 'ÉXITO ✅' : 'FALLO ❌');
          }
      }
    }
    await connection.close();
  } catch (err) {
    console.error('Error fatal en diagnóstico:', err.message);
  }
}
debug();
