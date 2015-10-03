'use strict';

var mongoose = require('mongoose');

var db = function () {
    return {
        config: function (conf) {
            mongoose.connect('mongodb://' + conf.host + '/' + conf.database);
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function callback() {
                console.log('Datastore connected! Get sh*t done!');
            });
        }
    };
};

module.exports = db();