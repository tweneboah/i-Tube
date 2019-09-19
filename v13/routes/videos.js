  const express = require('express');
  const router = express.Router();
  const Video = require('../models/video');
  const User = require('../models/User');
  const middleware = require('../middleware/index')
  //===========
  //ADDING A YOUTUBE VIDEO LINK
  //===========

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
        User.findOne({username: 'Tweneboah'}, (err, foundUser) => {
          if(err){
            console.log(err)
          }else{
            //Push this post to the user
            foundUser.videos.push(createdVideo);
            //Save the video
            foundUser.save((err, userWithPost) => {
              if(err){
                console.log(err)
              }else {
                res.redirect('/videos')
              }
            })
          }
        })
      }
    })
  })



  //FETCH ALL VIDEOS
  router.get('/videos', (req, res) => {
    Video.find({}, (err, videos) => {
      if(err){
        console.log(err)
      }else{
       res.render('videos/videos.ejs', {videos: videos});
      }
    })
  });


  
  //FETCH A SINGLE VIDEO
// router.get('/videos/:id', (req, res) => {
//   Video.findById(req.params.id, (err, foundVideo) => {
//      if(err){
//        console.log(err)
//      }else {
//        console.log(foundVideo)
//        res.render('videos/showMore.ejs', {video: foundVideo})
//      }
//   })
// })


  //FETCH A SINGLE VIDEO AND POPULATE IT'S COMMENTS
  router.get('/videos/:id', (req, res) => {
    Video.findById(req.params.id).populate('comments').exec((err, videoWithComments) => {
      if(err){
        console.log(err);
      }else {
        res.render('videos/showMore.ejs', {video: videoWithComments})
      }
    })
  })
  

module.exports = router;