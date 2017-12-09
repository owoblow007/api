var expressjwt 	= require("express-jwt"),
	jwt 		= require("jsonwebtoken"),
	userModel	= require('../user/user-model.js'),
	checkToken	= expressjwt({secret: "jsonweb"});

	exports.decodeToken = function(req, res, next){
		req.errstatus = 501
		checkToken(req, res, next)
	}

	exports.verifyUser = function(req, res, next) {
		var username = req.body.username,
			password = req.body.password;
		if(!username || !password){
			req.errstatus = 501
			return next(new Error("please provide login details"))
		}
		userModel.findOne({username: username})
		.then(function(user){
			//validate password
			if(!user.authenticate(password)){
				req.errstatus = 501
				return next(new Error("username or password is incorrect"))
			}
			req.user = user;
			next();
		}, function(err){
			if(err){
				req.errstatus = 500
				return next(err);
			}
		})
	}

	exports.sign = function(id) {
		return jwt.sign(
			{_id: id},
			 "jsonweb",
			 {expiresIn: 35 * 24 * 60 * 60}
		)
	}
