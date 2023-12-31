const express = require("express");
const userController = require("../controllers/user-controller.js");
const Validator= require("../middlewares/validator.js");
const { userSchema }= require("../validations/user-schema.js");

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

module.exports = router;