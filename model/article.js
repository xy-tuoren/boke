//创建文章集合
const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema({
        title:{
            type:String,
            maxlength:20,
            required:[true,'请填写文章标题']
        },
        brief:{//文章简介
            type:String
        },
        author:{//文章作者
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',//和用户集合关联
            default:'5f34e754dd6e050b7cf356a8'
        },
        publishDate:{//时间
            type:Date,
            default:Date.now//默认时间为当前电脑系统时间
        },
        cover:{//封面图片文件路径
            type:String,
            default:"/uploads/default.jpg"
        },
        category:{//文章类别
            type:String
        },
        label:{//文章标签
            type:[String]
        },
        content:{//文章内容
            type:String
        }
})
const Article = mongoose.model('Article',articleSchema);
// Article.create({
//     title: "刺激战场",
//     brief: "刺激战场世界冠军皮肤",
//     author: "5f34e754dd6e050b7cf356a8",
//     cover: "/uploads/1.jpg",
//     category: "娱乐",
//     label: "英雄联盟",
//     content: "有手就行有手就行有手就行"
// });
module.exports = {
    Article
}