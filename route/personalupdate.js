//文件上传功能模块
const formidable = require('formidable');
const path = require('path');
const { User } = require('../model/user');
//导入bcrypt
const bcrypt = require('bcrypt');
module.exports = async (req,res)=>{
    //1创建表单解析对象
    const form = new formidable.IncomingForm();
    //2配置文件上传路径
    form.uploadDir = path.join(__dirname,'../','public','uploads');
    //3设置是否保留上传文件后缀（默认不保存）
    form.keepExtensions = true;
    //4解析表单
    // err:错误对象,
    // fields:对象类型保存表单提交的普通数据,
    // files:对象类型保存了上传的文件相关数据)
    await form.parse(req,async (err,fields,files)=>{
        let user = await User.findOne({_id:fields._id});
        if (files.portrait.name===''){
            //假如用户未传头像就使用原来头像路径
            files.portrait.path = path.join(__dirname,'../','public',user.portrait);
        }
        //对密码进行加密处理
        //生成随机字符串
        const salt = await bcrypt.genSalt(10);
        //加密
        const password = await bcrypt.hash(fields.password,salt);
        //替换密码
        fields.password = password;
        await User.updateOne({_id:fields._id},{
            username:fields.username,
            email:fields.email,
            password:fields.password,
            portrait:files.portrait.path.split("public")[1]
        }).then().catch(res.redirect('/personal'));
        //更新session
        req.session.email = fields.email;
        //更新公共数据
        req.app.locals.userInfo.portrait = files.portrait.path.split("public")[1];
        req.app.locals.userInfo.username = fields.username;
        res.redirect('/personal');
    })
}