const sql = require('mssql')
import * as dotenv from 'dotenv';
dotenv.config();


export const sqlConfigSQLSERVER = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 1433,
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
  }
};

export async function testSQLSERVERConnection() {
  try {
    const pool = await sql.connect(sqlConfigSQLSERVER);
    console.log('Database Conected.');
    await sql.close();
  } catch (err) {
    console.error('Error to Database Connection:', err);
  }
}





