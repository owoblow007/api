var todoModel = require('./todo-model.js'),
	userModel = require('../user/user-model.js');

exports.intercept = function(req, res, next, id) {
		todoModel.findById(id, function(err, todo) {
			if(err) {
				req.errstatus = 404;
				return next (new Error("Invalid ID. cannot find todo"));
			}

			req.todo = todo
			next();
	})
	
}

exports.addTodo = function(req, res, next) {
	// prepare a new todo model with the incoming req
	var todo = new todoModel(req.body)
	todo["owner"] = req.user._id
	todo.save(function(err, todo) {
		if(err) {
			req.errstatus = 404;
			return next(err);
		}
		res.status(200).json(todo);

	})
}

exports.fetchAllTodos = function(req, res, next) {
	todoModel.find({owner: req.user._id})
		.exec(function(err, todo){
			if(err){
				req.errstatus = 404
				return next(new Error("could not find an existing todos"))
			}
			res.status(200).json(todo);
		})
}

exports.fetchTodo = function(req, res, next) {
	var id = req.params.id
	res.status(200).json(req.todo);
	
}
exports.putTodo = function(req, res, next) {
	var newTodo = req.body
  todoModel.findOneAndUpdate({_id: req.todo['id']}, newTodo, function(err, todo){
    if (err){
      res.errstatus = 500;
      return next(err);
    }
    res.status(200).json(todo);
  });
};


exports.deleteTodo = function(req, res, next) {
	var id = req.params.id
  todoModel.remove({'_id':id}, function(err, todos) {
    if (err){
      req.errstatus = 404;
      return next({ message: 'Task successfully deleted'});
    }
    res.status(200).json(todos);
  });
}