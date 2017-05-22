//项目环境
const express=require('express');
const expressStatic=require('express-static');
const bodyParser=require('body-parser');
const multer=require('multer');
const cookiSession=require('cookie-session');
const cookieParser=require('cookie-parser');
const consolidate = require('consolidate');
const mysql=require('mysql');
//1.创建express服务
const server = express();
server.listen(8001);

//2. 静态页面托管
server.use(expressStatic('./www'));

//3. post请求设置
server.use(bodyParser.urlencoded({   //字符
  limit:1024*2,//2M
  extended:false//一般模式
}));
const multerObj = multer({dest:'./www/upload'});
server.use(multerObj.any());//允许任何文件

//3.5 cookie位置
server.use(cookieParser());

//4.session配置
let arr=[];
for(let i=0;i<100000;i++){
  arr.push('alex_key'+Math.random());
}
server.use(cookiSession({
  name:'app_id',
  keys:arr,
  maxAge:1000*60*20
}));

//5.模板引擎适配
server.set('view.engine','html'); //输出类型设置
server.set('views','./views');//设置引擎模板路径
server.engine('html',consolidate.ejs);//输出与引擎匹配

//打开一次数据库的链接池
let db=mysql.createPool({
  host:'localhost',
  user:'root',
  password:'root123',
  database:'2017-5-5'
});


server.use('/',require('./router/home')(db));
server.use('/article',require('./router/article')(db));
server.use('/fllow',require('./router/fllow')(db));
server.use('/column',require('./router/column')(db));
server.use('/user',require('./router/user')(db));
server.use('/login',require('./router/login')(db));
server.use('/reg',require('./router/reg')(db));
server.use('/logout',require('./router/logout')(db));

// server .use('/',(req,res)=>{
//   console.log(111)
// })













