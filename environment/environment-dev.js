const api =  'http://192.168.10.3:8081/';
const base_url = JSON.stringify(api);


const webpackGlobal = {
    // 判断是否是用户环境， 如果是用户环境收到切换为true， 如果是内部公司手动切换为false
    userProduction: false,
    base_url: base_url,
    plugin_base_url : JSON.stringify( 'http://localhost:8080/plugins'),
    // 这个不是固定的
    plugin_url: JSON.stringify( 'http://localhost:8080/plugins/config.json'),
    method:JSON.stringify('get'),

    appKey: JSON.stringify('appKey-1'),
    appSecret: JSON.stringify('appSecret-1'),
    version: JSON.stringify('version-1'),
    client: JSON.stringify('client-1'),

    // cookieDomain:  JSON.stringify('doublekit.com'),

    // 本地开发测试acc登录 配置的账号统一登录跳转那个登录页面
    // accUrl_env: JSON.stringify('http://www.doublekit.com'),
}

module.exports =  {
    webpackGlobal
}

