var baseURL = "http://ajax.frontend.itheima.net";
// 测试环境服务器地址

// 生产环境服务器地址

// 拦截所有ajax请求
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url;
})