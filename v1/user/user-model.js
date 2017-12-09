var mongoose 		= require('mongoose'),
	bcrypt			  = require('bcrypt-nodejs'),
	Schema 			= mongoose.Schema,
	UserSchema;

// connect to mongodb
mongoose.connect("mongodb://localhost/todos")

// create a schema
UserSchema = mongoose.Schema({
	username: {unique: true, required: true, type: String },
	password: {required: true, type: String},
	todos: [{type: Schema.Types.ObjectId, ref: "tasks"}]
})

UserSchema.pre('save', function(next){
	this.password = this.encryptPassword(this.password);
	next();
})

UserSchema.methods = {
	authenticate: function(plaintext){
		return bcrypt.compareSync(plaintext, this.password);
	},

	encryptPassword: function(plaintext){
		if(!plaintext)
			return ""

			var salt = bcrypt.genSaltSync();
			return bcrypt.hashSync(plaintext, salt);
	}
}

module.exports = mongoose.model("users", UserSchema);
