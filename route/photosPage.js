module.exports = async (req,res)=> {
    var flag = req.query.flag;
    if (!flag) {
        res.render('photos');
    }
    switch (flag) {
        case '0': res.render('photos-value/nier')
        break;
        case '1': res.render('photos-value/re0')
        break;
        case '2': res.render('photos-value/alm')
        break;
        case '3': res.render('photos-value/yz')
        break;
        case '4': res.render('photos-value/ren')
        break;
        case '5': res.render('photos-value/ysn')
        break;
        case '6': res.render('photos-value/sh')
        break;
        case '7': res.render('photos-value/hm')
        break;
        case '8': res.render('photos-value/kn')
        break;
    }
}