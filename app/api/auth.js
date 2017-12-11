
import axios from "axios";
//import querystring from "querystring";

var host = "localhost";

module.exports.logInJobSeeker = (user) => {
  let url = "http://10.0.2.2:3000/login";
  return axios.post(url, user);
};

module.exports.logInRecruiter = (user) => {
  let url = "http://${host}:3000/loginrec";
  return axios.post(url, user);
};

module.exports.signUpJobSeeker = (user) => {
  console.log("IN SIGN UP JOB SEEKER");
  let url = "http://${host}:3000/register";
  return axios.post(url, user);
};

module.exports.signUpRecruiter = (user) => {
  console.log("IN SIGN UP RECRUITER");
  let url = "http://${host}:3000/registerrec";
  return axios.post(url, user);
};
