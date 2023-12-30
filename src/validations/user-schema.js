import Joi from "joi";

export const userSchema = Joi.object({
    username: Joi.string().required(),
    age: Joi.number().required(),
    hobbies: Joi.array().items(Joi.string()).default([]).required(),
});
