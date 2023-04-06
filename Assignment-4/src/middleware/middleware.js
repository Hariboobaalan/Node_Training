const Joi = require("joi");
const schema = Joi.object().keys({
  employeeId: Joi.number().integer().required(),

  realName: Joi.string().min(3).max(30).required(),

  nickName: Joi.string().min(3).max(30).required(),

  dob: Joi.date().required(),

  hobbies: Joi.string().min(3).max(50).required(),
});

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
