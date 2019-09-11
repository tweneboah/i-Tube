
  const express = require('express');
  const mongoose = require('mongoose');
  const Video = require('./models/video');
  const User = require('./models/User');
  const bodyParser = require('body-parser');
  const passport = require('passport');
  const LocalStrategy = require('passport-local');
  const app = express();
  

  //SERVING STATIC FILES
  app.use(express.static(__dirname + '/public'))


  //MIDDLEWARE
  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({extended: true}));


  //CUSTOM MIDDLEWARE
  const authUser = (req, res, next ) => {
    if(req.user){
      return next()
    }else {
      console.log('You are not authorised')
      res.redirect('/users/login/new')
    }
  }



  //DB CONNECTION
  const url = process.env.DATABASE_URL || 'mongodb://localhost/my-YouTuBe'
  mongoose.connect( url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
  })
  .then(() => console.log("DB Connected successfully"));


  //PASSPORT CONFIBURATION
  app.use(require('express-session')({
    secret: 'MysecreteAppv2!!',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use( new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser())


  //ROUTES
  app.get('/', (req, res) => {
  res.render('home')
  })


  //USER RGISTRATION

  //1.Get the registration form
  app.get('/users/register/new', (req, res) => {
    res.render('users/register')
  });

  //2.Registration Logic
  app.post('/users/register', (req, res) => {
      //Input from fthe form
      const newUser = {
        username: req.body.username,
      }

      User.register(newUser, req.body.password, (err, user) => {
        if(err){
          console.log(err)
        }else {
          passport.authenticate('local')(req, res, () => {
            res.redirect('/videos')
          })
        }
      })
  })


 //LOGIN
 //1. Get login form
 app.get('/users/login/new', (req, res) => {
     res.render('users/login.ejs')
 })

 //LOGIN LOGIC
 app.post('/users/login',passport.authenticate('local', {
      successRedirect: '/videos',
      failureRedirect: '/users/register/new'
      }) ,(req, res) => {
     
 })

//LOGOUT
app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/')
})


  //===========
  //ADDING A YOUTUBE VIDEO LINK
  //===========

  //Get the form
  app.get('/videos/add', authUser, (req,res) => {
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
    console.log('Login User', req.user)
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