'use strict';

var IndexModel = require('../models/index');
var User = require('../models/user');
var passport = require('passport');

module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {
        
        res.render('index', model);
        
    });
	
	//Direct user to facebook fro authentication.
	router.get('/auth/facebook', passport.authenticate('facebook'));
	
	//Handle route after authentication from facebook.	
	router.get('/auth/facebook/callback',
  		passport.authenticate('facebook', 
			{ successRedirect: '/home',
				failureRedirect: '/register' }
	));
	
	
	router.get('/logout', function(req, res) {
	        req.logout();
	        res.redirect('/');
	    });
	
};