
const LoginController = require("./controllers/LoginController");

module.exports = (app) => {

  // remove before production
  app.get("/test", (req, res) => {
    res.send("The server is working");
  });

  // authentication routes
  app.get("/login", LoginController.login);

};