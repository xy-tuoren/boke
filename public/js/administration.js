$(function () {
    $(".article-add .select-noselected").on("click",function () {
        //所有文章界面切换
        $(".article-add").css("display","none");
        $(".article-all").css("display","block");
    })
    $("form").on("submit",function () {
        return;
    })
    $("#file").on("change",function () {
        var formDate = new FormData();
        formDate.append("filename",this.files[0]);
        $.ajax({
            //实现文件上传预览功能
            type:'post',
            url:'/upload',
            //ajax2.0可以不用设置请求头，但是jq帮我们自动设置了，这样的话需要我们自己取消掉
            contentType:false,
            //取消帮我们格式化数据，是什么就是什么
            processData:false,
            data:formDate,
            success:function (data) {
                var img = $(`<img src="${data.split("public")[1]}"  flag="1" style='width: 100%;height: 180px'>`);
                if ($("#file").next().attr("flag")==1){
                    $("#file").next().attr("src",`${data.split("public")[1]}`);
                }else {
                    $("#file").after(img);
                }
            }
        })
    })
})
function edit(index){
    if ($('.article-all tr').eq(index+1).find('input').attr('disabled')){
        $('.article-all tr').eq(index+1).find('input').css('backgroundColor','#ccc').removeAttr('disabled');
        $('.edit').eq(index).text("提交");
        $('.date').eq(index).attr("type","datetime-local");
    }else {
        $('.article-all tr').eq(index+1).find('input').css('backgroundColor','rgba(255,255,255,.1)').attr('disabled','disabled');
        $('.edit').eq(index).text("编辑");
        let id = $(".del").eq(index).attr("_id");
        let title = $(".title").eq(index).val();
        let brief = $(".brief").eq(index).val();
        let username = $(".username").eq(index).val();
        let cover = $(".cover").eq(index).val();
        let category = $(".category").eq(index).val();
        let label = $(".label").eq(index).val();
        let publishDate = $(".date").eq(index).val();
        //实现点击编辑文章功能
        $.ajax({
            type:'get',
            url: "/administrationEdit",
            data:{
                id,
                title,
                brief,
                username,
                cover,
                category,
                label,
                publishDate
            }
        })
        change($(".bg").attr("flag"));
    }
}
function del(index){
    var id = $(".del").eq(index).attr("_id");
    //实现删除文章功能
    $.ajax({
        type:'get',
        url: "/administrationDelete",
        data:{
            id: id
        }
    })
    change($(".bg").attr("flag"));
}
function change(page){
    //处理分页点击
    $.ajax({
        type:'get',
        url:'/administration',
        data:{
            category:$(".article-all select").val(),
            page:page
        },
        success:function (data) {
            $('.article-all').html(data);
            $(".center").each(function () {
                if ($(this).attr("flag")==page){
                    $(this).addClass("bg");
                }
            })
        }
    });
}
function add(){
    //文章添加界面切换
    $(".article-all").css("display","none");
    $(".article-add").css("display","block");
}
function cha() {
    $.ajax({
        type: 'get',
        url: '/administration',
        data: {category:$(".article-all select").val(),page: 1},
        success:function (data) {
            $('.article-all').html(data);
            $(".center").each(function () {
                if ($(this).attr("flag")==1){
                    $(this).addClass("bg");
                }
            })
        }
    })

}