import express from "express";
import userController from "../controllers/user-controller.js";
import Validator from "../middlewares/validator.js";
import { createUserSchema, updateUserSchema } from "../validations/user-schema.js";
import jwt from "../middlewares/auth.js";

const router = express.Router();

router.get(`/:id?`,
    jwt.auth(),
    userController.getUser);

router.post(`/`,
    Validator.payload(createUserSchema),
    userController.createUser);

router.put(`/:id`,
    Validator.payload(updateUserSchema),
    userController.updateUser);

router.delete(`/:id`,
    userController.deleteUser);

export default router;