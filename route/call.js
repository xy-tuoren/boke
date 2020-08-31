//用于处理用户点击点赞
const { User } = require('../model/user');
module.exports = async (req,res)=>{
    const id = req.query.id;
    if (!req.session._id){
        //如果用户未登录
        return res.send('0');
    }
    const user = await User.findOne({_id:req.session._id});
    //判断是否包含此文章id
    if (user.Fabulous.includes(id)){
        return res.send('1');
    }else {
        user.Fabulous.push(id)
        await User.updateOne({_id:req.session._id},{Fabulous:user.Fabulous});
        return res.send('2');
    };
}