const express = require('express');

module.exports=function(db){
  let router=express.Router();
  router.get('/',(req,res)=>{
    res.render('reg.ejs',{});
  });
  router.get('/submit',(req,res)=>{
    //req.query.user,req.query.pass
    let sql=`SELECT * FROM user WHERE username="${req.query.user}"`;
    db.query(sql,(err,data)=>{
      if(err){
        res.send('database error reg')
      }else{
        if(data.length==0){
          //可以注册
          let sql=`INSERT INTO user(ID,username,password,icon) VALUES(0,"${req.query.user}","${req.query.pass}","")`;
          db.query(sql,(err,data)=>{
            if(err){
              res.send('database error reg INSERT');
            }else{
              res.redirect('/login');
            }
          });
        }else{
          res.send('用户名已存在');
        }
      }
    });
  });

  return router;
};