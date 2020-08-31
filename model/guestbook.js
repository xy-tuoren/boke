const mongoose = require('mongoose');
//创建留言集合规则
const guestbookSchema = new mongoose.Schema({
    //留言人用户id
    uid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //留言时间
    time: {
        type:Date,
        default:Date.now()
    },
    //留言内容
    content: {
        type:String
    }
});
const Guestbook = mongoose.model('Guestbook',guestbookSchema);
//生成一个评论
// Guestbook.create({
//    uid:"5f1441cc8774a42924738fc6",
//    content: "站长最帅"
// });
//将留言集合构造函数导出
module.exports = {
    Guestbook
}