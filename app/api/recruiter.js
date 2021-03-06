
import axios from "axios";

var host = require("../host.js");

module.exports.getRecruiter = (callback) => {
  let url = `http://${host}:3000/profile`;
  axios.get(url).then(response => {
    callback(response.data.user);
  }).catch(error => {
    console.log("There was an error getting the recruiter:", error);
  });
};

module.exports.getSavedUsers = (callback) => {
  let url = `http://${host}:3000/savedResumes`;
  axios.get(url).then(response => {
    if (callback) {
      callback(response.data.data);
    }
  }).catch(error => {
    console.log("There was an issue getting the saved users", error);
  });
};

module.exports.saveUser = (user, status, callback) => {
  let url = `http://${host}:3000/save`;

  let body = {
    user_id: user._id
  };

  if (status) {
    body.status = status;
  }

  axios.post(url, body).then(result => {
    if (callback && typeof callback === "function") {
      callback();
    }
  }).catch(error => {
    console.log("There was an error saving the user:", error);
  });
};



module.exports.getUsersFullData = (status, callback) => {
  console.log(`http://${host}:3000/`+status+`ResumesFull`);
  let url = `http://${host}:3000/`+status+`ResumesFull`;
  axios.get(url).then(response => {
    if (callback) {
      console.log(response.data.data);
      callback(response.data.data);
    }
  }).catch(error => {
    console.log("There was an issue getting the saved users", error);
  });
};

module.exports.deleteUser = (id, callback) => {
  let url = `http://${host}:3000/user/`+id;
  axios.delete(url).then(response => {
    if (callback) {
      callback(response.data);
    }
  }).catch(error => {
    console.log("There was an issue deleting users", error);
  });
}
