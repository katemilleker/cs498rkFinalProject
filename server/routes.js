
const AuthController = require("./controllers/AuthController");
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
    res.send("The server is working");
  });

  var router = express.Router()


  // authentication routes
  AuthController(router, passport);
  //router.get("/login", LoginController.login);
  //router.post("/login", Login)

  //testing authenticate
  router.get('/profile',
        isLoggedIn,
        function(req, res) {
            console.log(req.isAuthenticated());
            res.status(200).json({ user: req.user, message: "Welcome!"
        });
    });


  app.use(router);


};
