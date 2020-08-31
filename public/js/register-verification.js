$(function () {
    //定义表单验证变量
    var one = false;
    var two = false;
    var there = false;
    var four = false;
    //点击跳转注册页按钮时进行表单验证
    $("#signin").on("click",function () {
        $(".back .input-register:eq(0)").on("focus",function () {
            $(this).addClass("box-shadow");
        }).blur(function () {
            var a= /^[\u4E00-\u9FA5A-Za-z0-9]{2,12}$/;
            if(!(a.test($(this).val().trim()))){
                if($(this).attr("flag")===undefined){
                    var text = $("<h6>用户名必须为2到12位</h6>");
                    $(this).css("margin-bottom",0+"px");
                    $(this).attr("flag","1");
                    $(this).after(text);
                    $(this).remove("box-shadow");
                    $(this).addClass("box-shadow-err");
                    one = false;
                }
            }else {
                one = true;
                if ($(this).attr("flag")!==undefined){
                    $(this).css("margin-bottom",20+"px");
                    $(this).removeAttr("flag");
                    $(this).next("h6").remove();
                    $(this).removeClass("box-shadow-err");
                }
                $(this).removeClass("box-shadow");
            }
        });
        $(".back .input-register:eq(1)").on("focus",function () {
            $(this).addClass("box-shadow");
        }).blur(function () {
            var email = $(this).val();
            var a = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if(!a.test(email)){
                if($(this).attr("flag")===undefined){
                    var text = $("<h6>邮箱格式不正确</h6>");
                    $(this).css("margin-bottom",0+"px");
                    $(this).attr("flag","1");
                    $(this).after(text);
                    $(this).addClass("box-shadow-err");
                    two = false;
                }else {
                    $(this).next("h6").text("邮箱格式不正确");
                    two = false;
                }
            }else {
                    $.post("/email",{ email: email },function (data) {
                         if(data==="true"){
                             if ($(".back .input-register:eq(1)").attr("flag")!==undefined){
                                 $(".back .input-register:eq(1)").next("h6").text("此邮箱已被注册");
                                 two = false;
                             }else {
                                 var text = $("<h6>此邮箱已被注册</h6>");
                                 $(".back .input-register:eq(1)").css("margin-bottom",0+"px");
                                 $(".back .input-register:eq(1)").attr("flag","1");
                                 $(".back .input-register:eq(1)").after(text);
                                 $(".back .input-register:eq(1)").addClass("box-shadow-err");
                                 two = false;
                             }
                         }else{
                             if ($(".back .input-register:eq(1)").attr("flag")!==undefined){
                                 $(".back .input-register:eq(1)").css("margin-bottom",20+"px");
                                 $(".back .input-register:eq(1)").removeAttr("flag");
                                 $(".back .input-register:eq(1)").next("h6").remove();
                                 $(".back .input-register:eq(1)").removeClass("box-shadow-err");
                             }
                             two = true;
                         }
                    });
                $(this).removeClass("box-shadow");
            }
        });
        $(".back .input-register:eq(2)").on("focus",function () {
            $(this).addClass("box-shadow");
        }).blur(function () {
            var a = /^[a-zA-Z0-9]\w{5,17}$/;
            if(!a.test($(this).val())){
                if($(this).attr("flag")===undefined){
                    var text = $("<h6>密码必须由6-18数字字母下划线组成</h6>");
                    $(this).css("margin-bottom",0+"px");
                    $(this).attr("flag","1");
                    $(this).after(text);
                    $(this).addClass("box-shadow-err");
                    there = false;
                }
            }else {
                there = true;
                if ($(this).attr("flag")!==undefined){
                    $(this).css("margin-bottom",20+"px");
                    $(this).removeAttr("flag");
                    $(this).next("h6").remove();
                    $(this).removeClass("box-shadow-err");
                }
                $(this).removeClass("box-shadow");
            }
        });
        $(".back .input-register:eq(3)").on("focus",function () {
            $(this).addClass("box-shadow");
        }).blur(function () {
            if($(this).val().trim()===""||$(this).val()!==$(".back .input-register:eq(2)").val()){
                if($(this).attr("flag")===undefined){
                    var text = $("<h6>两次密码不一致</h6>");
                    $(this).css("margin-bottom",0+"px");
                    $(this).attr("flag","1");
                    $(this).after(text);
                    $(this).addClass("box-shadow-err");
                    four = false;
                }
            }else {
                four = true;
                if ($(this).attr("flag")!==undefined){
                    $(this).css("margin-bottom",20+"px");
                    $(this).removeAttr("flag");
                    $(this).next("h6").remove();
                    $(this).removeClass("box-shadow-err");
                }
                $(this).removeClass("box-shadow");
            }
        })
    })
    $("#login").on("click",function () {
        //当点击切换登录按钮时还原表单
        $(".input-register").next("h6").remove();
        $(".input-register").removeClass("box-shadow-err");
        $(".input-register").removeClass("box-shadow");
        $(".input-register").removeAttr("flag");
        $(".input-register").css("margin-bottom",20+"px");
        //让登录页面第一个表单获取焦点
        $(".input-login:eq(0)").focus();
    })
    //阻止表单默认提交
    $("#form-register").on("submit",function () {
        if (one && two && there && four){
            alert("注册成功");
            return;
        }
        return false;
    })
})