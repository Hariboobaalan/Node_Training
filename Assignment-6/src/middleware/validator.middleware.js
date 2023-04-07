/* Importing the required modules */
const Joi = require("joi");
/* JOI Schema for the incoming payload */
const payloadSchema = Joi.object().keys({});

/* Validator Function to validate the JOI Schema */
const validator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message.replaceAll('"', "`"));
      res.status(400).json({ error: `INVALID PAYLOAD STRUCTURE ${message}` });
    }
  };
};
module.exports = { payloadSchema, validator };
