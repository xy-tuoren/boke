$(function () {
        $(".body div").on("click",function () {
            $.ajax({
                type:'get',
                url:'/photos',
                data:{flag:$(this).index()},
                success:function (data) {
                    $("body").html(data);
                }
            })
        })
})
function out() {
    $.ajax({
        type:'get',
        url:'/photos',
        success:function (data) {
            $("body").html(data);
        }
    })
}