const { User } = require("../model/user");
module.exports = async (req,res)=>{
    //查询用户邮箱是否存在
    let user = await User.findOne({email: req.body.email});
    //如果用户已经存在 邮箱地址被注册
    if(user){
        res.status(200).send("true");
    }else {
        res.status(200).send("false");
    }
}