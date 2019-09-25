import * as dotenv from "dotenv";
import * as fs from "fs";
import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { LoggerUtility } from "../utils/LoggerUtility";

dotenv.config();

const CONNECTIONS_ATTEMPTS = 10;
const CONNECTIONS_WAITING_S = 2;

export class DatabaseInit {

    public static getInstance() {
        return this.instance || this.init();
    }

    public static close() {
        if (this.instance) {
            this.instance.close();
        }
    }

    public static sleep(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    private static instance: Connection;

    private static async init() {
        let DATABASE_NAME = process.env.DB_MAIN_CLIENT;
        if (!DATABASE_NAME) {
            LoggerUtility.warn("Variable DB_MAIN_CLIENT not set. Used default value: docker");
            DATABASE_NAME = "docker";
        }
        LoggerUtility.info("Connecting using configuration for", DATABASE_NAME);
        let dbFile: string = process.env.DATABASE_FILE;
        if (!dbFile) {
            dbFile = "./database.json";
            LoggerUtility.warn("Variable DATABASE_FILE not set. Used default value: ./database.json");
        }
        if (!fs.existsSync(dbFile)) {
            LoggerUtility.error("Database file with name ", dbFile, "does not exits.");
            process.exit(1);
        }
        const database = JSON.parse(fs.readFileSync(dbFile, "utf8"));
        const conf: ConnectionOptions = {
            database: database.main[DATABASE_NAME].connection.database,
            entities: [],
            host: database.main[DATABASE_NAME].connection.host,
            password: database.main[DATABASE_NAME].connection.password,
            port: database.main[DATABASE_NAME].connection.port || 3306,
            type: database.main[DATABASE_NAME].client,
            username: database.main[DATABASE_NAME].connection.user
        };
        if (process.env.DEVELOPMENT && process.env.DEVELOPMENT === "1") {
            LoggerUtility.info("Working with TS files");
            conf.entities.push("src/database/main/models/**/*.ts", "src/database/models/**/*.ts");
        } else {
            LoggerUtility.info("Working with JS files");
            conf.entities.push("build/database/main/models/**/*.js", "build/database/models/**/*.js");
        }
        LoggerUtility.info("Connecting to host", conf.host, conf.port);
        for (let i = 0; i < CONNECTIONS_ATTEMPTS; i++) {
            LoggerUtility.debug("Connecting to database..");
            await this.sleep(1000 * CONNECTIONS_WAITING_S);
            try {
                this.instance = await createConnection(conf);
                if (this.instance.isConnected) {
                    LoggerUtility.info("Connection SUCCESS!");
                    LoggerUtility.info("Checking database version...");
                    // const version = await this.instance.getRepository(DATABASECHANGELOG)
                    //     .createQueryBuilder("data").orderBy("data.TAG", "DESC").getOne();
                    // const dbVersion = version.TAG.replace(/^\D+/g, "");
                    const appVersion: string = process.env.DB_SUPPORTED_VERSION || "";
                    if (!appVersion.length) {
                        LoggerUtility.error("ERROR: DB version is not defined in .ENV file.");
                        process.exit(1);
                    }
                    // LoggerUtility.debug("Current Database Version: " + dbVersion);
                    // LoggerUtility.debug("Supported Declared Database Version: " + appVersion);
                    // if (appVersion.replace(".", "") !== dbVersion.replace(".", "")) {
                    //     LoggerUtility.error("ERROR: Database version (" + dbVersion
                    //         + ") is not the same as app supported db version (" + appVersion + ")");
                    //     process.exit(1);
                    // }
                    return this.instance;
                }
            } catch (error) {
                LoggerUtility.warn(error);
            }
            LoggerUtility.warn("FAIL! Retry in " + CONNECTIONS_WAITING_S + " second/s.");
            await this.sleep(1000 * CONNECTIONS_WAITING_S);
        }
        LoggerUtility.debug("Exit! No Database connection.");
        process.exit(1);
        return this.instance;
    }

    private constructor() {
    }
}
