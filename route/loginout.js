module.exports = (req,res) => {
    //删除session
    req.session.destroy(function (err) {
        if(err){
            console.log(err);
        }
        //删除模板中的用户信息
        req.app.locals.userInfo = null;
        //删除cookie
        res.clearCookie('connect.sid');
        res.send();
    })
}