//导入文章集合
const { Article } = require("../model/article");
//导入评论集合
const { Comment } = require("../model/comment");
//导入实现分页功能模块
const pagination = require('mongoose-sex-page');
module.exports = async (req,res)=>{
    const id = req.query.id;
    const page = req.query.page;
    //根据id参数查询文章详细信息
    let article = await Article.findOne({_id:id}).populate('author');
    //接收客户端传递过来的页码
    if (page === undefined) {
        //查询文章数据
        //page 指定当前页
        //size 指定每页显示的数据条数
        //display 指定客户端要显示的页码数量
        //exec 向数据库中发送查询请求
        //populate查询关联的用户表
        //查询当前文章所对应的评论信息
        let comment = await pagination(Comment).find({aid:id}).sort({time:-1}).page(1).size(5).display(5).populate('uid').exec();
        res.render('article-value', {
            article:article,
            comment: comment,
            total:comment.total-(comment.page-1)*5
        });
    }else {
        let comment = await pagination(Comment).find({aid:id}).sort({time:-1}).page(page).size(5).display(5).populate('uid').exec();
        res.render('article-value-list',{
            article:article,
            comment:comment,
            total:comment.total-(comment.page-1)*5
        });
    }
}