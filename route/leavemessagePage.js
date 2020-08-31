const { Guestbook } = require('../model/guestbook');
//导入实现分页功能模块
const pagination = require('mongoose-sex-page');
module.exports = async (req,res)=> {
    //接收客户端传递过来的页码
    let page = req.query.page;
    if (page === undefined) {
        //查询文章数据
        //page 指定当前页
        //size 指定每页显示的数据条数
        //display 指定客户端要显示的页码数量
        //exec 向数据库中发送查询请求
        //populate查询关联的用户表
        let leavemessage = await pagination(Guestbook).find().sort({time:-1}).page(1).size(5).display(5).populate('uid').exec();
        res.render('leavemessage', {
            leavemessage: leavemessage,
            total:leavemessage.total-(leavemessage.page-1)*5
        });
    }else {
        let leavemessage = await pagination(Guestbook).find().sort({time:-1}).page(page).size(5).display(5).populate('uid').exec();
        res.render('leavemessage-list',{
            leavemessage:leavemessage,
            total:leavemessage.total-(leavemessage.page-1)*5
        });
    }
}