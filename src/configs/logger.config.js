import winston from "winston";

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error){
        Object.assign(info, {message: info.stack});
    }
    return info;
});

let level;
let format;
if (process.env.NODE_ENV === "development") {
    level = "debug";
    format = winston.format.combine(
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.printf(({level, message}) => `${level}:${message}`)
    );
} else {
    level = "info";
    format = winston.format.combine(
        winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({level, message}) => `${level}:${message}`)
    );
}

const logger = winston.createLogger({
    level: level,
    format: winston.format.combine(
        enumerateErrorFormat(),
        format
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ["error"],
        }),
    ],
});

export default logger;
