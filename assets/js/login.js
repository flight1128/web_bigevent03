$(function () {
    //点去注册 登录页面隐藏 注册页面显示
    $('#link_reg').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    //点去登录 登录页面显示 注册页面隐藏
    $('#link_login').on('click', function () {
        $('.reg_box').hide()
        $('.login_box').show()

    })
    // 登录自定义验证规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $(".reg_box input[name=password]").val()
            if (value !== pwd) {
                return "两次密码输入都不一样"
            }
        }

    });
    // 注册功能
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: "post",
            url: '/api/reguser',
            data: {
                username: $('.reg_box [name=username]').val(),
                password: $('.reg_box [name=password]').val(),

            },
            success: function (res) {
                if (res.status !== 0) {
                    return alert(res.message)
                }
                layer.msg('注册成功,登陆去吧')
                $('#link_login').click()
                $('#form_reg')[0].reset()
            }
        })
    })
    // 登陆功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜登陆成功')
                localStorage.setItem('token', res.token)
                location.href = "/index.html"
            }
        })
    })
})