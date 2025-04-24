"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllUsers = void 0;
const database_1 = require("../database/database");
const sql = require('mssql');
const fetchAllUsers = async (req, res) => {
    try {
        const pool = await sql.connect(database_1.sqlConfig);
        const result = await pool.request().query('SELECT * FROM users'); // Usa await aquí
        res.json(result.recordset); // Solo los datos
    }
    catch (error) {
        res.status(500).send(error.message);
    }
    finally {
        sql.close(); // Asegúrate de cerrar la conexión en finally
    }
};
exports.fetchAllUsers = fetchAllUsers;
//# sourceMappingURL=user.controller.js.map