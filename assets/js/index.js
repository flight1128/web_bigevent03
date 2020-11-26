$(function () {
    getUserInof()



    // 退出
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        layer.confirm('你确定?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地token
            localStorage.removeItem('token')
            // 页面跳转
            location.href = "/login.html"
            layer.close(index);
        });
    })
})
// 获取信息函数
function getUserInof() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     // 重新登录,因为token 过期事件1小时
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // 请求成功 渲染头像
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user) {
    // 优先渲染图片头像 其次是名字首字母头像
    var name = user.nickname || user.username;
    $("#welcome").html('欢迎  ' + name)
    // 渲染头像
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text_avatar').hide()
    } else {
        // 没有头像
        $('.layui-nav-img'), hide()
        var text = name[0].toUpperCase()
        $('.text_avatar').show().html(text)
    }
}