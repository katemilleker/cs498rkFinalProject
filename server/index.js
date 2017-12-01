
const express = require("express");
const bodyParser = require("body-parser");




const mongoose = require("mongoose");
const secrets = require("../secrets.js")

const passport = require('passport')
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');



require('./auth/passport')(passport);

// initialize express
const app = express();

mongoose.connect(secrets.conn);



// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

// add body parser to parse POST requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Initialize cookie sessions
app.use(cookieParser());
app.use(cookieSession({
  keys: ['asdf', 'asdf']
}));
// Initialize Passport
app.use(passport.initialize()); // Create an instance of Passport
app.use(passport.session());

// all the routes for this server
require("./routes.js")(app, passport);

app.listen(3000, () => console.log('HypeRecruiter Server listening on port 3000!'));
