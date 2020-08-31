const { Article } = require("../model/article");
//导入实现分页功能模块
const pagination = require('mongoose-sex-page');
module.exports = async (req,res) => {
    //接收客户端传递过来的页码
    var page = req.query.page;
    //接收客户端传递过来的类别
    var category = req.query.category;
    //将查询出来的所有类别放到数组
    const article = await Article.find();
    //创建一个放类别的空数组将所有类别放到里面
    const ctg = new Array();
    for (let art of article){
        if (!ctg.includes(art.category)){
            ctg.push(art.category);
        };
    }
    if (page===undefined){
        //查询文章数据
        //page 指定当前页
        //size 指定每页显示的数据条数
        //display 指定客户端要显示的页码数量
        //exec 向数据库中发送查询请求
        //populate查询关联的用户表
        let article = await pagination(Article).find().sort({publishDate:-1}).page(1).size(15).display(5).populate('author').exec();
        res.render('administration',{
            article:article,
            ctg:ctg
        });
    }else {
        if (category==="全部"){
            let article = await pagination(Article).find().sort({publishDate:-1}).page(page).size(15).display(5).populate('author').exec();
            res.render('administration-list',{
                article:article,
                category:category,
                ctg:ctg
            });
        }else {
            let article = await pagination(Article).find({category:category}).sort({publishDate:-1}).page(page).size(15).display(5).populate('author').exec();
            res.render('administration-list',{
                article:article,
                category:category,
                ctg:ctg
            });
        }
    }
}