const express = require('express');

module.exports=function(db){
  let router=express.Router();
  router.use('/',(req,res)=>{
    // res.render('user.ejs',{});
    if(!req.session['user_id'] && req.url!='/login'){
      //跳转login
      res.redirect('/login');
    }else{
      let sql=`SELECT * FROM user WHERE ID="${req.session.user_id}"`;
      db.query(sql,(err,data)=>{
        if(err){
          res.send('database error user ID');
        }else{
          console.log(data);
          res.render('user.ejs',{
            user:data[0]
          });
        }
      });

    }
  });
  return router;
};