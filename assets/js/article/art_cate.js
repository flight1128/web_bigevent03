$(function () {

    var layer = layui.layer
    initArtCateList()
    // 文章类别列表显示
    function initArtCateList() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    var str = template('tpl-art-cate', res)
                    $('tbody').html(str)
                }
            }
        })
    };
    // 显示添加文章分类列表
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-add'), html()
        });
    });
    // 提交文章分类列表
    var indexAdd = null
    $('body').on('submit', '#form-add', function () {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg('恭喜，文章分类添加成功')
                layer.close(indexAdd)

            }
        })
    });
    // 修改展示表单
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-edit'), html()
        });
        var Id = $(this).attr('data-id');
        $.ajax({
            method: 'get',
            url: '/my/article/cates' + id,
            success: function (res) {
                FormData.val("form-edit", res.data);
            }
        })
    })
    // 修改--提交
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg('恭喜，文章分类更新成功')
                layer.close(indexEdit)

            }
        })
    })
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
                    initArtCateList()
                    layer.msg('恭喜您,文章类别删除成功')
                    layer.close(index);
                }
            })

        });
    })
})