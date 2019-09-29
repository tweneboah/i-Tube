const middlewareObj = {};

//Login
middlewareObj.isLogin = (req, res, next) => {
      if(req.isAuthenticated()){
          return next()
      }else {
          res.redirect('/users/login/new')
      }
};  




module.exports = middlewareObj;