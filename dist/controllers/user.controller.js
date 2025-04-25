import { mysqlPool } from "../database/database.sqlserver";
/*
import {sqlConfig} from "../database/database.sqlserver";
const sql = require('mssql')

export const fetchAllUsers = async (req: Request, res: Response) => {
    try {
        const pool = await sql.connect(sqlConfig);
        const result = await pool.request().query('SELECT * FROM users'); // Usa await aquí
        res.json(result.recordset); // Solo los datos
    } catch (error: any) {
        res.status(500).send(error.message);
    } finally {
        sql.close(); // Asegúrate de cerrar la conexión en finally
    }
}
*/
export const fetchAllUsers = async (req, res) => {
    try {
        const [rows] = await mysqlPool.query('SELECT * FROM users');
        res.json(rows);
    }
    catch (error) {
        console.error('❌ MySQL query error:', error);
        res.status(500).send(error.message);
    }
};
//# sourceMappingURL=user.controller.js.map