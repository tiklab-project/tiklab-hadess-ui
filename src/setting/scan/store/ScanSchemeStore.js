import {observable,action} from 'mobx';
import {Axios} from 'tiklab-core-ui';

export class ScanSchemeStore {
    // 刷新
    @observable
    fresh = false



    /**
     * 查询所有
     * @param id
     * @returns {Promise<void>}
     */
    @action
    findAllScanScheme = async () =>{
        const data = await Axios.post('/scanScheme/findAllScanScheme')
        return data
    }


    /**
     * 通过id 查询扫描方案
     * @param id
     * @returns {Promise<void>}
     */
    @action
    findScanScheme = async (id) =>{
        const param=new FormData(param);
        param.append('id',id)
        const data = await Axios.post('/scanScheme/findScanScheme',param)
        return data
    }

    /**
     * 条件查询扫描方案
     * @param param
     * @returns {Promise<void>}
     */
    @action
    findScanSchemeList = async (param) =>{
        const data = await Axios.post('/scanScheme/findScanSchemeList',param)
        return data
    }

    /**
     * 分页查询扫描方案
     * @param param
     * @returns {Promise<void>}
     */
    @action
    findScanSchemePage = async (param) =>{
        const data = await Axios.post('/scanScheme/findScanSchemePage',param)
        return data
    }

    /**
     * 创建扫描方案
     * @param param
     * @returns {Promise<void>}
     */
    @action
    createScanScheme = async (param) =>{
        const data = await Axios.post('/scanScheme/createScanScheme',param)
        if (data.code===0){
            this.fresh = !this.fresh
        }
        return data
    }

    /**
     * 删除扫描方案
     * @param id
     * @returns {Promise<void>}
     */
    @action
    deleteScanScheme = async (id) =>{
        const param=new FormData()
        param.append("id",id)
        const data = await Axios.post('/scanScheme/deleteScanScheme',param)
        if (data.code===0){
            this.fresh = !this.fresh
        }
    }
}

const scanSchemeStore=new ScanSchemeStore()
export default  scanSchemeStore
