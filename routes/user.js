const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/userController');

userRouter.get('/users', userController.getAllUsers);

userRouter.post('/users', userController.saveUsers);


module.exports = userRouter