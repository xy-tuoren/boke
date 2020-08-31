//导入留言集合构造对象
const { Guestbook } = require('../model/guestbook');
module.exports = async (req,res)=>{
    if (req.session.email){
        //将评论信息添加到数据库
        await Guestbook.create({uid:req.session._id,time:Date.now(),content:req.query.value});
        res.send("ture");
    }else {
        res.send("false");
    }
}