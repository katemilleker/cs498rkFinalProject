var secrets = require('../../secrets.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var util = require('util');

var fs = require('fs');
var Gridfs = require('gridfs-stream');

var multiparty = require('multiparty');
var User = require('../models/User.js'); // instance of mongoose.model


mongoose.Promise = global.Promise;


function filterUser(doc){
    doc["password"] = undefined;
}



module.exports = (router, isLoggedIn) => {

    // https://medium.com/@patrickshaughnessy/front-to-back-file-uploads-using-gridfs-9ddc3fc43b5d
    router.post('/upload/',
        isLoggedIn,
        function(req, res) {
            var form = new multiparty.Form();
            form.parse(req, function(err, fields, files) {

                console.log(util.inspect({fields: fields, files: files}));

                res.send("done");
            });

        });

    // var writestream = gfs.createWriteStream({
    //      filename: req.files.file.name,
    //      mode: 'w',
    //      content_type: req.files.file.mimetype,
    //      metadata: req.body
    // })
    // fs.createReadStream(req.files.file.path).pipe(writestream);
    // writestream.on('close', function(file) {
    //   User.findById(req.params.id, function(err, user) {
    //     // handle error
    //     user.file = file._id;
    //     user.save(function(err, updatedUser) {
    //       // handle error
    //       return res.json(200, updatedUser)
    //     })
    //   });
    //   fs.unlink(req.files.file.path, function(err) {
    //     // handle error
    //     console.log('success!')
    //   });
    // });

    //router.delete('/savedResumes')

    return router;
};
