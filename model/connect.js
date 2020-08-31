//连接数据库
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/boke",{useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=>console.log("数据库连接成功"))
    .catch(err=>console.log(err,"数据库连接失败"))
