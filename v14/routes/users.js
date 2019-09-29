  const express = require('express');
  const router = express.Router();
  const User = require('../models/User');
  const Video  = require('../models/video');
  const middleware = require('../middleware/index');
  const passport = require('passport');

  //ROUTES

  //1.Get registartion form
  router.get('/users/register/new', (req, res) => {
     res.render('users/register')
  })


  //2.Registration Logic
    router.post('/users/register', (req, res) => {
     //Input from fthe form
     const newUser = {
       username: req.body.username,
     }

     User.register(newUser, req.body.password, (err, user) => {
       if(err){
         console.log(err)
       }else {
         passport.authenticate('local')(req, res, () => {
           res.redirect('/users/login/new')
         })
       }
     })
  });


  //LOGIN

  //1. Get login form
  router.get('/users/login/new', (req, res) => {
    res.render('users/login.ejs')
  })


  //LOGIN LOGIC
  router.post('/users/login',passport.authenticate('local', {
     successRedirect: `/users/profile`,
     failureRedirect: '/users/register/new'
     }) ,(req, res) => {
    
  })


  //LOGOUT
  router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/')
  })


router.get('/users/profile', middleware.isLogin, (req, res) => {
   res.render('users/welcome')
})

  //PROFILE
  router.get('/users/profile/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
      if(err){
        console.log(err)
      }else {
      Video.find().where('author.id').equals(foundUser._id).exec((err,  userWithVideo) => {
        if(err){
          console.log(err)
        }else {
         res.render('users/profile.ejs', {user: foundUser, videos: userWithVideo})
         console.log('Vidoes of the user', userWithVideo )
        }
      })
      }
    })
  });

  //DELETE MY PROFILE
  router.delete('/users/:id', middleware.isLogin, (req, res) => {
     User.findByIdAndRemove(req.params.id, (err, user) => {
       if(err){
         console.log(err)
       }else {
         res.redirect('/')
       }
     })
  })

  module.exports = router