import express from "express";
import Validator from "../middlewares/validator.js";
import { loginSchema } from "../validations/user-schema.js";
import authController from "../controllers/auth-controller.js";

const router = express.Router();

router.post(`/login`,
    Validator.payload(loginSchema),
    authController.login);

export default router;