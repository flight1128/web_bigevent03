$(function () {
    // 定义提交参数
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    var form = layui.form;
    var layer = layui.layer
    var laypage = layui.laypage
    // 补0操作
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 定义时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var h = padZero(dt.getHours())
        var m = padZero(dt.getMinutes())
        var s = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + h + ':' + m + ':' + s
    }
    // 初始化文章列表
    initTable()
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    var str = template('tpl-table', res)
                    $('tbody').html(str)
                    // 分页
                    renderPage(res.total)
                }
            }
        })
    }

    // 初始化分类
    initCate()
    function initCate() {
        $.ajax({
            method: "get",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    var str = template('tpl-cate', res$)
                    $('[name=cate_id]').html(str)
                    form.render()
                }
            }
        })
    }
    // 筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        var state = $('[name=state]').val()
        var cate_id = $('[name=cate_id]').val()
        q.state = state
        q.cate_id = cate_id
        initTable()
    })
    // 分页
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //ID
            count: total,   //数据总数
            limit: q.pagesize,  //每页显示几条数据
            curr: q.pagenum,    //设置默认选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        });
    }
    // 删除
    $('tbody').on('click', '.btn-delete', function () {
        var Id = $(this).attr('data-id');
        layer.confirm('时候确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    initTable()
                    layer.msg('恭喜您,文章删除成功')
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--;
                }
            })
            layer.close(index);
        });
    })
})