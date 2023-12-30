import express from "express";
import userController from "../controllers/user-controller.js";
import Validator from "../middlewares/validator.js"
import { userSchema } from "../validations/user-schema.js"

const router = express.Router();

router.get(`/:id?`,
    userController.getUser)

router.post(`/`,
    Validator.payload(userSchema),
    userController.createUser)
    
router.put(`/:id`, 
    Validator.payload(userSchema),
    userController.updateUser)

router.delete(`/:id`,
    userController.deleteUser)

export default router;