const express = require('express');

module.exports=function(db){
  let router=express.Router();
  router.get('/',(req,res)=>{
    res.render('fllow.ejs',{
      home:'',
      fllow:'active',
      column:''
    });
  });

  return router;
};