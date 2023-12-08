/**
 * @name: ScanRelyStore
 * @author: liminliang
 * @date: 2023-09-20 15:00
 * @description：扫描依赖store
 * @update: 2023-09-20 15:00
 */

import { observable, action } from "mobx";
import {Axios} from 'tiklab-core-ui';
import {message} from 'antd';
export class ScanRelyStore  {

    //扫描制品依赖列表
    @observable scanRelyList=[]



    /**
     * 条件查询有漏洞的扫描依赖树
     * @param  param
     */
    @action
    findHaveHoleRelyTreeList=async (scanGroup)=>{
        const param=new FormData()
        param.append("scanGroup",scanGroup)
        const res = await Axios.post("/scanRely/findHaveHoleRelyTreeList",param)
        if (res.code===0){
            this.scanRelyList=res.data
        }
        return res;
    }


    /**
     * 条件查询扫描依赖树
     * @param  param
     */
    @action
    findScanRelyTreeList=async (param)=>{
        const res = await Axios.post("/scanRely/findScanRelyTreeList",param)

        if (res.code===0){
            this.scanRelyList=res.data
        }
        return res;
    }

    /**
     * 分页查询扫描依赖
     * @param  param
     */
    @action
    findScanRelyPage=async (param)=>{
        const res = await Axios.post("/scanRely/findScanRelyPage",param)

        return res;
    }

}
let scanRelyStore=new ScanRelyStore()
export default scanRelyStore;
