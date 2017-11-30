
const express = require("express");
const bodyParser = require("body-parser");

// initialize express
const app = express();

// add body parser to parse POST requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// all the routes for this server
require("./routes.js")(app);

app.listen(3000, () => console.log('HypeRecruiter Server listening on port 3000!'));