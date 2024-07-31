import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios, getUser} from 'thoughtware-core-ui';

export class ScanHoleStore {
    // 刷新
    @observable
    fresh = false

    /**
     * 添加漏洞
     * @param param
     * @returns {Promise<void>}
     */
    @action
    createScanHole = async (param) =>{
        const data = await Axios.post('/scanHole/createScanHole',param)
        this.fresh = !this.fresh
        return data
    }


    /**
     * 删除漏洞
     * @param param
     * @returns {Promise<void>}
     */
    @action
    deleteScanHole = async (id) =>{
        const param=new FormData()
        param.append('id',id)
        const data = await Axios.post('/scanHole/deleteScanHole',param)
        this.fresh = !this.fresh
        return data
    }

    /**
     * 分页查询漏洞
     * @param param
     * @returns {Promise<void>}
     */
    @action
    findScanHolePage = async (param) =>{
        const data = await Axios.post('/scanHole/findScanHolePage',param)
        return data
    }

    /**
     * 创建扫描方案和漏洞关联
     * @param param
     * @returns {Promise<void>}
     */
    @action
    createScanSchemeHole = async (param) =>{
        const data = await Axios.post('/scanSchemeHole/createScanSchemeHole',param)
        if (data.code===0){
            this.fresh = !this.fresh
        }
        return data
    }

    /**
     *  根据漏洞ID 和方案id 删除扫描方案和漏洞关联
     * @param param
     * @returns {Promise<void>}
     */
    @action
    deleteScanSchemeHoleByCond = async (holeId,schemeId) =>{
        const param=new FormData()
        param.append('holeId',holeId)
        param.append('schemeId',schemeId)
        const data = await Axios.post('/scanSchemeHole/deleteScanSchemeHoleByCond',param)
        if (data.code===0){
            
            this.fresh = !this.fresh
        }
        return data
    }


    /**
     * 条件分页查询方案下面扫描漏洞
     * @param param
     * @returns {Promise<void>}
     */
    @action
    findSchemeHolePage = async (param) =>{
        const data = await Axios.post('/scanHole/findSchemeHolePage',param)
        return data
    }

    /**
     * 条件分页查询没有添加的扫描漏洞
     * @param param
     * @returns {Promise<void>}
     */
    @action
    findNotScanHolePage = async (param) =>{
        const data = await Axios.post('/scanHole/findNotScanHolePage',param)
        return data
    }


}

const scanHoleStore=new ScanHoleStore()
export default  scanHoleStore
