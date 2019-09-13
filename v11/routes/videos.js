  const express = require('express');
  const router = express.Router();
  const Video = require('../models/video');
  const middleware = require('../middleware/index')
  //===========
  //ADDING A YOUTUBE VIDEO LINK
  //===========

  //Get the form
  router.get('/videos/add', middleware.isLogin, (req,res) => {
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
    Video.find({}, (err, videos) => {
      if(err){
        console.log(err)
      }else{
       res.render('videos', {videos: videos});
      }
    })
  });


  router.get('/videos/all', (req, res) => {
    Video.find({}, (err, videos) => {
      if(err){
        console.log(err)
      }else{
        let data = {
          auth: res.locals.auth, 
          videos: videos
        }
        res.json(data)
        
    
      }
    })
  })

module.exports = router;