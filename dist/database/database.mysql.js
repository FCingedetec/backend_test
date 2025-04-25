// Get the client
import mysql from 'mysql2/promise';
// Create the connection to database
export const mysqlConfig = {
    host: process.env.DB_HOST_MYSQL,
    user: process.env.DB_USER_MYSQL,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_MYSQL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};
export async function testMySQLConnection() {
    try {
        const connection = await mysql.createConnection(mysqlConfig);
        console.log('✅ MySQL Database Connected.');
        await connection.end();
    }
    catch (err) {
        console.error('❌ Error connecting to MySQL:', err);
    }
}
//# sourceMappingURL=database.mysql.js.map