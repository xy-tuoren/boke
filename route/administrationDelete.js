const { Article } = require("../model/article");
module.exports = async (req,res) => {
    var id = req.query.id;
    //删除相关文章
    await Article.findOneAndDelete({_id:id}).then(res.send());
}