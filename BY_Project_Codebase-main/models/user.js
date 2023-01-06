var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	unique_id: String,
	email: String,
	name: String,
	role: String,
	address:String,
	phoneno:Number,
	altphoneno:Number,
	password: String,
	passwordConf: String
}),
User = mongoose.model('User', userSchema);

module.exports = User;