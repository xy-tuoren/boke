$(function () {
})
//删除功能
function del(id) {
    $.ajax({
        type:'get',
        url:'/comment-del',
        data: {
            id
        },
        success:function () {
            change(1,$('.comment').attr("flag"));
        }
    })
}
//处理用户评论点击提交
function but() {
        $.ajax({
            type: 'get',
            url: '/comment-add',
            data: {
                content:$('.comment textarea').val(),
                aid:$('.comment').attr("flag")
            },
            success:function (data) {
                if (data==='0'){
                    alert('登录后才可以评论哦');
                    $('.comment textarea').val("");
                }else {
                    change(1,$('.comment').attr("flag"));
                    $('.comment textarea').val("");
                }
            }
        })
}
//分页处理
function change(page,id){
    $.ajax({
        type:'get',
        url:'/article-value',
        data:{
            page,
            id
        },
        success:function (data) {
            $('.bottom').html(data);
            $(".center").each(function () {
                if ($(this).attr("flag")==page){
                    $(this).addClass("bg").siblings("li").removeClass("bg");
                }
            })
        }
    });
}
//处理用户点赞
function call(id) {
    $.ajax({
        type:'get',
        url:'/call',
        data:{
            id
        },
        success:function (data) {
            if (data==='0'){
                alert('登录后才可以点赞哦');
                return;
            }
            if (data==='1'){
                alert('您已经给此文章点赞过了');
                return;
            }
            if (data==='2'){
                alert('感谢您的赞');
                //判断此web储存是否存在
                if (localStorage.getItem(id+'call')){
                    //用于设置点赞量
                    localStorage.setItem(id+'call',Number(localStorage.getItem(id+'call'))+1);

                }else {
                    localStorage.setItem(id+'call','1');
                }
            }
        }
    })
}