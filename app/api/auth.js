
import axios from "axios";
import querystring from "querystring";

module.exports.signUpJobSeeker = (user) => {
  let url = "http://localhost:3000/register";
  return axios.post(url, querystring.stringify(user));
};

module.exports.signUpRecruiter = (user) => {
  let url = "http://localhost:3000/registerrec";
  return axios.post(url, querystring.stringify(user));
};
