const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/userController');

userRouter.get('/', userController.getAllUsers);

userRouter.post('/', userController.saveUsers);

userRouter.get('/:userid', userController.cache, userController.getRepos);


module.exports = userRouter