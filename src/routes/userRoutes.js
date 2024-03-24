import express from "express";
import userController from "../controllers/userController.js";
import Validator from "../middlewares/validator.js";
import { updateUserSchema, userSchema } from "../validations/userSchema.js";
import jwt from "../middlewares/auth.js";

const router = express.Router();

router.get(`/:id?`,
    jwt.verify(),
    userController.getUser);

router.post(`/`,
    Validator.payload(userSchema),
    userController.createUser);

router.put(`/:id`,
    jwt.verify(),
    Validator.payload(updateUserSchema),
    userController.updateUser);

router.delete(`/:id`,
    jwt.verify(),
    userController.deleteUser);

export default router;