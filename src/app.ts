"use strict";
import * as dotenv from "dotenv";
import express from "express";
import * as fs from "fs";
import jsyaml from "js-yaml";
import * as path from "path";
import { LoggerUtility } from "./utils/LoggerUtility";

// From TypeORM
import "reflect-metadata";
import { createConnection, createConnections } from "typeorm";

import cors from "cors";
import * as helmet from "helmet";

dotenv.config();
const app = express();

// tslint:disable-next-line: no-var-requires
const swaggerTools = require("oas-tools");

// swaggerRouter configuration
const options = {
    controllers: path.join(__dirname, "./controllers"),
    docs: {
        apiDocs: "/api-docs",
        apiDocsPrefix: "",
        swaggerUi: "/docs",
        swaggerUiPrefix: ""
    },
    loglevel: "info",
    strict: true,
    validator: true
};

// TODO: change the path of the documentation to URL of gitlab.
const spec = fs.readFileSync(
  path.join(__dirname, "../src/api/swagger.yaml"),
  "utf8"
);
const swaggerDoc = jsyaml.safeLoad(spec);

if (process.env.SWAGGER_HOST) {
    swaggerDoc.host = process.env.SWAGGER_HOST;
}
let SWAGGER_BASE_PATH = process.env.SWAGGER_BASE_PATH;
if (!SWAGGER_BASE_PATH) {
    SWAGGER_BASE_PATH = "/";
}
if (process.env.SWAGGER_BASE_PATH) {
    swaggerDoc.basePath = process.env.SWAGGER_BASE_PATH;
}

// Allow cross origin
// require("./utils/cors-util")(app);

// Enable JWT tokens
// require("./utils/jwt-util").addJWT(app, SWAGGER_BASE_PATH);

let connectionFunction;
if (fs.existsSync("./ormconfig.json")) {
    LoggerUtility.info("Found ormconfig.json file in root folder.");
    connectionFunction = createConnection();
} else {
    const specDB = fs.readFileSync(
        path.join(__dirname, "../src/assets/ormconfig.json"),
        "utf8"
      );
    const dbConf = JSON.parse(specDB);
    dbConf[0].entities = [];
    if (process.env.NODE_ENV === "production") {
        LoggerUtility.info("Working with JS files");
        dbConf[0].entities.push("build/databases/entities/**/*.js");
    } else {
        LoggerUtility.info("Working with TS files");
        dbConf[0].entities.push("src/databases/entities/**/*.ts");
    }
    const password = process.env.DB_PASSWORD;
    const user = process.env.DB_USER;
    dbConf[0].username = user;
    dbConf[0].password = password;
    connectionFunction = createConnections(dbConf);
}

app.use(cors());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
connectionFunction
    .then(async (connection) => {
        swaggerTools.configure(options);
        swaggerTools.initialize(swaggerDoc, app, () => {
            LoggerUtility.debug("Swagger OAS middleware initialized.");
        });
    })
    .catch((error) => {
        LoggerUtility.error("TYPEORM: Error conneting with DB.");
        LoggerUtility.error(error);
        process.exit(1);
    });

export default app;
