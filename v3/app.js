 const express = require('express');
const mongoose = require('mongoose');
 const app = express();

//MIDDLEWARE
app.set('view engine', 'ejs');


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
app.get('/videos', (req,res) => {
   res.render('addVideo');
})

//SEVER
let PORT =  process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`My Youtube App Server is runing on port ${PORT}`)
})