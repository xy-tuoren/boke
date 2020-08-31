$(function () {
    //标志量
    var one;
    var two;
    var email;
    var password;
    $(".input-login:eq(0)").on("focus",function () {
        $(this).addClass("box-shadow");
    }).focus().on("blur",function () {
            if ($(this).val().trim()===""){
                if($(this).attr("flag")===undefined){
                    var text = $("<h6>请输入用户邮箱</h6>");
                    $(this).css("margin-bottom",0+"px");
                    $(this).attr("flag","1");
                    $(this).after(text);
                    $(this).remove("box-shadow");
                    $(this).addClass("box-shadow-err");
                    one = false;
                }
            }else {
                one = true;
                email = $(this).val();
                if ($(this).attr("flag")!==undefined){
                    $(this).css("margin-bottom",30+"px");
                    $(this).removeAttr("flag");
                    $(this).next("h6").remove();
                    $(this).removeClass("box-shadow-err");
                }
                $(this).removeClass("box-shadow");
            }
    });
    $(".input-login:eq(1)").on("focus",function () {
        $(this).addClass("box-shadow");
    }).on("blur",function () {
        if ($(this).val().trim()===""){
            if($(this).attr("flag")===undefined){
                var text = $("<h6>请输入密码</h6>");
                $(this).css("margin-bottom",0+"px");
                $(this).attr("flag","1");
                $(this).after(text);
                $(this).remove("box-shadow");
                $(this).addClass("box-shadow-err");
                one = false;
            }
        }else {
            two = true;
            password = $(this).val();
            if ($(this).attr("flag")!==undefined){
                $(this).css("margin-bottom",30+"px");
                $(this).removeAttr("flag");
                $(this).next("h6").remove();
                $(this).removeClass("box-shadow-err");
            }
            $(this).removeClass("box-shadow");
        }
    });
    $("#signin").on("click",function () {
        //当点击切换登录按钮时还原表单
        $(".input-login").next("h6").remove();
        $(".input-login").removeClass("box-shadow-err");
        $(".input-login").removeClass("box-shadow");
        $(".input-login").removeAttr("flag");
        $(".input-login").css("margin-bottom",30+"px");
        //让注册页面第一个表单获取焦点
        $(".input-register:eq(0)").focus();
    })
    //阻止表单默认提交
    $("#form-login").on("submit",function () {
        if (one && two){
            $.ajax({
                url: "/login",
                data: {email:email,password:password},
                type: "post",
                success: function (data) {
                    if (data==="1"){
                        alert("账号或密码错误");
                    }else if(data==="2"){//重定向到文章页面
                        location.href="/article";
                    }else if(data==="3"){//重定向到文章页面
                        location.href="/article";
                    }
                },
                error:function () {
                    alert("服务器出现错误请联系管理员")
                }
            })
            return false
        }
        return false;
    })
})