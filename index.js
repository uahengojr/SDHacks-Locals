'use strict';

var express = require('express');
var kraken = require('kraken-js');
var passport = require('passport');

var db = require('./heavyLiftingLibrary/db');
var fbAuth = require('./heavyLiftingLibrary/fbAuth');
var User = require('./models/user');

var options, app;

options = {
    onconfig: function (config, next) {
		
		
		passport.use(fbAuth.facebookStrategy());
		
		passport.serializeUser(function(user, done) {
		  done(null, user.id);
		});

		passport.deserializeUser(function(id, done) {
		  User.findById(id, function(err, user) {
		    done(err, user);
		  });
		});		
		
		
		passport.initialize();
		
        db.config(config.get('databaseConfig'));
        
		next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
