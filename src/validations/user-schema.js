const Joi = require("joi");

exports.userSchema = Joi.object({
    username: Joi.string().required(),
    age: Joi.number().required(),
    hobbies: Joi.array().items(Joi.string()).default([]).required(),
});
