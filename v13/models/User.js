const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
//Passport will automatically username and password field

 videos: [
     {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Video'
     }
 ]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);