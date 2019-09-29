  const express = require('express');
  const router = express.Router();
  const Video = require('../models/video');
  const User = require('../models/User');
  const middleware = require('../middleware/index')


  //ADDING A YOUTUBE VIDEO LINK
 
  //Get the form
  router.get('/videos/add', middleware.isLogin, (req,res) => {
    res.render('videos/addVideo');
  })


  router.post('/videos', (req, res) => {
    //Get values from the form 
    let title = req.body.title;
    let url = req.body.url;
    let paresedURL = new URL(req.body.url);
    let extractingCodeFromYoutubeUrl = paresedURL.searchParams.get('v')
    url = extractingCodeFromYoutubeUrl
    const newVideo = {
      title: title,
      url: url
    };
    Video.create(newVideo, (err, createdVideo) => {
      if(err){
        console.log(err)
      }else {
        //Attach the user to this post
        //Remember that the current created post has a user property on their model so we can push the current logged in user to that post 
        createdVideo.author.id = req.user._id;
        createdVideo.author.username = req.user.username;

        //Save the post again

        createdVideo.save((err, savedVideoWithUser) => {
          if(err){
            console.log(err)
          }else {
            res.redirect(`/users/profile/${req.user.id}`)
          }
        })
      }
    })
  })


  //FETCH A SINGLE VIDEO AND POPULATE IT'S COMMENTS
  router.get('/videos/:id', (req, res) => {
    Video.findById(req.params.id).populate('comments').exec((err, videoWithComments) => {

      if(err){
        console.log(err);
      }else {
      
        res.render('videos/showMore.ejs', {video: videoWithComments})
      }
    })
  });


  //DELETE VIDEO

  router.delete('/videos/:id', (req, res) => {
    Video.findByIdAndRemove(req.params.id, (err, video) => {
      if(err){
        console.log(err)
      }else {
        res.redirect(`/users/profile/${req.user.id}`)
      }
    })
  })
  

module.exports = router;