 const express = require('express');

 const app = express();

//MIDDLEWARE
app.set('view engine', 'ejs');


//ROUTES
app.get('/', (req, res) => {
 res.render('home')
})



  //SEVER
  let PORT =  process.env.PORT || 5000
  app.listen(PORT, () => {
   console.log(`My Youtube App Server is runing on port ${PORT}`)
  })