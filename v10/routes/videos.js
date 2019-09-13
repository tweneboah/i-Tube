  const express = require('express');
  const router = express.Router();
  const Video = require('../models/video');


  //CUSTOM MIDDLEWARE
  const authUser = (req, res, next ) => {
    if(req.user){
      return next()
    }else {
      console.log('You are not authorised')
      res.redirect('/users/login/new')
    }
  }

  //===========
  //ADDING A YOUTUBE VIDEO LINK
  //===========

  //Get the form
  router.get('/videos/add', authUser, (req,res) => {
    res.render('addVideo');
  })

  //Add Vido Logic
  router.post('/videos', (req, res) => {
    
    //Get values from the form 
    let title = req.body.title;
    let url = req.body.url;
    let paresedURL = new URL(req.body.url);
    let extractingCodeFromYoutubeUrl = paresedURL.searchParams.get('v')
    url = extractingCodeFromYoutubeUrl
  
    Video.create({title:title, url:url}, (err, video) => {
     
      if(err){
        res.send(err)
      }else{
         res.redirect('/videos')
      }
    })
  })


  //FETCH VIDEOS
  router.get('/videos', (req, res) => {
    console.log('Login User', req.user)
    Video.find({}, (err, videos) => {
      if(err){
        console.log(err)
      }else{
       res.render('videos', {videos: videos});
      }
    })
  });


module.exports = router;