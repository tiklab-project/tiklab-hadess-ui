const api =  'http://192.168.10.19:8083/';
const base_url = JSON.stringify(api);
const ftp_url ="http://192.168.10.12:8083";

const webpackGlobal = {
    // 判断是否是用户环境， 如果是用户环境收到切换为true， 如果是内部公司手动切换为false
    userProduction: false,
    base_url: base_url,
    ftp_url:ftp_url,
    //plugin_base_url : JSON.stringify( 'http://localhost:8080/plugins'),
    // 这个不是固定的
    plugin_url: JSON.stringify( api + 'pluginConfig/getPluginConfig'),
    method:JSON.stringify('get'),

    appKey : JSON.stringify(""),
    appSecret : JSON.stringify(""),
    version : JSON.stringify("cloud"),
    client : JSON.stringify("web"),
    DEPLOY_MODE: JSON.stringify("saas"),
    tenant_type: JSON.stringify("mult"),

    // cookieDomain:  JSON.stringify('tiklab.com'),

    // 本地开发测试acc登录 配置的账号统一登录跳转那个登录页面
    // accUrl_env: JSON.stringify('http://www.tiklab.com'),
}

module.exports =  {
    webpackGlobal
}

