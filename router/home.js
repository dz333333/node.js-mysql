const express = require('express');
module.exports=function(db){
  let router=express.Router();
  router.get('/',(req,res,next)=>{
    //读banner数据
    let sql=`SELECT * FROM banner`;
    db.query(sql,(err,data)=>{
      if(err){
        res.send('database error banner table')
      }else{
        res.banners=data;
        next();
      }
    });
  });
  router.get('/',(req,res,next)=>{
    //读news数据
    let sql=`SELECT * FROM news`;
    db.query(sql,(err,data)=>{
      if(err){
        res.send('database error news table')
      }else{
        res.news=data;
        next()
      }
    });
  });
  router.get('/',(req,res)=>{
    res.render('index.ejs',{
      banners:res.banners,
      news:res.news,
      home:'active',
      fllow:'',
      column:''
    });
  });
  return router;
};