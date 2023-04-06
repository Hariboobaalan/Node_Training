const Joi = require("joi");
/* This code is defining a schema using the Joi library for validating the request body of an API
endpoint. The schema defines the expected shape and data types of the request body. In this case,
the schema expects an object with properties `employeeId`, `realName`, `nickName`, `dob`, and
`hobbies`, each with specific validation rules such as being required, having a minimum and maximum
length, and being of a certain data type (e.g. integer, string, date). This schema will be used in a
middleware function to validate incoming requests before they are processed by the API endpoint. */
const schema = Joi.object().keys({
  employeeId: Joi.number().integer().required(),

  realName: Joi.string().min(3).max(30).required(),

  nickName: Joi.string().min(3).max(30).required(),

  dob: Joi.date().required(),

  hobbies: Joi.string().min(3).max(50).required(),
});

/**
 * This is a middleware function that validates the request body using a schema and returns an error
 * message if the validation fails.
 * @returns A middleware function that validates the request body against a schema and either calls the
 * next middleware function or sends a 422 error response with the validation error message.
 */
const middleware = () => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      console.log("error", message);
      res.status(422).json({ error: message });
    }
  };
};
module.exports = middleware;
