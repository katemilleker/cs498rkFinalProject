var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

Schema = mongoose.Schema;


var UserSchema = new Schema({
    name: {type: String, required : true},
    email: {type: String, unique: true, required : true, dropDups: true},
    password: {type: String, required: true},
    major: {type: String},
    details: {type: String},
    resume: {type: Schema.Types.ObjectId}
});



UserSchema.methods.generateHash = function(password) {
    return password;
    //return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return  this.password == password;
    //return bcrypt.compareSync(password, this.password);
};



module.exports = mongoose.model('User', UserSchema);
