/**
 * @name: ScanRecordStore
 * @author: liminliang
 * @date: 2023-09-20 15:00
 * @description：扫描制品store
 * @update: 2023-09-20 15:00
 */

import { observable, action } from "mobx";
import {Axios} from 'tiklab-core-ui';
export class ScanRecordStore  {


    @observable
    scanRecordList=[]

    @observable
    scanRecord=''

    @observable
    recordFresh=false

    @observable
    tableType=''

    @action
    setTableType=async (value)=>{
        this.tableType=value
    }
    /**
     * 删除扫描记录
     * @param  id
     */
    @action
    deleteScanRecord=async (recordId)=>{
        const param=new FormData()
        param.append("id",recordId)
        const res = await Axios.post("/scanRecord/deleteScanRecord",param)
        this.recordFresh=!this.recordFresh
        return res;
    }

    /**
     * 通过group 删除记录
     * @param  id
     */
    @action
    deleteScanRecordByGroup=async (scanGroup)=>{
        const param=new FormData()
        param.append("scanGroup",scanGroup)
        const res = await Axios.post("/scanRecord/deleteScanRecordByGroup",param)
        this.recordFresh=!this.recordFresh
        return res;
    }


    /**
     * 条件分页查询扫描记录
     * @param  id
     */
    @action
    findScanRecordPage=async (param)=>{
        const res = await Axios.post("/scanRecord/findScanRecordPage",param)
        return res;
    }

    /**
     * 条件查询扫描记录
     * @param  id
     */
    @action
    findScanRecordList=async (param)=>{
        const res = await Axios.post("/scanRecord/findScanRecordList",param)
        return res;
    }

    /**
     * 通过id 查询扫描记录
     * @param  id
     */
    @action
    findScanRecord=async (value)=>{
        const param=new FormData()
        param.append("id",value)
        const res = await Axios.post("/scanRecord/findScanRecord",param)
        return res;
    }

    /**
     * 查询扫描计划的总报告
     * @param  id
     */
    @action
    findScanRecordByPlay=async (param)=>{
        const res = await Axios.post("/scanRecord/findScanRecordByPlay",param)
        if(res.code===0){
            this.scanRecordList=res.data
        }
        return res;
    }

    /**
     * 通过group 查询扫描结果
     * @param  id
     */
    @action
    findScanRecordByGroup=async (scanGroup)=>{
        const param=new FormData()
        param.append("scanGroup",scanGroup)
        const res = await Axios.post("/scanRecord/findScanRecordByGroup",param)
        if(res.code===0){
            this.scanRecord=res.data
        }
        return res;
    }


    /**
     * 条件查询有漏洞的扫描依赖树
     * @param  param
     */
    @action
    findHaveHoleRelyTreeList=async (scanGroup)=>{
        const param=new FormData()
        param.append("scanGroup",scanGroup)
        const res = await Axios.post("/scanRecord/findHaveHoleRelyTreeList",param)
        if(res.code===0){
            this.scanRecordList=res.data
        }
        return res;
    }


}
let scanLibraryStore=new ScanRecordStore()
export default scanLibraryStore;
