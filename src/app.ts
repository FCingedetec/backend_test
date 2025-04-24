import * as dotenv from 'dotenv';
dotenv.config();

import { testDBConnection } from './database/database';
import express, { Application } from "express";
import morgan from 'morgan';
import helmet from "helmet";
import cors from 'cors';

// Routes
import UserRoutes from './routes/user.routes';

export class App {
    app: Application;

    constructor(private port: number) {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        this.settings();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
    }

    settings() {
        this.app.set('port', this.port || 3000);
    }

    routes() {
        this.app.use(UserRoutes);
    }

    async listen() {
        try {
            await testDBConnection();
            this.app.listen(this.app.get("port"), () => {
                console.log(`✅ Server running on port ${this.app.get("port")}`);
            });
        } catch (error) {
            console.error("❌ No se pudo iniciar el servidor debido a un error:", error);
        }
    }
}