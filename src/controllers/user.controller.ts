import {Request, Response} from "express";
import {sqlConfig} from "../database/database";
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

