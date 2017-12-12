
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
