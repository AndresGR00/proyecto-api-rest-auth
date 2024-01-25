const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controller');
const { isAuth, isAdmin } = require("../../middlewares/auth");

router.get('/users', [isAuth], userController.getAllUsers);
router.post('/create-user', userController.createAnUser);
router.post('/login', userController.loginUser);
router.put('/edite-user/:id', [isAdmin], userController.editAnUser);
router.delete('/delete-user/:id', [isAdmin], userController.deleteAnUser);

module.exports = router;