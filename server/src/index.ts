import "module-alias/register";
// import "reflect-metadata";
import "dotenv/config";
import validateEnv from "@/utils/validateEnv";
import App from "./app";
import config from "@/config/config";
validateEnv();

const app = new App(Number(config.server.port));

app.bootstrap();
