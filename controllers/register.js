'use strict';

var RegisterModel = require('../models/register'),
	User = require('../models/user'),
	passport = require('passport-facebook');


module.exports = function (router) {

    var model = new RegisterModel();

    router.get('/', function (req, res) {
        
        
        res.render('register', model);
        
        
    });

};
