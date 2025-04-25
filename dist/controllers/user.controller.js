"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllUsers = void 0;
const database_mysql_1 = require("../database/database.mysql");
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
const fetchAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield database_mysql_1.sqlConfigMYSQL.query('SELECT * FROM users');
        res.json(rows);
    }
    catch (error) {
        console.error('MySQL query error:', error);
        res.status(500).send(error.message);
    }
});
exports.fetchAllUsers = fetchAllUsers;
//# sourceMappingURL=user.controller.js.map