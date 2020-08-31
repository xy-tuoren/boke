$(function () {
    var emi = $("input:eq(1)").val();
    //点击编辑信息后
    $(".end span").on("click",function () {
        $(".flag").toggleClass("none");
        $(".portrait-div p").toggleClass("none");
        if(!$(".flag").hasClass("none")){//如果没有拥有none类
            $(".end span").text("取消编辑");
            $(".portrait-div p").on("click",function () {
                $("#file").click();
                //当用户选择完文件后（实现用户选择文件后文件预览功能）
                $("#file").change(function () {
                    //1创建文件读取对象
                    var reader = new FileReader();
                    //用户选择的文件列表
                    // this.files
                    //2读取文件
                    reader.readAsDataURL(this.files[0])
                    //3监听onload事件
                    reader.onload = function () {
                        //将文件读取的结果显示在页面中
                        //reader.result:文件在网络上的地址
                        $(".portrait").attr("src",reader.result);
                    }
                })
                return false;
            })
            $("input").not(".role").removeAttr("disabled");
            $("input").not(".role").css({
                "border":"1px",
                "border-style": "solid",
                "border-color": "#ccc",
                "background-color": "white"
            })
        }else{
            $(".end span").text("编辑信息");
            //将input变为不可编辑状态
            $("input").not(".role").attr("disabled","disabled");
            //取消input得边框
            $("input").not(".role").css({
                "border":"none",
                "background": "none"
            })
        };
    })
    $("form").on("submit",function () {
        var a= /^[\u4E00-\u9FA5A-Za-z0-9]{2,12}$/;
        if(!(a.test($("input:eq(0)").val().trim()))){
            alert("用户名为2到12位");
            $("input:eq(0)").focus();
            return false;
        };
        var b = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!(b.test($("input:eq(1)").val().trim()))){
            alert("邮箱格式不正确");
            $("input:eq(1)").focus();
            return false;
        };
        var c = /^[a-zA-Z0-9]\w{5,17}$/;
        if (!(c.test($("input:eq(2)").val().trim()))){
            alert("密码必须由6-18数字字母下划线组成");
            $("input:eq(2)").focus();
            return false;
        }
        if(emi!==$("input:eq(1)").val().trim()){
            $.post("/email",{ email: $("input:eq(1)").val().trim() },function (data) {
                if (data == "true") {
                    alert("此邮箱已被注册");
                }
            })
        }
    })
    $(".loginout").on("click",function () {
        $.get("/loginout",function () {
            alert("欢迎下次再来");
            location.href = "/login";
        });
    })
})

