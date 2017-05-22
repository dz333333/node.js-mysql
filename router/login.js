const express = require('express');

module.exports=function(db){
  let router=express.Router();
  router.get('/',(req,res)=>{
    res.render('login.ejs',{});
  });
  router.post('/',(req,res)=>{
    //console.log('收到了',req.body.user,req.body.pass);
    let sql=`SELECT * FROM user WHERE username="${req.body.user}"`;
    db.query(sql,(err,data)=>{
      if(err){
        res.send('database error login');
      }else{
        console.log(data);
        if(data.length==0){
          res.send('用户名不存在');
        }else{
          if(data[0].password==req.body.pass){
            req.session.user_id=data[0].ID;//登录成功，要给session写数据
            res.redirect('/user');
          }else{
            res.send('用户名或者密码有误');
          }
        }
      }
    });
  });

  return router;
};