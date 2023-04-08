/**
 * @name: RepositoryStore
 * @author: liminliang
 * @date: 2023-03-15 15:00
 * @description：产品store
 * @update: 2023-03-15 15:00
 */
import { observable, action } from "mobx";
import {Axios} from 'tiklab-core-ui';
export class RepositoryStore{
    //所有制品库
    @observable repositoryAllList = [];
    //制品库list
    @observable repositoryList = [];
    //制品库数据
    @observable repositoryData=''
    /**
     * 查询所有制品库
     * @param value
     */
    @action
    findAllRepository=async ()=>{
        const res = await Axios.post("/repository/findAllRepository")
        if (res.code===0){
            this.repositoryAllList=res.data
        }
    }

    /**
     * 条件查询制品库
     * @param value
     */
    @action
    findRepositoryList=async (value)=>{
        const res = await Axios.post("/repository/findRepositoryList",value)
        if (res.code===0){
            this.repositoryList=res.data
        }
        return res
    }
    /**
     * 通过id查询制品库
     * @param value
     */
    @action
    findRepository=async (value)=>{
        const param=new FormData()
        param.append("id",value)
        const res = await Axios.post("/repository/findRepository",param)
        if (res.code===0){
            this.repositoryData=res.data
        }
        return res
    }
}
export const REPOSITORY_STORE = "repositoryStore";
