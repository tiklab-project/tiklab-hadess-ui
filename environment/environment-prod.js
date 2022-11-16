const api =  '/';
const base_url = JSON.stringify(api);


const webpackGlobal = {
    // 判断是否是用户环境， 如果是用户环境收到切换为true， 如果是内部公司手动切换为false
    userProduction: false,
    base_url: base_url,
    plugin_base_url : base_url,

    plugin_url: JSON.stringify( 'http://114.215.180.181:8080/plugin/getPluginConfig'),
    method:JSON.stringify('get'),

    appKey: JSON.stringify('appKey-1'),
    appSecret: JSON.stringify('appSecret-1'),
    version: JSON.stringify('version-1'),
    client: JSON.stringify('client-1'),

    // DEPLOY_MODE: JSON.stringify('saas'),
    // // 登录认证类型
    // authType: JSON.stringify('acc'),  // axios 根据该字段判断是否是sass
    // authUrl: JSON.stringify('http://114.215.202.90:8090/#/login'),
    //
    // // 每个项目的域名
    // PROJECT_URLS: JSON.stringify(
    //     [
    //         {url:"http://114.215.202.90:8080", title: '项目管理'},
    //         {url:"http://114.215.202.90:8070", title: '接口管理'},
    //     ]
    // ),
    // saas 版本 cookie
    // cookieDomain:  JSON.stringify('tiklab.com'),
}

module.exports = {
    webpackGlobal
}
