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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConfigMYSQL = void 0;
exports.testMySQLConnection = testMySQLConnection;
// Get the client
const promise_1 = __importDefault(require("mysql2/promise"));
// Create the connection to database
exports.sqlConfigMYSQL = promise_1.default.createPool({
    host: process.env.DB_HOST_MYSQ,
    port: Number(process.env.DB_MYSQL_PORT) || 3306,
    user: process.env.DB_USER_MYSQL,
    password: process.env.DB_PASSWORD_MYSQL,
    database: process.env.DB_NAME_MYSQL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
function testMySQLConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield exports.sqlConfigMYSQL.getConnection();
            yield connection.ping();
            console.log('MySQL Database Connected.');
            connection.release(); // Muy importante con pools
        }
        catch (err) {
            console.error('Error connecting to MySQL:', err);
        }
    });
}
//# sourceMappingURL=database.mysql.js.map