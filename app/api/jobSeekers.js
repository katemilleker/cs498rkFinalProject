
import axios from "axios";

var host = require("../host.js");

module.exports.getAllJobSeekers = (callback) => {
  let url = `http://${host}:3000/all`;
  axios.get(url).then(response => {
    callback(response.data.applicants);
  }).catch(error => {
    console.log("There was an error getting all job seekers:", error);
  });
};
