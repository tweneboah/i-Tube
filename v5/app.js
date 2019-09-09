require('locus')
  const express = require('express');
  const mongoose = require('mongoose');
  const Video = require('./models/video');
  const bodyParser = require('body-parser');
  
  const app = express();

  //MIDDLEWARE
  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({extended: true}));

  //DB CONNECTION
  const url =  'mongodb://localhost/my-YouTuBe'
  mongoose.connect( url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
  })
  .then(() => console.log("DB Connected successfully"));



  //ROUTES
  app.get('/', (req, res) => {
  res.render('home')
  })

  //===========
  //ADDING A YOUTUBE VIDEO LINK
  //===========

  //Get the form
  app.get('/videos/add', (req,res) => {
    res.render('addVideo');
  })

  //Add Vido Logic
  app.post('/videos', (req, res) => {
     
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
  app.get('/videos', (req, res) => {
    Video.find({}, (err, videos) => {
      if(err){
        console.log(err)
      }else{
       res.render('videos', {videos: videos});
      }
    })
  });


  //SEVER
  let PORT =  process.env.PORT || 3000
  app.listen(PORT, () => {
  console.log(`My Youtube App Server is runing on port ${PORT}`)
  })