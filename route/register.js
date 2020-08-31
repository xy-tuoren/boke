//实现注册功能

//导入用户集合构造对象
const { User,validateUser } = require('../model/user');
//密码加密模块
const bcrypt = require('bcrypt');
module.exports = async (req,res)=>{
    try{
        await validateUser(req.body);
    }catch (e) {
        //验证没有通过
        return res.send("<script>alert(`${e.message}`)</script>");
    }
    //查询用户邮箱是否存在
    let user = await User.findOne({email: req.body.email});
    //如果用户已经存在 邮箱地址被注册
    if(user){
        return res.send("<script>alert('邮箱地址被占用')</script>");
    }
    //对密码进行加密处理
    //生成随机字符串
    const salt = await bcrypt.genSalt(10);
    //加密
    const  password = await bcrypt.hash(req.body.password,salt);
    //替换密码
    req.body.password = password;
    //将用户名存储在session对象中
    req.session.username = req.body.username;
    //将用户邮箱存储在session对象中
    req.session.email = req.body.email;
    //将用户角色存储在session对象中
    req.session.role = req.body.role;
    //将用户信息添加到数据库
    var use = await User.create(req.body);
    //设置公共数据
    req.app.locals.userInfo = use;
    //将用户id存储在session对象中
    req.session._id = use._id;
    return res.redirect('/article');
}