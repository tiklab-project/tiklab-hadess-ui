/**
 * @name: ScanLibraryStore
 * @author: liminliang
 * @date: 2023-09-20 15:00
 * @description：扫描制品store
 * @update: 2023-09-20 15:00
 */

import { observable, action } from "mobx";
import {Axios} from 'tiklab-core-ui';
export class ScanLibraryStore  {

    //扫描制品列表
    @observable scanLibraryList=[]

    //扫描制品
    @observable scanLibrary=''

    @observable
    refresh=false

    /**
     * 创建扫描制品
     * @param  id
     */
    @action
    createScanLibrary=async (param)=>{
        const res = await Axios.post("/scanLibrary/createScanLibrary",param)
        this.refresh=!this.refresh
        return res;
    }

    /**
     * 执行制品扫描
     */
    @action
    execScan=async (scanPlayId)=>{
        const param=new FormData()
        param.append("scanPlayId",scanPlayId)
        const res = await Axios.post("/scan/execScan",param)
        return res;
    }

    /**
     * 查询扫描结果
     */
    @action
    findExecResult=async (scanPlayId)=>{
        const param=new FormData()
        param.append("scanPlayId",scanPlayId)
        const res = await Axios.post("/scan/findExecResult",param)
        return res;
    }

    /**
     * 条件分页查询扫描
     * @param  libraryId 制品id
     */
    @action
    findScanLibraryPage=async (param)=>{
        const res = await Axios.post("/scanLibrary/findScanLibraryPage",param)
        return res;
    }

    /**
     * 删除制品扫描
     * @param  libraryId 制品id
     */
    @action
    deleteScanLibrary=async (libraryId)=>{
        const param=new FormData();
        param.append("id",libraryId)
        const res = await Axios.post("/scanLibrary/deleteScanLibrary",param)
        return res;
    }

    /**
     * 查询未添加到扫描的制品
     * @param  versionId 制品版本id
     */
    @action
    findNotScanLibraryList=async (param)=>{
        const res = await Axios.post("/scanLibrary/findNotScanLibraryList",param)
        return res;
    }

}
let scanLibraryStore=new ScanLibraryStore()
export default scanLibraryStore;
