
import axios from "axios";
import querystring from "querystring";

module.exports.signUp = (user) => {
  let url = "http://localhost:3000/register";
  return axios.post(url, querystring.stringify(user));
};
