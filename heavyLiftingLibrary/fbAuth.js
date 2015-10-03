'use strict';

var passport = require('passport'),
	User = require('../models/user'),
	FacebookStrategy = require('passport-facebook').Strategy;
	
	passport.use(new FacebookStrategy({
		clinetID:'[APP_CLIENT_ID]',
		clientSecret:'[[APP_CLIENT_SECRET]' ,
		callbackURl: 'http://127.0.0.1:8000/'
	},
	function(accessToken, refreshToken, profile, done) {
		//Async verification...
		process.nextTick(function () {
			User.findOne({'facebook.id': profile.id}, function(err, use) {
				if(err){
					return done(err); 
					console.log('BRAKE!');
				}
				if(user){
					done(null, user);
				}else{
					var creatingUser = new User();
					
					console.log(profile); //This is for primitive debugging...
					
					creatingUser.name.giveName = profile.name.givenName;
					creatingUser.name.familyName = profile.name.familyName;
					creatingUser.displayName = profile.displayName;
					creatingUser.facebook.id = profile.id;
					creatingUser.facebook.accessToken = accessToken;
					creatingUser.facebook.refreshToken = refreshToken;
					
					//Implement a way to catch empty/undefined email fields.
					creatingUser.email[0].value = profile.email[0] || 'None'; 					//Case block hear...
					
					creatingUser.gender = profile.gender || "NotSpecified";
					
					
					//Save the user to teh datastore
					creatingUser.save(function(err){
						if(err){
							//Just throw an error for now.
							throw err;
						}
						//If successful retunr the user.
						return done(null, user);
					});
				}
			});
		});
	}));