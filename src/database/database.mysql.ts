// Get the client
import mysql from 'mysql2/promise';

// Create the connection to database
export const sqlConfigMYSQL  = mysql.createPool({
  host: process.env.DB_HOST_MYSQ,
  port: Number(process.env.DB_MYSQL_PORT) || 3306,
  user: process.env.DB_USER_MYSQL,
  password: process.env.DB_PASSWORD_MYSQL,
  database: process.env.DB_NAME_MYSQL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function testMySQLConnection() {
  try {
    const connection = await sqlConfigMYSQL.getConnection();
    await connection.ping();
    console.log('✅ MySQL Database Connected.');
    connection.release(); // Muy importante con pools
  } catch (err) {
    console.error('❌ Error connecting to MySQL:', err);
  }
}


