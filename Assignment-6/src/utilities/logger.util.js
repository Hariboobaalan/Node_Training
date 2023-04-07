/* Import the required Modules */
const { createLogger, format, transports } = require("winston");

/* Logger for error logs */
const errorLogger = createLogger({
  level: process.env.LOGGER_LEVEL_ERROR,
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
    new transports.File({
      filename: "./logs/errors.log",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
  ],
});

/* Logger for warning logs */
const warningLogger = createLogger({
  level: process.env.LOGGER_LEVEL_WARNING,
  transports: new transports.File({
    filename: "./logs/warnings.log",
    format: format.combine(
      format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
      format.align(),
      format.printf(
        (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
      )
    ),
  }),
});

/* Logger for info logs */
const infoLogger = createLogger({
  level: process.env.LOGGER_LEVEL_INFO,
  transports: [
    new transports.File({
      filename: "./logs/info.log",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
  ],
});

/* Logger for debugging logs */
const debugLogger = createLogger({
  level: process.env.LOGGER_LEVEL_DEBUG,
  transports: new transports.File({
    filename: "./logs/debug.log",
    format: format.combine(
      format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
      format.align(),
      format.printf(
        (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
      )
    ),
  }),
});

const traceLogger = createLogger({
  level: process.env.LOGGER_LEVEL_TRACE,
  transports: new transports.File({
    filename: "./logs/trace.log",
    format: format.combine(
      format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
      format.align(),
      format.printf(
        (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
      )
    ),
  }),
});

module.exports = {
  errorLogger,
  warningLogger,
  infoLogger,
  debugLogger,
  traceLogger,
};
