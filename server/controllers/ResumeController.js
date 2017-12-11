var secrets = require('../../secrets.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var util = require('util');

var fs = require('fs');
var Gridfs = require('gridfs-stream');

var multiparty = require('multiparty');
var User = require('../models/User.js'); // instance of mongoose.model


mongoose.Promise = global.Promise;


function filterUser(doc){
    doc["password"] = undefined;
}



module.exports = (router, isLoggedIn, getType) => {

    // route for recruiter to view a jobseekser's resume
    router.get('/resume/:id/',
        isLoggedIn,
        function(req, res) {
            var db = mongoose.connection.db;
            var mongoDriver = mongoose.mongo;
            var gfs = new Gridfs(db, mongoDriver);

            var ws = fs.createWriteStream('temp.pdf');

            //read from mongodb
            var rs = gfs.createReadStream({
                 "_id": req.params.id
            });

            rs.pipe(ws);
            ws.on('close', function () {
                fs.readFile('temp.pdf', function (err,data){
                    res.contentType("application/pdf");
                    res.send(data);

                    fs.unlink("temp.pdf", function(err) {
                        if(err){
                            console.log(err);
                        }
                    });
                });

            });

        });

    // route for user to view their own resume.
    router.get('/upload/',
        isLoggedIn,
        function(req, res) {
            console.log("request Made");
            var db = mongoose.connection.db;
            var mongoDriver = mongoose.mongo;
            var gfs = new Gridfs(db, mongoDriver);

            var ws = fs.createWriteStream('temp.pdf');

            //read from mongodb
            console.log("reached")
            var rs = gfs.createReadStream({
                 "_id": req.user.resume
            });
            console.log("reach");

            rs.pipe(ws);
            ws.on('close', function () {
                fs.readFile('temp.pdf', function (err,data){
                    res.contentType("application/pdf");
                    res.send(data);

                    fs.unlink("temp.pdf", function(err) {
                        if(err){
                            console.log(err);
                        }
                    });
                });

            });

        });

    // https://medium.com/@patrickshaughnessy/front-to-back-file-uploads-using-gridfs-9ddc3fc43b5d
    // http://excellencenodejsblog.com/gridfs-using-mongoose-nodejs/
    router.post('/upload/',
        isLoggedIn,
        function(req, res) {
            if(getType(req.user) == "recruiter"){
                res.status(404).json({
                    message: "This feature is not available for recruiters"
                })
            }else{
                var form = new multiparty.Form();
                // parse the file, and then send it to mongodb
                form.parse(req, (err, fields, files) => {
                    var db = mongoose.connection.db;
                    var mongoDriver = mongoose.mongo;
                    var gfs = new Gridfs(db, mongoDriver);
                    var path = files.res[0].path;

                    gfs.remove({
                        filename: req.user["_id"] + ".pdf"
                    }, (err) =>{
                        if(err){
                            console.log(err);
                        }
                    })

                    var writestream = gfs.createWriteStream({
                        filename: req.user["_id"] + ".pdf",
                        mode: 'w'
                    });

                    fs.createReadStream(path).pipe(writestream);
                    writestream.on('close', (file) => {
                        User.findById(req.user["_id"], (err, user) => {
                            // handle error
                            user.resume = file._id;
                            user.save((err, updatedUser) => {
                                fs.unlink(path, function(err) {
                                    if(err){
                                        console.log(err);
                                    }
                                });
                                res.status(201).json({
                                    message: "Resume added"
                                });
                            });

                        });

                    });

                })
            }


        });
    return router;
};
