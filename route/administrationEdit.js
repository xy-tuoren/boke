const { Article } = require("../model/article");
module.exports = async (req,res) => {
    const id = req.query.id;
    if (!req.query.publishDate){
        req.query.publishDate = Date.now();
    }
    await Article.updateOne({_id:id},req.query).then(res.send());
}