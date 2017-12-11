
import axios from "axios";
//import querystring from "querystring";

var host = require("../host.js");

module.exports.logInJobSeeker = (user) => {
  let url = `http://${host}:3000/login`;
  return axios.post(url, user);
};

module.exports.logInRecruiter = (user) => {
  let url = `http://${host}:3000/loginrec`;
  return axios.post(url, user);
};

module.exports.signUpJobSeeker = (user) => {
  let url = `http://${host}:3000/register`;
  return axios.post(url, user);
};

module.exports.signUpRecruiter = (user) => {
  let url = `http://${host}:3000/registerrec`;
  return axios.post(url, user);
};
