
var secrets = require('../../secrets.js');
var mongoose = require('mongoose');

var User = require('../models/User.js'); // instance of mongoose.model
var Recruiter = require('../models/Recruiter.js'); // instance of mongoose.model


mongoose.Promise = global.Promise;

function filterUser(doc){
    doc["password"] = undefined;
}

module.exports = (router, isLoggedIn) => {

    router.get('/profile',
        isLoggedIn,
        function(req, res) {
            req.user["password"] = undefined;
            res.status(200).json({
                user: req.user,
                message: "Welcome!"
            });
        });

    router.get('/all',
        isLoggedIn,
        function(req, res) {
            let recruiter = req.user;

            // must be a recruiter
            if (!("savedUsers" in recruiter)) {
                return res.status(500).json({
                    message: "User must be a recruiter"
                })
            }

            // get all users and return content
            User.find({}, (err, result) => {
                return res.json({
                    applicants: result
                });
            });
        });
        
    router.put('/profile',
        isLoggedIn,
        function(req, res) {
            User.findOne({"_id":req.user["_id"]}, (err, doc) => {
                var data = req.body;
                for(var field in doc){
                    if (field != "password" && field != "_id"){
                        doc[field] = data[field] || doc[field];
                    }
                }

                doc.save((err, doc) => {
                     if(err){
                         console.log(err);
                         res.status(500).json({
                             message: "fucked up!" // lol
                         });
                     }else{
                         filterUser(doc);
                         res.status(200).json({
                             user: doc,
                             message: "User modified"
                         });
                     }
                 })
            });
        });

    return router;
};
