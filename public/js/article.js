$(function () {
    //给页面的浏览量赋值
    updatabw();
    //给页面的点赞量赋值
    updatacall();
    //处理用户输入关键字点击搜索
    $('.search').on('click',function () {
        change(1);
        //更新浏览量信息
        updatabw();
        //更新点赞量信息
        updatacall();
    })
    //处理分类点击
    $('.cls').on('click',function () {
        $.ajax({
            type:'get',
            url:'/article',
            data:{
                clsval:$(this).text(),
                page:1
            },
            success:function (data) {
                $('.article-body').html(data);
                $(".center").each(function () {
                    if ($(this).attr("flag")==1){
                        $(this).addClass("bg").siblings('li').removeClass("bg");
                    }
                });
                //更新浏览量信息
                updatabw();
                //更新点赞量信息
                updatacall();
            }
        })
    })
})
function change(page){
    //处理分页
    $.ajax({
        type:'get',
        url:'/article',
        data:{
            page,
            val:$('.suo').val().trim()
        },
        success:function (data) {
            $('.article-body').html(data);
            $(".center").each(function () {
                if ($(this).attr("flag")==page){
                    $(this).addClass("bg").siblings('li').removeClass("bg");
                }
            });
            //更新浏览量信息
            updatabw();
            //更新点赞量信息
            updatacall();
        }
    });

}
//处理点击文章
function list(id) {
    //判断此web储存是否存在
    if (localStorage.getItem(id)){
        //用于设置访问量
        localStorage.setItem(id,Number(localStorage.getItem(id))+1);

    }else {
        localStorage.setItem(id,'1');
    }
    location.href = "/article-value?id="+id;
};
//更新浏览量信息
function updatabw() {
    $('.browse').each(function () {
        if (localStorage.getItem($(this).attr("flag"))){
            $(this).text(localStorage.getItem($(this).attr("flag")));
        }else {
            $(this).text(0);
        }
    })
}
//更新点赞量信息
function updatacall() {
    $('.call').each(function () {
        if (localStorage.getItem($(this).attr("flag")+'call')){
            $(this).text(localStorage.getItem($(this).attr("flag")+'call'));
        }else {
            $(this).text(0);
        }
    })
}