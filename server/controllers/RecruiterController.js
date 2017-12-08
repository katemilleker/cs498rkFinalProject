var secrets = require('../../secrets.js');
var mongoose = require('mongoose');

var User = require('../models/User.js'); // instance of mongoose.model
var Recruiter = require('../models/Recruiter.js'); // instance of mongoose.model


mongoose.Promise = global.Promise;

function filterUser(doc){
    doc["password"] = undefined;
}



module.exports = (router, isLoggedIn) => {


    router.get('/savedResumes',
        isLoggedIn,
        function(req, res) {
            Recruiter.findOne({"_id":req.user["_id"]}, (err, doc) => {
                var resumes = doc.resumes;
                var data = []
                for (var pair in resumes){
                    if(pair.status = "saved"){
                        data.push(pair.res_id);
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
                var resumes = doc.resumes;
                var data = []
                for (var pair in resumes){
                    if(pair.status = "accepted"){
                        data.push(pair)
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
                var resumes = doc.resumes;
                var data = []
                for (var pair in resumes){
                    if(pair.status = "rejected"){
                        data.push(pair)
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
