const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
 title: String,
 url: String,

 comments: [
     {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Comment'
     }
 ],
 //This means that every video will have a user who created it so we can fetch videos for individual users
 author: {
     id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
     },
     username: String
 }
});

module.exports = mongoose.model('Video', videoSchema);