/**
 * @name: PushCenterStore
 * @author: liminliang
 * @date: 2023-07-19 15:00
 * @description：推送中央仓库 store
 * @update: 2023-07-19 15:00
 */
import { observable, action } from "mobx";
import {Axios} from 'thoughtware-core-ui';
import {message} from "antd";
export class PushCenterStore{

    @observable
    pushLibraryList=[]

    @observable
    refresh=false

    /**
     * 推送
     * @param libraryId
     */
    @action
    pushCentralWare=async (pushLibraryId)=>{
        const param=new FormData()
        param.append("pushLibraryId",pushLibraryId)
        const res = await Axios.post("/pushLibrary/pushCentralWare",param)
        return res;
    }

    /**
     * 推送结果
     * @param libraryId
     */
    @action
    pushResult=async (repositoryId)=>{
        const param=new FormData()
        param.append("repositoryId",repositoryId)
        const res = await Axios.post("/pushLibrary/pushResult",param)
        return res;
    }


    /**
     * 条件查询推送的制品列表
     * @param repositoryId
     */
    @action
    findPushLibraryList=async (param)=>{
        const res = await Axios.post("/pushLibrary/findPushLibraryList", param)
        if (res.code===0){
            this.pushLibraryList=res.data
        }
        return res;
    }


    /**
     * 分页查询推送制品
     * @param repositoryId
     */
    @action
    findPushLibraryPage=async (param)=>{
        const res = await Axios.post("/pushLibrary/findPushLibraryPage", param)
        return res;
    }

    /**
     * 添加推送制品
     * @param value
     */
    @action
    createPushLibrary=async (param)=>{
        const res = await Axios.post("/pushLibrary/createPushLibrary", param)
        this.refresh=!this.refresh
        return res;
    }

    /**
     * 添加推送制品
     * @param value
     */
    @action
    deletePushLibrary=async (value)=>{
        const param=new FormData()
        param.append("id",value)
        const res = await Axios.post("/pushLibrary/deletePushLibrary", param)
        if (res.code===0){
            message.success("删除成功",1)
            this.refresh=!this.refresh
        }
        return res;
    }
}
const pushCenterStore=new PushCenterStore()
export default pushCenterStore
