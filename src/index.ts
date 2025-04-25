import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();

import { App } from "./app";

async function main() {
  const port = Number(process.env.PORT) || 3000;
  const app = new App(port);
  await app.listen();
}

main().catch((err) => {
  console.error("Error al iniciar la aplicación:", err);
});