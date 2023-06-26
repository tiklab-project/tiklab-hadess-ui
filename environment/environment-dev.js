const api =  'http://192.168.10.7:8083';
const base_url = JSON.stringify(api);

const webpackGlobal = {
    // 判断是否是用户环境， 如果是用户环境收到切换为true， 如果是内部公司手动切换为false
    userProduction: false,
    base_url: base_url,
    //plugin_base_url : JSON.stringify( 'http://localhost:8080/plugins'),
    // 这个不是固定的
    plugin_url: JSON.stringify( api + 'pluginConfig/getPluginConfig'),
    method:JSON.stringify('post'),

    appKey : JSON.stringify(""),
    appSecret : JSON.stringify(""),
    version : JSON.stringify("ce"),
    client : JSON.stringify("web"),
    DEPLOY_MODE: JSON.stringify("ce"),
    tenant_type: JSON.stringify("xpack"),

    // cookieDomain:  JSON.stringify('tiklab.com'),

    // 本地开发测试acc登录 配置的账号统一登录跳转那个登录页面
    // accUrl_env: JSON.stringify('http://www.tiklab.com'),
}

module.exports =  {
    webpackGlobal
}

