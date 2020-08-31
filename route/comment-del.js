//评论删除处理
const { Comment } = require("../model/comment");
module.exports = async (req,res) => {
    var id = req.query.id;
    //删除相关评论
    await Comment.findOneAndDelete({_id:id}).then(res.send());
}