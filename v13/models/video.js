const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
 title: String,
 url: String,
 comments: [
     {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Comment'
     }
 ]
});


module.exports = mongoose.model('Video', videoSchema);