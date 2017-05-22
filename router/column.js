const express = require('express');

module.exports=function(db){
  let router=express.Router();
  router.get('/',(req,res)=>{
    res.render('column.ejs',{
      home:'',
      fllow:'',
      column:'active'
    });
  });

  return router;
};