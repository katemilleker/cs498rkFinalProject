var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

Schema = mongoose.Schema;


var ResumeSchema = new Schema({
    user: Schema.Types.ObjectId,
    resumeFile: String
});


module.exports = mongoose.model('Resume', ResumeSchema);
