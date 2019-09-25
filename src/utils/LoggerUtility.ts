import winston, { LeveledLogMethod, Logger, LoggerOptions, transports } from "winston";

export class LoggerUtility {

    // TODO: configure format of logger.
    // TODO: configure a tool to see logger like logstash.
    public static getInstance() {
        if (!this.instance) {
            this.instance = new LoggerUtility();
            this.logger = winston.createLogger(this.options);
        }
        return this.instance;
    }

    public static info(message: string, ...meta: Array<any>) {
        LoggerUtility.log("info", message, meta);
    }

    public static error(message: string, ...meta: Array<any>) {
        LoggerUtility.log("error", message, meta);
    }

    public static warn(message: string, ...meta: Array<any>) {
        LoggerUtility.log("warn", message, meta);
    }

    public static debug(message: string, ...meta: Array<any>) {
        LoggerUtility.log("debug", message, meta);
    }

    public static log(level: string, message: string, ...meta: Array<any>) {
        LoggerUtility.getInstance();
        this.logger.log(level.toString(), message, meta);
    }

    private static readonly options: LoggerOptions = {
        transports: [ new transports.Console({
            debugStdout: true,
            level: "debug" }) ]
    };

    private static instance: LoggerUtility;
    private static logger: Logger;

    private constructor() {

    }
}
