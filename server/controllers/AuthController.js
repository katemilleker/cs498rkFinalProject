var secrets = require('../../secrets.js');
var mongoose = require('mongoose');

var LocalStrategy = require('passport-local').Strategy;
//var User = require('../models/User.js'); // instance of mongoose.model

mongoose.Promise = global.Promise;


module.exports = (router, passport) => {

    router.post("/login",
        passport.authenticate('local-login'),
        (req, res) => {
            console.log("attempted log in")
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




    router.post("/loginrec",
        passport.authenticate('local-recruiter-login'),
        (req, res) => {
            console.log("attempted log in")
            console.log(req.isAuthenticated());
            res.status(200).json({ user: req.user.email});
        }
    );

    router.post("/registerrec",
        passport.authenticate('local-recruiter-signup'),
        (req, res) => {
            res.status(200).json({ user: req.user.email})
        }
    );

    router.get('/logoutRec', function(req, res) {
        req.logOut();
        res.status(200).json({ message: "logged out "});
    });




    return router;
};
