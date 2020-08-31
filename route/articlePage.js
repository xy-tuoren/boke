const { Article } = require("../model/article");
//导入实现分页功能模块
const pagination = require('mongoose-sex-page');
const { Comment } = require('../model/comment');
module.exports =  async (req,res) => {
    //接收客户端传递过来的页码
    const page = req.query.page;
    //如果val数据就保存客户端传递过来的搜索关键字
    req.session.search = req.query.val;
    //假如没有输入关键字
    if (!req.session.search){
        req.session.search = ' *';
    }
    //如果是clsval数据就保存客户端传递过来的分类关键字
    req.session.class = req.query.clsval;
    //假如没有输入关键字
    if (!req.session.class){
        req.session.class = ' *';
    }
    //根据用户输入的搜索关键字定义正则表达式
    const rex = new RegExp(req.session.search);
    //根据用户输入的类关键字定义正则表达式
    const cls = new RegExp(req.session.class);
    //先查询出所有文章
    let article = await Article.find();
    //创建一个放类别的空数组将所有类别放到里面
    const ctg = new Array();
    //创建一个放标签的空数组将所有标签放到里面
    const lab = new Array();
    for (let art of article){
        //不包含就追加
        if (!ctg.includes(art.category)){
            ctg.push(art.category);
        };
        for (let brt of art.label) {
            if (brt){
                if (!lab.includes(brt)){
                    lab.push(brt);
                };
            }
        }
    }
    if (page===undefined){
        //查询文章数据
        //page 指定当前页
        //size 指定每页显示的数据条数
        //display 指定客户端要显示的页码数量
        //exec 向数据库中发送查询请求
        //populate查询关联的用户表
        let article = await pagination(Article).find({"title": rex,"category":cls}).sort({publishDate:-1}).page(1).size(3).display(5).populate('author').exec();
        let comt = [];
        for (let id of article.records){
            let leg = await Comment.find({aid:id._id});
            comt.push(leg.length);
        }
        res.render('article',{
                article,
                ctg,
                lab,
                comt
            });
    }else {
        let article = await pagination(Article).find({"title": rex,"category":cls}).sort({publishDate:-1}).page(page).size(3).display(5).populate('author').exec();
        let comt = [];
        for (let id of article.records){
            let leg = await Comment.find({aid:id._id});
            comt.push(leg.length);
        }
        //如果没有查到相关文章
        if (article.total===0){
            res.render('article-none');
        }else {
            res.render('article-list',{
                article,
                comt
            });
        }
    }
}