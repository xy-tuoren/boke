const mongoose = require('mongoose');
//创建评论集合规则
const commentSchema = new mongoose.Schema({
    //文章id
    aid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Article',
    },
    //评论人用户id
    uid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    //评论时间
    time: {
        type:Date
    },
    //评论内容
    content: {
        type:String
    }
});

const Comment = mongoose.model('Comment',commentSchema);
// Comment.create({
//     aid:'5f1ec0169796946f04b08016',
//     uid: '5f34e754dd6e050b7cf356a8',
//     time: Date.now(),
//     content: '11'
// })
//将评论集合构造函数导出
module.exports = {
    Comment
}