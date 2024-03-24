import Joi from "joi"

export const userSchema = Joi.object({
    username: Joi.string().required(),
    age: Joi.number().required(),
    password: Joi.string().required(),
    hobbies: Joi.array().items(Joi.string()).default([]).required(),
});

export const updateUserSchema = userSchema.keys({
    password: Joi.forbidden()
});

export const loginSchema = userSchema.keys({
    age: Joi.forbidden(),
    hobbies: Joi.forbidden(),
});