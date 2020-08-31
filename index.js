//导入express框架
const express = require("express");
//导入路径处理模块
const path = require("path");
//引入body-parser模块 用来处理post请求参数
const bodyparser = require('body-parser');
//导入session
const session = require("express-session");
//导入cookie
const  cookie = require("cookie-parser");
//导入模板引擎
const template = require("art-template");
//导入处理日期第三方模块
const dateFormat = require('dateformat');
//创建服务器
const app = express();
//连接数据库
require("./model/connect");

//向模板内部导入dateFormate变量
template.defaults.imports.dateFormat = dateFormat;

//开放静态资源文件
app.use(express.static(path.join(__dirname,'public')));

//配置cookie
app.use(cookie());
//配置session
app.use(session({
    secret: 'xy666',
    cookie:{maxAge:24*60*60*1000},//设置过期时间
    resave: false,
    saveUninitialized: true,
}));
//告诉express框架模板所在的位置
app.set('views',path.join(__dirname,'views'));
//告诉express框架模板的默认后缀是什么
app.set('view engine','html');
//当渲染后缀为html的模板时 所使用的模板引擎是什么
app.engine('html',require('express-art-template'));

//处理post请求参数
app.use(bodyparser.urlencoded({extended: false}));
//渲染登录页面
app.get("/login",require("./route/loginPage"));
//渲染文章页面
app.get("/article",require("./route/articlePage"));
//渲染个人信息页面
app.get("/personal",require("./route/personalPage"));
//处理退出登录
app.get("/loginout",require("./route/loginout"));
//渲染主页
app.get("/index",require("./route/indexPage"));
//渲染相册页面
app.get("/photos",require("./route/photosPage"));
//渲染留言页面
app.get("/leavemessage",require("./route/leavemessagePage"));
//渲染管理文章页面
app.get("/administration",require("./route/administrationPage"));
//处理管理文章页面中删除操作
app.get("/administrationDelete",require("./route/administrationDelete"));
//处理管理文章页面中编辑操作
app.get("/administrationEdit",require("./route/administrationEdit"));
//处理管理文章页面中添加操作
app.post("/administrationAdd",require("./route/administrationAdd"));
//处理留言添加
app.get("/leavemessageAdd",require("./route/leavemessageAdd"));
//处理留言删除
app.get("/leavemessageDelete",require("./route/leavemessageDelete"));
//处理用户修改
app.post("/personalupdate",require("./route/personalupdate"));
//处理用户登录
app.post("/login",require("./route/login"));
//处理用户注册
app.post("/register",require("./route/register"));
//用户注册邮箱路由处理
app.post("/email",require("./route/email"));
//文件上传预览接口
app.post("/upload",require("./route/upload"));
//处理用户点击对应文章
app.get("/article-value",require("./route/article-value"));
//处理用户在文章评论
app.get("/comment-add",require("./route/comment-add"));
//处理删除文章评论
app.get("/comment-del",require("./route/comment-del"));
//处理用户点击文章点赞
app.get("/call",require("./route/call"));
//监听端口
app.listen(80);
console.log("服务器启动成功");