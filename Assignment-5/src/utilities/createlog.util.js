/* Importing the loggers from utilities*/
const { errorLogger, warningLogger, infoLogger } = require("./logger.util");

/* A function to generate log data based on the status code, as info or warning or error. */
const createLog = (logObject) => {
  switch (true) {
    case logObject.code >= 200 && logObject.code <= 299:
      infoLogger.info(JSON.stringify(logObject));
      break;
    case logObject.code >= 400 && logObject.code <= 499:
      warningLogger.warn(JSON.stringify(logObject));
      break;
    case logObject.code >= 500 && logObject.code <= 599:
      errorLogger.error(JSON.stringify(logObject));
      break;
    default:
  }
};

module.exports = createLog;
