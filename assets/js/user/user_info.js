$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1~6位之间"
            }
        }
    })
})
// 用户渲染
initUserInfo()
var layer = layui.layer;
function initUserInfo() {
    $.ajax({
        method: 'get',
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // 成功,后渲染
            form.val('formUserInfo', res.data)
        }
    })
}
$("#brnReset").on("click", function (e) {
    e.preventDefault()
    // 从新用户渲染
    initUserInfo()
})
// 修改用户信息
$('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        method: "post",
        url: "/my/userinfo",
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('用户修改信息失败')

            }
            layer.msg("恭喜,注册成功")
            window.parent.getUserInof()
        }
    })
})