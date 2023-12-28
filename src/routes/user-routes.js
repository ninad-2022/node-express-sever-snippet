import express from "express";
import userController from "../controllers/user-controller.js";

const router = express.Router();

// router.get('/:id', userController.getUser)
// router.post('/', userController.createUser)
// router.put('/:id', userController.updateUser)
// router.delete('/:id', userController.deleteUser)

router.get('/hello', userController.helloWorld);

export default router;