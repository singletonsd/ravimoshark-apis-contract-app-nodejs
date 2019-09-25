"use strict";

import http from "http";
import app from "./app";
import { LoggerUtility } from "./utils/LoggerUtility";

const serverPort = process.env.PORT || 3000;
// Start the server
http.createServer(app).listen(serverPort, () => {
    LoggerUtility.debug("App running at http://localhost:" + serverPort);
    LoggerUtility.debug("________________________________________________________________");
    LoggerUtility.debug("API docs (Swagger UI) available on http://localhost:" + serverPort + "/docs");
    LoggerUtility.debug("________________________________________________________________");
});
