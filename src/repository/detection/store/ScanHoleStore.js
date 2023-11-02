/**
 * @name: ScanHoleStore
 * @author: liminliang
 * @date: 2023-09-20 15:00
 * @description：漏洞store
 * @update: 2023-09-20 15:00
 */

import { observable, action } from "mobx";
import {Axios} from 'tiklab-core-ui';
import {message} from 'antd';
export class ScanHoleStore  {

    //漏洞list
    @observable holeList=[]

    //漏洞
    @observable hole=''


    /**
     * 条件查询漏洞
     * @param  param
     */
    @action
    findScanHoleList=async (param)=>{
        const res = await Axios.post("/scanHole/findScanHoleList",param)

        if (res.code===0){
            this.holeList=res.data
        }
        return res;
    }


}
let scanHoleStore=new ScanHoleStore()
export default scanHoleStore;
