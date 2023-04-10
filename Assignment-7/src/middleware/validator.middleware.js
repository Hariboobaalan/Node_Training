/* Importing the required modules */
const Joi = require("joi");
const INVALID_PAYLOAD = require("../constants/messages.constants").ERRORS
  .INVALID_PAYLOAD;
/* JOI Schemas for the incoming payload */
const SCHEMA = {
  createTaskSchema: Joi.object({
    taskID: Joi.number().required(),
    title: Joi.string().min(3).max(50).trim().required(),
    description: Joi.string().min(3).max(1000).required(),
    dueDate: Joi.date().required(),
    priority: Joi.number().min(1).max(5).default(1).required(),
    taskComments: Joi.array()
      .items({
        comment: Joi.string().min(3).max(1000).required(),
        timestamp: Joi.date().default(Date.now).required(),
      })
      .optional(),
  }),
  updateTaskSchema: Joi.object({
    title: Joi.string().min(3).max(50).trim().optional(),
    description: Joi.string().min(3).max(1000).optional(),
    dueDate: Joi.date().required().optional(),
    priority: Joi.number().min(1).max(5).default(1).optional(),
    taskComments: Joi.array()
      .items({
        comment: Joi.string().min(3).max(1000).required(),
        timestamp: Joi.date().default(Date.now).required(),
      })
      .optional(),
  }),
  userSchema: Joi.object({
    username: Joi.string().max(30).required(),
    password: Joi.string().min(8).max(30).required(),
  }),
};

/* Validator Function to validate the JOI Schema */
/**
 * This is a validator function that checks if the request body matches a given schema and returns an
 * error message if it does not.
 * @param schema - The `schema` parameter is a validation schema that defines the structure and
 * constraints of the data that is expected in the request body. It is typically created using a
 * validation library such as Joi or Yup. The `validator` function returns a middleware function that
 * uses this schema to validate the request body and passes
 * @returns A higher-order function that takes in a schema and returns a middleware function that
 * validates the request body against the schema. If the validation is successful, it calls the next
 * middleware function. If the validation fails, it sends a 400 response with an error message.
 */
const validator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message.replaceAll('"', "`"));
      res.status(400).json({ error: INVALID_PAYLOAD });
    }
  };
};
module.exports = { ...SCHEMA, validator };
