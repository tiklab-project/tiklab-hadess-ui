
const api =  '/';
const base_url = JSON.stringify(api);

const webpackGlobal = {
    // 判断是否是用户环境， 如果是用户环境收到切换为true， 如果是内部公司手动切换为false
    userProduction: false,
    base_url: base_url,
    plugin_base_url:base_url,
    plugin_url: JSON.stringify( '/plugin/getPluginConfig'),
    method:JSON.stringify('post'),

     appKey : JSON.stringify(""),
     appSecret : JSON.stringify(""),
     version : JSON.stringify("ce"),
     client : JSON.stringify("web"),
     DEPLOY_MODE: JSON.stringify("saas"),
     tenant_type: JSON.stringify("mult"),
     node_env: false,
}

module.exports = {
    webpackGlobal
}
