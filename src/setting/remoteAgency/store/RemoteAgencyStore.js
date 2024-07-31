import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios, getUser} from 'thoughtware-core-ui';

export class RemoteAgencyStore {

    // 刷新
    @observable
    fresh = false

    /**
     * 创建代理
     * @param param
     * @returns {Promise<void>}
     */
    @action
    createRemoteProxy = async (param) =>{
        const data = await Axios.post('/remoteProxy/createRemoteProxy',param)
        this.fresh = !this.fresh
        return data
    }

    /**
     * 更新代理
     * @param param
     * @returns {Promise<void>}
     */
    @action
    updateRemoteProxy = async (param) =>{
        const data = await Axios.post('/remoteProxy/updateRemoteProxy',param)
        this.fresh = !this.fresh
        return data
    }

    /**
     * 删除代理
     * @param param
     * @returns {Promise<void>}
     */
    @action
    deleteRemoteProxy = async (id) =>{
        const param=new FormData()
        param.append("id",id)
        const data = await Axios.post('/remoteProxy/deleteRemoteProxy',param)
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
    findRemoteProxyList = async (param) =>{
        const data = await Axios.post('/remoteProxy/findRemoteProxyList',param)
        return data
    }

    /**
     * 通过仓库ID 查询代理
     * @param param
     * @returns {Promise<void>}
     */
    @action
    findProxyListByRpyId = async (rpyId) =>{
        const param = new FormData()
        param.append("repositoryId",rpyId)
        const data = await Axios.post('/remoteProxy/findProxyListByRpyId',param)
        return data
    }
    /**
     * 通过代理地址的id 查询是关联的仓库
     * @param param
     * @returns {Promise<void>}
     */
    @action
    findRepositoryByProxyId = async (id) =>{
        const param = new FormData()
        param.append("id",id)
        const data = await Axios.post('/remoteProxy/findRepositoryByProxyId',param)
        return data
    }

}

const remoteProxyStore=new RemoteAgencyStore()
export default  remoteProxyStore
