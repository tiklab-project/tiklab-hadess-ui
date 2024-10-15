/**
 * @name: RepositoryStore
 * @author: liminliang
 * @date: 2023-03-15 15:00
 * @description：产品store
 * @update: 2023-03-15 15:00
 */
import { observable, action } from "mobx";
import {Axios} from 'tiklab-core-ui';
import {message} from 'antd';
export class RepositoryStore{
    //所有制品库
    @observable repositoryAllList = [];
    //制品库list
    @observable repositoryList = [];
    //制品库数据
    @observable repositoryData=''
    //创建制品库id
    @observable repositoryId=''
    //制品库类型 local、remote、group
    @observable addRepositoryType=''

    @observable repositoryMavenList=[]

    //导航等级
    @observable navLevel=1

    @action
    setNavLevel = value =>{
        this.navLevel = value
    }

    /**
     * 创建制品库
     * @param value
     */
    @action
    createRepository=async (value)=>{
        this.addRepositoryType=value.repositoryType
        const res = await Axios.post("/xpackRepository/createRepository",value)
        if (res.code===0){
            this.repositoryId=res.data
        }
        return res;
    }

    /**
     * 更新制品库
     * @param value
     */
    @action
    updateRepository=async (param)=>{
        const res = await Axios.post("/xpackRepository/updateRepository",param)
       /* if (res.code===0){
            message.success("更新成功",1)
        }*/
        return res
    }

    /**
     * 删除制品库
     * @param value
     */
    @action
    deleteRepository=async (value)=>{
        const param = new FormData();
        param.append('id',value)
        const res = await Axios.post("/xpackRepository/deleteRepository",param)
        return res
    }

    /**
     * 查询所有制品库
     * @param value
     */
    @action
    findAllRepository=async ()=>{
        const res = await Axios.post("/xpackRepository/findAllRepository")
        if (res.code===0){
            this.repositoryAllList=res.data
        }
        return res;
    }

    /**
     * 通过类型查询制品库
     * @param value
     */
    @action
    findRepositoryList=async (param)=>{
        const res = await Axios.post("/xpackRepository/findRepositoryList",param)
        if (res.code===0){
            this.repositoryList=res.data
        }
        return res
    }

    /**
     * 分页查询制品库通过类型查询制品库
     * @param value
     */
    @action
    findRepositoryPage=async (param)=>{
        const res = await Axios.post("/xpackRepository/findRepositoryPage",param)
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
        const res = await Axios.post("/xpackRepository/findRepository",param)
        if (res.code===0){
            this.repositoryData=res.data
        }
        return res
    }

    /**
     * 根据组合库查询相关联的制品库
     * @param value 组合制品库id
     */
    @action
    findRepositoryByGroup=async (value)=>{
        const param = new FormData();
        param.append("repositoryGroupId",value)
        const res = await Axios.post("/xpackRepository/findRepositoryByGroup",param)

        return res
    }


    /**
     * 查询未关联组合库的本地和远程库list
     * @param value 组合制品库id
     */
    @action
    findUnRelevanceRepository=async (type,repositoryGroupId)=>{
        const param = new FormData()
        param.append("repositoryType",type)
        param.append("repositoryGroupId",repositoryGroupId)
        const res = await Axios.post("/xpackRepository/findUnRelevanceRepository",param)
        return res
    }
    /**
     * 查询本地、远程制品库
     * @param value 组合制品库id
     */
    @action
    findLocalAndRemoteRepository=async (value)=>{
        const param = new FormData()
        param.append("type",value)
        const res = await Axios.post("/xpackRepository/findLocalAndRemoteRepository",param)

        return res
    }

    /**
     * 创建组合库的关联
     * @param param
     */
    @action
    createRepositoryGroup=async (param)=>{
        const res = await Axios.post("/repositoryGroup/createRepositoryGroup",param)
        return res
    }

    /**
     * 创建maven制品库
     * @param value
     */
    @action
    createRepositoryMaven=async (value)=>{
        const res = await Axios.post("/repositoryMaven/createRepositoryMaven",value)
        if (res.code===0){
            message.success("创建成功",1)
        }
    }

    /**
     * 更新maven制品库
     * @param value
     */
    @action
    updateRepositoryMaven=async (value)=>{
        const res = await Axios.post("/repositoryMaven/updateRepositoryMaven",value)
        if (res.code===0){
            message.success("更新成功",1)
        }
    }
    /**
     * 通过仓库id
     * @param value
     */
    @action
    findRepositoryMavenByRpyId=async (value)=>{
        const res = await Axios.post("/repositoryMaven/findRepositoryMavenList",value)
        if (res.code===0){
            this.repositoryMavenList=res.data
        }
        return res
    }

    /**
     * 修改组合库的关联库
     * @param value
     */
    @action
    compileRepositoryGroup=async (value)=>{
        const res = await Axios.post("/repositoryGroup/compileRepositoryGroup",value)
    }

    @action
    setRepositoryTypeNull=async ()=>{
        this.addRepositoryType=""
    }

    /**
     * 通过条件查询仓库的代理
     * @param value
     */
    @action
    findRepositoryRemoteProxyList=async (value)=>{
        const res = await Axios.post("/repositoryRemoteProxy/findRepositoryRemoteProxyList",value)
        return res
    }
    /**
     * 创建仓库的代理
     * @param value
     */
    @action
    createRepositoryRemoteProxy=async (value)=>{
        const res = await Axios.post("/repositoryRemoteProxy/createRepositoryRemoteProxy",value)
        return res
    }

    /**
     * 更新仓库的代理
     * @param value
     */
    @action
    updateRepositoryRemoteProxy=async (value)=>{
        const res = await Axios.post("/repositoryRemoteProxy/updateRepositoryRemoteProxy",value)
        return res
    }

}

export const REPOSITORY_STORE = "repositoryStore";
