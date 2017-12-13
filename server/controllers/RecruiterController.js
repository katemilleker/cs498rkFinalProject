var secrets = require('../../secrets.js');
var mongoose = require('mongoose');

var User = require('../models/User.js'); // instance of mongoose.model
var Recruiter = require('../models/Recruiter.js'); // instance of mongoose.model


mongoose.Promise = global.Promise;

function filterUser(doc){
    doc["password"] = undefined;
}



module.exports = (router, isLoggedIn, getType) => {


    router.post('/save',
        isLoggedIn,
        function(req, res){
          Recruiter.findOne({"_id":req.user["_id"]}, (err, doc) => {

              var status = req.body.status;
              var userId = req.body.user_id;

              if(status != "rejected" && status != "accepted"){
                  status = "saved";
              }
              var flag = false;
              for (var i = 0; i < doc.savedUsers.length; i++){
                  if (doc.savedUsers[i].user_id == userId){
                      flag = true;
                      doc.savedUsers[i].status = status;
                      break;
                  }
              }
              if (!flag){
                  doc.savedUsers.push({
                    user_id: userId,
                    status: status
                  })
              }

              doc.save((err, doc) => {
                   if(err){
                       console.log(err);
                       res.status(500).json({
                           message: "failure"
                       });
                   }else{
                       filterUser(doc);
                       res.status(201).json({
                           message: "User added to list"
                       });
                   }
               })
          });
        });

    router.get('/user/:id',
        isLoggedIn,
        function(req, res) {
            User.findOne({"_id": req.params.id}, (err, doc) => {
                doc.password = undefined;
                res.status(200).json({
                    user: doc
                })
            })

        });

    router.delete('/user/:id',
        isLoggedIn,
        function(req, res) {
            Recruiter.findOne({"_id":req.user["_id"]}, (err, doc) => {
              var resumes = doc.savedUsers;
              var data = []
              for (var i = 0; i < doc.savedUsers.length; i++){
                  if(doc.savedUsers[i].user_id != req.params.id){
                      data.push({
                          user_id: doc.savedUsers[i].user_id,
                          status: doc.savedUsers[i].status
                      });
                  }
              }
              doc.savedUsers = data;
              doc.save((err, doc) => {
                   if(err){
                       console.log(err);
                       res.status(500).json({
                           message: "failure"
                       });
                   }else{
                       filterUser(doc);
                       res.status(201).json({
                           message: "User removed from list"
                       });
                   }
               })

            })

        });

    router.get('/savedResumes',
        isLoggedIn,
        function(req, res) {
            Recruiter.findOne({"_id":req.user["_id"]}, (err, doc) => {
                var resumes = doc.savedUsers;
                var data = []
                for (var i = 0; i < doc.savedUsers.length; i++){
                    if(doc.savedUsers[i].status == "saved"){
                        data.push(doc.savedUsers[i].user_id);
                    }
                }
                res.status(200).json({
                    data: data
                })
            });
        });

    router.get('/acceptedResumes',
        isLoggedIn,
        function(req, res) {
            Recruiter.findOne({"_id":req.user["_id"]}, (err, doc) => {
                var resumes = doc.savedUsers;
                var data = []
                for (var i = 0; i < doc.savedUsers.length; i++){
                    if(doc.savedUsers[i].status == "accepted"){
                        data.push(doc.savedUsers[i].user_id);
                    }
                }
                res.status(200).json({
                    data: data
                })
            });
        });

    router.get('/rejectedResumes',
        isLoggedIn,
        function(req, res) {
            Recruiter.findOne({"_id":req.user["_id"]}, (err, doc) => {
                var resumes = doc.savedUsers;
                var data = []
                for (var i = 0; i < doc.savedUsers.length; i++){
                    if(doc.savedUsers[i].status == "rejected"){
                        data.push(doc.savedUsers[i].user_id);
                    }
                }
                res.status(200).json({
                    data: data
                })
            });
        });

    //router.delete('/savedResumes')

    return router;
};
