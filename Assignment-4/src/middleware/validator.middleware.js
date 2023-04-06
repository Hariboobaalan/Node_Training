/* Importing the required modules */
const Joi = require("joi");
/* JOI Schema for the incoming payload */
const payloadSchema = Joi.object().keys({
  employeeId: Joi.number().integer().required(),

  realName: Joi.string().min(3).max(30).required(),

  nickName: Joi.string().min(3).max(30).required(),

  dob: Joi.date().required(),

  hobbies: Joi.string().min(3).max(50).required(),
});

/* JOI Schema for the Update Buddy incoming payload */
const updateSchema = Joi.object().keys({
  realName: Joi.string().min(3).max(30).required(),

  nickName: Joi.string().min(3).max(30).required(),

  dob: Joi.date().required(),

  hobbies: Joi.string().min(3).max(50).required(),
});

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
module.exports = { payloadSchema, updateSchema, validator };
