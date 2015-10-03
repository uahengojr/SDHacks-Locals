'use strict';
var mongoose = require('mongoose');

var userModel = function() {
	
	var userSchema = mongoose.Schema({
		name: {giveName: String, familyName: String, displayName: String},
		email: String,
		facebook: {id: String, accesToken: String, refreshToekn: String}, 		//Profile picture --> Perhaps store in db through a buffer variable
		gender: String,
		password: String,
		geoLoc: {lat: Number, long: Number}
	});
		
	userSchema.methods.passwordMatches = function (plainText) {
	        var user = this;
			if(plainText === user.password){
				return true;
			}else{
				return false;
			}
	 };
	
	return mongoose.model('User', userSchema);

};

module.exports = new userModel();