var secrets = require('../../secrets.js');
var mongoose = require('mongoose');

var LocalStrategy = require('passport-local').Strategy;
//var User = require('../models/User.js'); // instance of mongoose.model

mongoose.Promise = global.Promise;


module.exports = (router, passport) => {
    router.get("/login", (req, res) => {
        res.send("Place holder, not sure if it is needed");
    });

    router.post("/login",
        passport.authenticate('local-login'),
        (req, res) => {
            console.log(req.isAuthenticated());
            res.status(200).json({ user: req.user.email});
        }
    );

    router.post("/register",
        passport.authenticate('local-signup'),
        (req, res) => {
            res.status(200).json({ user: req.user.email})
        }
    );

    router.get('/logout', function(req, res) {
        req.logOut();
        res.status(200).json({ message: "logged out "});
    });


    return router;
};
