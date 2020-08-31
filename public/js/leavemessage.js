$(function () {
    $(".textarea").on("keydown",function () {
        var a= $(".textarea").val().length;
        $(".text i").text(`${a}/100`);
    })
    $(".textarea").on("keyup",function () {
        var a= $(".textarea").val().length;
        $(".text i").text(`${a}/100`);
    })
    $(".but").on("click",function () {
        var a = $(".textarea").val();
        if (a===''){
            alert('你还没有输入留言内容哦');
            return;
        }
        $.ajax({
            type:'get',
            url:'/leavemessageAdd',
            data:{
                value:a
            },
            success:function (data) {
                if(data==="ture"){
                    alert("感谢您的留言qaq");
                    $(".text i").text(`0/100`);
                    $(".textarea").val("");
                    $.ajax({
                        type:'get',
                        url:'/leavemessage',
                        data:{
                            page:1
                        },
                        success:function (data) {
                            $('.list').html(data);
                            $(".center:eq(0)").addClass("bg");
                        }
                    });

                }else {
                    alert("登录后才能留言哦");
                    $(".textarea").val("");
                    $(".text i").text(`0/100`);
                }
            }
        })
    })
})
//分页处理
function change(page){
    $.ajax({
        type:'get',
        url:'/leavemessage',
        data:{
            page:page
        },
        success:function (data) {
            $('.list').html(data);
            $(".center").each(function () {
                if ($(this).attr("flag")==page){
                    $(this).addClass("bg");
                }
            })
        }
    });
}
//删除留言处理
function del(id) {
    $.ajax({
        type:'get',
        url:'/leavemessageDelete',
        data:{
            id
        },
        success:function () {
            //调用分页方法重新渲染一次数据
            change($(".bg").attr("flag"));
        }
    })
}