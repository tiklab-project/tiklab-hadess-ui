import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios, getUser} from 'tiklab-core-ui';

export class NetworkProxyStore {

    // 刷新
    @observable
    fresh = false

    /**
     * 查询仓库
     * @param param
     * @returns {Promise<void>}
     */
    @action
    findRepository = async (param) =>{
        const data = await Axios.post('/leanInLibrary/findRepository',param)
        return data
    }

    /**
     * 查询仓库
     * @param param
     * @returns {Promise<void>}
     */
    @action
    leadInRepLibrary = async (param) =>{
        const data = await Axios.post('/leanInLibrary/leadInRepLibrary',param)
        return data
    }

    /**
     * 查询导入状态
     * @param param
     * @returns {Promise<void>}
     */
    @action
    findLeadInState = async (targetRepId) =>{
        const param=new FormData()
        param.append("targetRepId",targetRepId)
        const data = await Axios.post('/leanInLibrary/findLeadInState',param)
        return data
    }
}

const networkProxyStore=new NetworkProxyStore()
export default  networkProxyStore
