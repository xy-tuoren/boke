//创建用户集合
//导入mongoose模块
const mongoose = require("mongoose");
//导入bcrypt加密模块
const bcrypt = require('bcrypt');
//引入joi表单验证模块
const joi = require('joi');
//定义用户集合规则
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[true,'请输入用户名']
    },
    email:{
        type: String,
        //保证邮箱地址再插入数据库时不重复
        unique: true,//唯一性
        required: true//必要性
    },
    password: {
        type: String,
        required:true
    },
    //用户状态：admin:管理员
    role: {
        type:String,
        required:true
    },
    portrait: {//用户头像
        type:String,
        default:"/uploads/3.jpg"
    },
    Fabulous:{//用于判断此用户给哪篇文章点过赞
        type:[String]
    }
});
//创建集合
const User = mongoose.model('User',userSchema);
async function createUser() {
    //生成随机字符串
    //genSalt方法接收一个数值作为参数
    //数值越大 生成的随机字符串复杂度越高
    //数值越小 生成的随机字符串复杂度越低
    //默认值是 10
    //返回随机生成的字符串
    const salt = await bcrypt.genSalt(12);
    //对密码进行加密  参数1.要加密的明文  2.随机字符串
    //返回值是加密后的密码
    const pass = await bcrypt.hash('20001108',salt);
    const user = User.create({
        username: 'admin',
        email: '2895@qq.com',
        password: pass,
        role: 'admin',
    });
}
//验证用户信息
const validateUser = user => {
    //定义对象验证规则
    const schema = {
        username:joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
        email:joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password:joi.string().regex(/^[a-zA-Z0-9]\w{5,17}$/).required().error(new Error('密码格式不符合要求')),
        role:joi.string().valid('normal','admin').required().error(new Error('角色名非法')),
    };
    //实施验证
    return joi.validate(user,schema);
}
//初始化一位用户
// createUser();
module.exports = {
    User:User,
    validateUser
}
