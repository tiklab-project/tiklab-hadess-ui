/**
 * @name: PushGroupStore
 * @author: liminliang
 * @date:  2024-01-24 15:00
 * @description：推送组
 * @update: 2024-01-24 15:00
 */
import { observable, action } from "mobx";
import {Axios} from 'thoughtware-core-ui';
import {message} from "antd";
export class PushGroupStore{


    @observable
    refresh=false

    @observable pushGroup=''

    /**
     * 创建推送组
     * @param param
     */
    @action
    createPushGroup=async (param)=>{
        const res = await Axios.post("/pushGroup/createPushGroup",param)
        if (res.code===0){
            this.refresh=!this.refresh
        }
        return res;
    }

    /**
     * 更新推送组
     * @param param
     */
    @action
    updatePushGroup=async (param)=>{
        const res = await Axios.post("/pushGroup/updatePushGroup",param)
        if (res.code===0){
            this.refresh=!this.refresh
        }
        return res;
    }

    /**
     * 删除推送组
     * @param param
     */
    @action
    deletePushGroup=async (id)=>{
        const param=new FormData()
        param.append("id",id)
        const res = await Axios.post("/pushGroup/deletePushGroup",param)
        if (res.code===0){
            this.refresh=!this.refresh
        }
        return res;
    }

    /**
     * 通过id 查询仓库组
     * @param param
     */
    @action
    findPushGroup=async (id)=>{
        const param=new FormData();
        param.append("id",id)
        const res = await Axios.post("/pushGroup/findPushGroup",param)
        if (res.code===0){
            this.pushGroup=res.data
        }
        return res;
    }

    /**
     * 条件查询推送组
     * @param param
     */
    @action
    findPushGroupList=async (param)=>{
        const res = await Axios.post("/pushGroup/findPushGroupList",param)
        return res;
    }

    /**
     * 条件查询推送组
     * @param param
     */
    @action
    findPushGroupList=async (param)=>{
        const res = await Axios.post("/pushGroup/findPushGroupList",param)
        return res;
    }



}
const pushGroupStore=new PushGroupStore()
export default pushGroupStore
