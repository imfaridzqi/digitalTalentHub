const Joi = require("joi");

module.exports.lowonganSchema = Joi.object({
  lowongan: Joi.object({
    title: Joi.string().required(),
    salary: Joi.number().required().min(1),
    location: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string(),
  }).required(),
});
