/* Import the required Modules */
const { createLogger, format, transports } = require("winston");

// Logger Template for All Levels of Logger.
// This logger only logs to the file and not to the consoel.
const loggerTemplate = (logger_level, file_path) =>
  createLogger({
    level: logger_level,
    transports: [
      new transports.File({
        filename: file_path,
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
const LOGGER = {
  info: (data) => {
    const LOGGER_LEVEL = process.env.LOGGER_LEVEL_INFO;
    const LOGGER_FILE_PATH = "./logs/info.log";
    loggerTemplate(LOGGER_LEVEL, LOGGER_FILE_PATH).info(data);
  },
  warn: (data) => {
    const LOGGER_LEVEL = process.env.LOGGER_LEVEL_WARNING;
    const LOGGER_FILE_PATH = "./logs/warnings.log";
    loggerTemplate(LOGGER_LEVEL, LOGGER_FILE_PATH).warn(data);
  },
  error: (data) => {
    const LOGGER_LEVEL = process.env.LOGGER_LEVEL_ERROR;
    const LOGGER_FILE_PATH = "./logs/errors.log";
    loggerTemplate(LOGGER_LEVEL, LOGGER_FILE_PATH).error(data);
  },
  debug: (data) => {
    const LOGGER_LEVEL = process.env.LOGGER_LEVEL_DEBUG;
    const LOGGER_FILE_PATH = "./logs/debug.log";
    loggerTemplate(LOGGER_LEVEL, LOGGER_FILE_PATH).debug(data);
  },
};

module.exports = LOGGER;
