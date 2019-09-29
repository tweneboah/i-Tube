
  const express = require('express');
  const methodOverride = require('method-override');
  const mongoose = require('mongoose');
  const flash = require('connect-flash');
  const User = require('./models/User');
  const bodyParser = require('body-parser');
  const passport = require('passport');
  const LocalStrategy = require('passport-local');
  const usersRoute = require('./routes/users');
  const videosRoute = require('./routes/videos');
  const commentsRoute = require('./routes/comment');
  const app = express();
  

  //MIDDLEWARE
  app.use(require('express-session')({
    secret: 'MysecreteAppv2!!',
    resave: false,
    saveUninitialized: false
  }));

    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(flash());
    app.use(methodOverride('_method'));
    
  
  //SERVING STATIC FILES
  app.use(express.static(__dirname + '/public'))

  //DB CONNECTION
  const url = process.env.DATABASE_URL || 'mongodb://localhost/my-YouTuBe'
  mongoose.connect( url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
  })
  .then(() => console.log("DB Connected successfully"));


  //PASSPORT CONFIBURATION

  app.use(passport.initialize());
  app.use(passport.session());
  passport.use( new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser())

  //PASSING THE LOGIN USER ACCROSS THE ROUTES
  app.use((req, res, next) => {
    res.locals.currentUser = req.user, //This help us to pass a response to browsers/client so this is available to the template it passed on
    res.locals.error = req.flash('error')
    next()
  });
  
  //ROUTES
  app.use('/', videosRoute);
  app.use('/', usersRoute);
  app.use('/', commentsRoute);

  app.get('/', (req, res) => {
    res.render('home')
  })



  //SEVER
  let PORT =  process.env.PORT || 3000
  app.listen(PORT, () => {
  console.log(`My Youtube App Server is runing on port ${PORT}`)
  })