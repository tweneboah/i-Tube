const express = require('express');
const router = express.Router();
const Video = require('../models/video');
const User = require('../models/User');
const Comment = require('../models/Comment');
const middleware = require('../middleware/index')

//Get the comment form form

router.get('/videos/:id/comments/new', (req,res) => {
  //We have to look for the id if this post and pass it to the template so that the post request will send this comment to the found post
  Video.findById(req.params.id, (err, foundVideo) => {
    if(err){
      console.log(err)
    }else {
      res.render('comments/createComment.ejs', {video: foundVideo})
    }
  })
 
});

//Comments Logic

router.post('/videos/:id/comments', (req, res) => {
  //Search for the video who's id is in the url
  Video.findById(req.params.id, (err, foundVideo) => {
    if(err){
      console.log(err)
    }else {
      //Create the comment
      //Get the values from the form
      const author = req.body.author;
      const text = req.body.text;

      const newComment = {
        author: author,
        text: text
      }

      Comment.create(newComment, (err, createdComment) => {
        
        if(err){
          console.log(err)
        }else {
          //Push this comment created also into 
          console.log(foundVideo)
          foundVideo.comments.push(createdComment);
          foundVideo.save();
          console.log(foundVideo)
          res.redirect(`/videos/${foundVideo._id}`)
        }
      })
    }
  })
})



module.exports = router;