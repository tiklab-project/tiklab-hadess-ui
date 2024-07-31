/**
 * @name: axios
 * @author: mahai
 * @date: 2021-07-14 14:43
 * @description：axios
 * @update: 2021-07-14 14:43
 */
import axios from 'thoughtware-oms-web/src/utils/axios';
import {message} from 'antd'
import {removeUser, getUser} from './index';


const service = axios.create({
    baseURL:  base_url ? base_url:"/",
    timeout:  5000,
});


service.interceptors.request.use(
    async (config) => {
        let headers = getAPIgateway();
        const user = getUser();
        if (user && user.ticket) {
            headers = {
                ...headers,
                ticket: user.ticket,
            };
        }
        config.headers = {
            ...config.headers,
            "Content-Type": "application/json",
            ...headers,
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
/**
 * 设置返回
 */
service.interceptors.response.use(
    (response) => {
        if (response.data) {
            errorMsg(response.data)
        }
        return response;
    },
    (error) => {
        console.log("请求出错：", error);
    }
);
/***
 * 封装的axios
 */
class Axios {
    constructor() {
        this.service = service
    }

    get(url, params = {}, tenant) {
        return new Promise((resolve, reject) => {
            if (tenant) service.defaults.headers['tenant'] = tenant
            this.service.get(url, {
                params: params,
            }).then((response) => {
                if (response) {
                    resolve(response.data);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }
    put(url, data = {}, tenant) {
        return new Promise((resolve, reject) => {
            if (tenant) service.defaults.headers['tenant'] = tenant
            service.put(url, data).then(
                (response) => {
                    if (response) {
                        resolve(response.data);
                    }
                },
                (err) => {
                    errorMsg(err, url);
                    reject(err);
                }
            );
        });
    }
    post(url, data, tenant) {
        return new Promise((resolve, reject) => {
            if (tenant) service.defaults.headers['tenant'] = tenant

            service.post(url, data).then(
                (response) => {
                    if (response) {
                        resolve(response.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }

    delete(url, data, tenant) {
        return new Promise((resolve, reject) => {
            if (tenant) service.defaults.headers['tenant'] = tenant

            this.service.delete(url, data).then(
                (response) => {
                    if (response) {
                        resolve(response.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }
    request(params = {method: 'get', url: '', data:{}, tenant:''}) {
        switch(params.method){
            case 'get' :
                return this.get(params.url, params.data, params.tenant);
            case 'post' :
                return this.post(params.url, params.data, params.tenant)
            case 'put' :
                return this.put(params.url, params.data, params.tenant)
            case 'delete' :
                return this.delete(params.url, params.data, params.tenant)
            default:
                return this.get(params.url, params.data, params.tenant);
        }

    }
}


function getOS() {
    const sUserAgent = navigator.userAgent;
    const isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    const isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) return "Mac";
    const isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if (isUnix) return "Unix";
    const isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    if (isLinux) return "Linux";
    if (isWin) {
        const isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) return "Win2000";
        const isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) return "WinXP";
        const isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) return "Win2003";
        const isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) return "WinVista";
        const isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) return "Win7";
        const isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
        if (isWin10) return "Win10";
    }
    return "other";
}

function getAPIgateway () {
    const system = getOS();
    let obj = {
        appKey: appKey,
        appSecret: appSecret,
        client: client,
        version: version,
    }
    let newObj = {}
    Object.keys(obj).forEach(key => {
        if (obj[key]) {
            newObj[key] = obj[key]
        }
    })
    return {
        system,
        ...newObj
    }
}

function getHashParameters() {
    let params = {}
    if (location.search.indexOf("?") === -1) {
        return params
    }
    let arr = (location.search || '').split('?')[1].split('&')

    for (let i = 0; i < arr.length; i++) {
        let data = arr[i].split('=')
        if (data.length === 2) {
            params[data[0]] = data[1]
        }
    }
    return params
}

function query(key) {
    let params = getHashParameters()
    return params[key]
}

function errorMsg(err) {
    const code = err.code;
    const authDataString = localStorage.getItem('authConfig') || '';
    const authData = JSON.stringify(authDataString)
    switch (code) {
        case 1001:
            removeUser()
            if (authData?.authAccConfig?.accUrl) window.location.href = authData.authAccConfig.accUrl
            break;
        case 1000:
            removeUser()
            if (authData?.authAccConfig?.accUrl) window.location.href = authData.authAccConfig.accUrl
            break;
        case 60000:
            message.error(err.msg || '错误')
            break
        case 403:
            alert("拒绝访问");
            break;

        case 404:
            alert("请求地址出错");
            break;

        case 408:
            alert("请求超时");
            break;

        case 500:
            alert("服务器内部错误");
            break;

        case 501:
            alert("服务未实现");
            break;

        case 502:
            alert("网关错误");
            break;

        case 503:
            alert("服务不可用");
            break;

        case 504:
            alert("网关超时");
            break;

        case 505:
            alert("HTTP版本不受支持");
            break;
        default:
    }
}


export default new Axios();
