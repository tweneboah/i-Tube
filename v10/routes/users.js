  const express = require('express');
  const router = express.Router();
  const User = require('../models/User');
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
           res.redirect('/videos')
         })
       }
     })
  })


  //LOGIN
  //1. Get login form
  router.get('/users/login/new', (req, res) => {
    res.render('users/login.ejs')
  })

  //LOGIN LOGIC
  router.post('/users/login',passport.authenticate('local', {
     successRedirect: '/videos',
     failureRedirect: '/users/register/new'
     }) ,(req, res) => {
    
  })

  //LOGOUT
  router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/')
  })



  module.exports = router