const api =  'http://192.168.10.78:8080';
const base_url = JSON.stringify(api);

const webpackGlobal = {
    // 判断是否是用户环境， 如果是用户环境收到切换为true， 如果是内部公司手动切换为false
    userProduction: false,
    base_url: base_url,
    // 这个不是固定的
    plugin_url: JSON.stringify( api + 'pluginConfig/getPluginConfig'),
    method:JSON.stringify('post'),

    appKey : JSON.stringify("tiklab_hadess"),
    appSecret : JSON.stringify(""),
    version : JSON.stringify("ce"),
    client : JSON.stringify("web"),
    DEPLOY_MODE: JSON.stringify("ce"),
    tenant_type: JSON.stringify("Hadess"),
    node_env: true,
    env:JSON.stringify("dev"),
    // cookieDomain:  JSON.stringify('thoughtware.com'),

    // 本地开发测试acc登录 配置的账号统一登录跳转那个登录页面
    // accUrl_env: JSON.stringify('http://www.thoughtware.com'),
}

module.exports =  {
    webpackGlobal
}

