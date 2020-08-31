const { User } = require('../model/user');
module.exports = async (req,res)=>{
        //判断是否登录
        let user = await User.findOne({email:req.session.email});
        res.render('personal',{
                user:user,
        });
}