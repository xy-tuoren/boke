const { Comment } = require("../model/comment");
module.exports = async (req,res)=>{
    if (req.session._id){
        const { aid,content } = req.query;
        await Comment.create({aid:aid,uid:req.session._id,time:Date.now(),content:content});
        res.send('1');
    }else {
        res.send('0');
    }
}