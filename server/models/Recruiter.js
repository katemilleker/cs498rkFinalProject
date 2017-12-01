var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var RecruiterSchema = new mongoose.Schema({
    name: {type: String, required : true},
    email: {type: String, unique: true, required : true, dropDups: true},
    password: {type: String, required: true},
});



RecruiterSchema.methods.generateHash = function(password) {
    return password;
    //return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

RecruiterSchema.methods.validPassword = function(password) {
    return  this.password == password;
    //return bcrypt.compareSync(password, this.password);
};



module.exports = mongoose.model('Recruiter', RecruiterSchema);
