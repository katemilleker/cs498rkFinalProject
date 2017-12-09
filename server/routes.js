
const AuthController = require("./controllers/AuthController");
const ProfileController = require("./controllers/ProfileController");
const RecruiterController = require("./controllers/RecruiterController");
const ResumeController = require("./controllers/ResumeController");

var express = require('express')


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: "unable to auth" });
}


module.exports = (app, passport) => {

    // remove before production
    app.get("/test", (req, res) => {
        res.status(200).json({
            message: "testing!"
        });
    });

    var router = express.Router()

    // routes to get profile data --> ONLY FOR JOBSEEKER
    ProfileController(router, isLoggedIn);
    RecruiterController(router, isLoggedIn);
    ResumeController(router, isLoggedIn);



    // authentication routes
    AuthController(router, passport);

    app.use(router);
    
};
