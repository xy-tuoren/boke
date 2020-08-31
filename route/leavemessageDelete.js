//留言删除处理
const { Guestbook } = require("../model/guestbook");
module.exports = async (req,res) => {
    var id = req.query.id;
    //删除相关留言
    await Guestbook.findOneAndDelete({_id:id}).then(res.send());
}