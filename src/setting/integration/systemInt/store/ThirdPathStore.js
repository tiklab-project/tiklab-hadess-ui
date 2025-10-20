import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios, getUser} from 'tiklab-core-ui';

export class ThirdPathStore {

    // 刷新
    @observable
    fresh = false


    /**
     * 创建
     * @param param
     * @returns {Promise<void>}
     */
    @action
    createThirdPath = async (param) =>{
        const data = await Axios.post('/thirdPath/createThirdPath',param)
        this.fresh = !this.fresh
        return data
    }

    /**
     * 创建
     * @param param
     * @returns {Promise<void>}
     */
    @action
    updateThirdPath = async (param) =>{
        const data = await Axios.post('/thirdPath/updateThirdPath',param)
        this.fresh = !this.fresh
        return data
    }

    /**
     * 删除
     * @param param
     * @returns {Promise<void>}
     */
    @action
    deleteThirdPath = async (id) =>{
        const param=new FormData()
        param.append("id",id)
        const data = await Axios.post('/thirdPath/deleteThirdPath',param)
        this.fresh = !this.fresh
        return data
    }

    /**
     * 条件查询
     * @param param
     * @returns {Promise<void>}
     */
    @action
    findThirdPathList = async (param) =>{
        const data = await Axios.post('/thirdPath/findThirdPathList',param)
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

const thirdPathStore=new ThirdPathStore()
export default  thirdPathStore
