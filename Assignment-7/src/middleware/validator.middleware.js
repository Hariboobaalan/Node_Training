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
    username: Joi.string().trim().max(30).required(),
    password: Joi.string().min(8).max(30).required(),
  }),
};

/* Validator Function to validate the Incoming Payload Schema */
const validator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      res.status(400).json({ error: INVALID_PAYLOAD });
    }
  };
};
module.exports = { ...SCHEMA, validator };
