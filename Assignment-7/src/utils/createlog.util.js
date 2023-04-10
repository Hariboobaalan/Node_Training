/* Importing the loggers from utilities*/
const { errorLogger, warningLogger, infoLogger } = require("./logger.util");

/**
 * The function creates logs based on the code range of the log object and sends them to different
 * loggers.
 * @param logObject - It is an object that contains information about a log, including a code that
 * indicates the status of the log. The code is used to determine which logger to use (infoLogger,
 * warningLogger, or errorLogger) to log the information. The logObject is passed as a parameter to the
 * createLog
 */

const createLogUtil = (logObject) => {
  switch (true) {
    case logObject.status >= 200 && logObject.status <= 299:
      infoLogger.info(JSON.stringify(logObject));
      break;
    case logObject.status >= 400 && logObject.status <= 499:
      warningLogger.warn(JSON.stringify(logObject));
      break;
    case logObject.status >= 500 && logObject.status <= 599:
      errorLogger.error(JSON.stringify(logObject));
      break;
    default:
  }
};
const createLog = (request, response, result) => {
  createLogUtil({
    ...result,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
};

module.exports = createLog;
