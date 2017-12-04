var secrets = require('../../secrets.js');
var mongoose = require('mongoose');

var User = require('../models/User.js'); // instance of mongoose.model
var Recruiter = require('../models/Recruiter.js'); // instance of mongoose.model


mongoose.Promise = global.Promise;


module.exports = (router, isLoggedIn) => {
    router.get('/profile',
        isLoggedIn,
        function(req, res) {
            req.user["password"] = undefined;
            res.status(200).json({
                user: req.user,
                message: "Welcome!"
            });
        });


    return router;
};
