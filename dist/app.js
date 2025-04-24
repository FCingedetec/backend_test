"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const dotenv = __importStar(require("dotenv"));
const database_1 = require("./database/database");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
//import { dbPool, testDBConnection } from './database/database';
//Routes
const user_routes_1 = __importDefault(require("./routes/user.routes"));
dotenv.config();
class App {
    constructor(port) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.settings();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
    }
    settings() {
        this.app.set('port', process.env.PORT);
    }
    routes() {
        this.app.use(user_routes_1.default);
    }
    //Static files
    async listen() {
        try {
            await (0, database_1.testDBConnection)();
            this.app.listen(this.app.get("port"), () => {
                console.log("✅ Server running on port", this.app.get("port"));
            });
        }
        catch (error) {
            console.error("❌ No se pudo iniciar el servidor debido a un error.");
        }
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map