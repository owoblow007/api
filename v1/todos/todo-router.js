var express		   	= require('express'), //you always have to require express 
	todoRouter	   	= express.Router(),
	auth			= require('../auth/auth.js')
	todoController 	= require('./todo-controller.js');

todoRouter.param("id", todoController.intercept)

//the '/' goes to the home router for todos
todoRouter.route('/')
	.post(auth.decodeToken, todoController.addTodo)
	.get(auth.decodeToken, todoController.fetchAllTodos)

todoRouter.route('/:id')
	.get(todoController.fetchTodo)
	.delete(todoController.deleteTodo)
	.put(todoController.putTodo)
module.exports = todoRouter;