//导入用户集合构造函数
const { User } = require('../model/user');
//导入bcrypt
const bcrypt = require('bcrypt');
module.exports = async (req,res)=>{
    //接收请求参数
    const {email,password} = req.body;
    //根据邮箱地址查询用户信息
    let user = await User.findOne({email:email});
    if(user){
        //将客户端传递过来的密码和用户信息中的密码进行比对
        //true 比对成功
        //flase 比对失败
        let isValid = await bcrypt.compare(password,user.password)
        if(isValid){
            //将用户id存储在session对象中
            req.session._id = user._id;
            //将用户名存储在session对象中
            req.session.username = user.username;
            //将用户邮箱存储在session对象中
            req.session.email = user.email;
            //将用户角色存储在session对象中
            req.session.role = user.role;
            //设置公共数据
            req.app.locals.userInfo = user;
            //对用户的角色进行判断
            if(user.role == "admin"){
                //重定向到管理员页面
                return res.send("2");
            }else {
                //重定向到文章页面
                return res.send("3");
            }
        }else{
            return res.send("1");
        }
    }else{
        return res.send("1");
    }
}