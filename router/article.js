const express = require('express');

module.exports=function(db){
  let router=express.Router();

  router.get('/',(req,res)=>{
    //console.log(req.query);
    let sql=`SELECT * FROM news WHERE ID=${req.query.id}`;
    db.query(sql,(err,data)=>{
      if(err){
        res.send('database error article');
      }else{
        console.log(data);//array
        res.render('article.ejs',{article:data[0]});
      }
    });
  });

  return router;
};