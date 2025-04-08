import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios, getUser} from 'tiklab-core-ui';

export class NetworkProxyStore {

    // 刷新
    @observable
    fresh = false

    /**
     * 创建代理
     * @param param
     * @returns {Promise<void>}
     */
    @action
    createNetworkProxy = async (param) =>{
        const data = await Axios.post('/networkProxy/createNetworkProxy',param)
        this.fresh = !this.fresh
        return data
    }

    /**
     * 更新代理
     * @param param
     * @returns {Promise<void>}
     */
    @action
    updateNetworkProxy = async (param) =>{
        const data = await Axios.post('/networkProxy/updateNetworkProxy',param)
        this.fresh = !this.fresh
        return data
    }

    /**
     * 删除代理
     * @param param
     * @returns {Promise<void>}
     */
    @action
    deleteNetworkProxy = async (id) =>{
        const param=new FormData()
        param.append("id",id)
        const data = await Axios.post('/networkProxy/deleteNetworkProxy',param)
        if (data.code===0){
            this.fresh = !this.fresh
        }
        return data
    }

    /**
     * 条件查询代理
     * @param param
     * @returns {Promise<void>}
     */
    @action
    findNetworkProxyList = async (param) =>{
        const data = await Axios.post('/networkProxy/findNetworkProxyList',param)
        return data
    }


}

const networkProxyStore=new NetworkProxyStore()
export default  networkProxyStore
