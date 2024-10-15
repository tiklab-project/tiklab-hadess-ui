/**
 * @name: PushOperationStore
 * @author: liminliang
 * @date:  2024-01-24 15:00
 * @description：执行推送
 * @update: 2024-01-24 15:00
 */
import { observable, action } from "mobx";
import {Axios} from 'tiklab-core-ui';
import {message} from "antd";
export class PushOperationStore{


    @observable
    refresh=false

    /**
     * 执行推送组
     * @param param
     */
    @action
    executePushGroup=async (param)=>{
        const res = await Axios.post("/pushOperation/executePushGroup",param)
        if (res.code===0){
            this.refresh=!this.refresh
        }
        return res;
    }

    /**
     * 执行推送制品
     * @param param
     */
    @action
    executePushLibrary=async (param)=>{
        const res = await Axios.post("/pushOperation/executePushLibrary",param)
        if (res.code===0){
            this.refresh=!this.refresh
        }
        return res;
    }

    /**
     * 获取结果
     * @param param
     */
    @action
    getPushResult=async (value)=>{
        const param=new FormData()
        param.append("key",value)
        const res = await Axios.post("/pushOperation/getPushResult",param)
        if (res.code===0){
            this.refresh=!this.refresh
        }
        return res;
    }

}
const pushOperationStore=new PushOperationStore()
export default pushOperationStore
