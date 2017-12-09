var express = require('express'),
	userRouter = express.Router(),
	userController = require('./user-controller.js');

//userRouter.param("id", userController.intercept)

userRouter.route('/')
	.post(userController.addUser);
    //.get(todoController.fetchAllTodos);
 //userRouter.route('/:id')
 	//.get(todoController.fetchAllTodo)
//  //    .put(todoController.updateTodo)
// 	// .delete(todoController.deleteTodo)


module.exports = userRouter;
