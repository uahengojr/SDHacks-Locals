'use strict';

var passport = require('passport'),
	User = require('../models/user'),
	appKeys = require('../config/keys'),
	FacebookStrategy = require('passport-facebook').Strategy;	
	
	exports.facebookStrategy = function(){
		return new FacebookStrategy({
			clientID: appKeys.facebookAuth.clientID,
			clientSecret: appKeys.facebookAuth.clientSecret,
			callbackURl: 'https://localhost:8000/auth/facebook/callback'		
		},
			function(accessToken, refreshToken, profile, done) {
				
				console.log(profile);	
				
				//Async verification...
				process.nextTick(function () {
					User.findOne({'facebook.id': profile.id}, function(err, user) {
						if(err){
							return done(err); 
							console.log('BRAKE!');
						}
						if(user) {
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
									creatingUser.email[0].value = profile.email[0] || 'None'; 					//Swith-case block hear...
					
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
			});
		};