"use strict";
import * as fs from "fs";
import jsyaml from "js-yaml";
import * as path from "path";
// From TypeORM
import "reflect-metadata";
// import { DatabaseInit } from "./databases/DatabaseInit";

import * as dotenv from "dotenv";
import { LoggerUtility } from "./utils/LoggerUtility";
dotenv.config();

// tslint:disable-next-line: no-var-requires
const express = require("express");
const app = express();

// tslint:disable-next-line: no-var-requires
const swaggerTools = require("oas-tools");

// swaggerRouter configuration
const options = {
    controllers: path.join(__dirname, "./controllers")
    , docs: {
        apiDocs: "/api-docs",
        apiDocsPrefix: "",
        swaggerUi: "/docs",
        swaggerUiPrefix: ""
    }
    , loglevel: "debug"
    , strict: true
    , validator: true
};

// TODO: change the path of the documentation to URL of gitlab.
const spec = fs.readFileSync(path.join(__dirname, "./api/swagger.yaml"), "utf8");
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

// if(process.env.DATABASE_LOCAL && process.env.DATABASE_LOCAL === "1"){
//   console.log("Running with local database.");
//   var shell = require('shelljs');
//   shell.exec('./scripts/run_mysql_local.sh');
// }
// TODO: wait until connection to database is on to initiate swagger.
// DatabaseInit.getInstance();

swaggerTools.configure(options);
swaggerTools.initialize(swaggerDoc, app, () => {
    LoggerUtility.debug("Swagger OAS middleware initialized.");
});

export default app;
