const { Article } = require("../model/article");
//文件上传功能模块
const formidable = require('formidable');
const path = require('path');
//处理文件上传预览
module.exports = async (req,res) => {
    //1创建表单解析对象
    const form = new formidable.IncomingForm();
    //2配置文件上传路径
    form.uploadDir = path.join(__dirname,'../','public','uploads');
    //3设置是否保留上传文件后缀（默认不保存）
    form.keepExtensions = true;
    //4解析表单
    // err:错误对象,
    // fields:对象类型保存表单提交的普通数据,
    // files:对象类型保存了上传的文件相关数据)
    await form.parse(req,async (err,fields,files)=>{
        if (files.cover.name===''){
            //假如用户未传封面就设置默认的文章路径
            files.cover.path = path.join(__dirname,'../','public','uploads','default.jpg');
        }
        if (!fields.publishDate){
            //假如用户未传时间设置默认的时间
            fields.publishDate = Date.now();
        }
        //加入用户没传类别设置默认类别
        if (!fields.category){
            fields.category = '学习';
        }
        await Article.create({
           title:fields.title,
           brief:fields.brief,
           content:fields.content,
           cover:files.cover.path.split("public")[1],
           category:fields.category,
           label:fields.label.split("，"),
           publishDate:fields.publishDate
        });
        res.redirect("/administration");
    })
}