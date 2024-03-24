import Joi from "joi"

export const createUserSchema = Joi.object({
    username: Joi.string().required(),
    age: Joi.number().required(),
    password: Joi.string().required(),
    hobbies: Joi.array().items(Joi.string()).default([]).required(),
});

export const updateUserSchema = Joi.object({
    username: Joi.string().required(),
    age: Joi.number().required(),
    hobbies: Joi.array().items(Joi.string()).default([]).required(),
});

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});