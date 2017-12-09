// Source: https://github.com/bluedrops/passport_demo/blob/master/backend/auth/passport.js

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var Recruiter = require('../models/Recruiter');

function isRecruiter(user){
    if ("resumes" in user) {
        return true;
    }
    return false;
}

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        var dict = {id: user.id}
        if (isRecruiter(user)){
            dict.type = "recruiter";
        }else{
            dict.type = "user";
        }
        done(null, dict);
    });

    passport.deserializeUser(function(dict, done) {
        var id = dict.id;
        var type = dict.type;

        if (type == "recruiter"){
            Recruiter.findById(id, function(err, user) {
                done(err, user);
            });
        }else{
            User.findById(id, function(err, user) {
                done(err, user);
            });
        }
    });

    // Registration Strategy for recruiter
    passport.use('local-recruiter-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true,
    },
    function(req, email, password, done) {
        Recruiter.findOne({'email' : email}, function(err, user) {
            if ( err ) {
                return done(err);
            } else if ( user ) {
                return done(null, false);
            } else {
                var newUser = new Recruiter();

                newUser.name = req.body.name;
                newUser.email = email;
                newUser.password = password;

                newUser.save(function(err) {
                    if(err){
                        done(err)
                    }
                    return done(null, newUser);
                });
            }
        });
    }));

    // Login Strategy for recruiter
    passport.use('local-recruiter-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    function(email, password, done) {
        Recruiter.findOne({'email': email}, function(err, user) {
            if ( err ) {
                return done(err);
            } else if ( !user || !user.validPassword(password) ) {
                return done(null, false);
            }

            return done(null, user);
        });
    }));

    // Registration Strategy for regular users
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true,
    },
    function(req, email, password, done) {
        User.findOne({'email' : email}, function(err, user) {
            if ( err ) {
                return done(err);
            } else if ( user ) {
                return done(null, false);
            } else {
                var newUser = new User();

                newUser.name = req.body.name;
                newUser.email = email;
                newUser.password = password;

                newUser.save(function(err) {
                    if(err){
                        done(err)
                    }
                    return done(null, newUser);
                });
            }
        });
    }));

    // Login Strategy for regular users
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    function(email, password, done) {
        User.findOne({'email': email}, function(err, user) {
            if ( err ) {
                return done(err);
            } else if ( !user || !user.validPassword(password) ) {
                return done(null, false);
            }

            return done(null, user);
        });
    }));
};
