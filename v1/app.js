 const express = require('express');
 const app = express();





 //SEVER
let PORT =  process.env.PORT || 5000
 app.listen(PORT, () => {
  console.log(`My Youtube App Server is runing on port ${PORT}`)
 })