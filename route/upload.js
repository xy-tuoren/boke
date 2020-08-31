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
        //将客户端传递过来的文件地址响应回去
        res.send(files.filename.path);
    })
}