const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      quest: Joi.string()
        .min(5)
        .max(1000)
        .required(),
      question_id: Joi.number()
        .min(3)
        .required(),
      submit_user: Joi.string()
        .min(3)
        .max(50)
        .required(),
    };

    return Joi.validate(request, createSchema);
  },
  updateValidation: request => {
    const updateSchema = {
      quest: Joi.String()
        .min(10)
        .max(1000),
      question_id: Joi.number().min(3),
      submit_user: Joi.string()
        .min(5)
        .max(50)
    };

    return Joi.validate(request, updateSchema);
    }
};