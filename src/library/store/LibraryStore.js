/**
 * @name: LibraryStore
 * @author: liminliang
 * @date: 2023-03-15 15:00
 * @description：制品store
 * @update: 2023-03-15 15:00
 */
import { observable, action } from "mobx";
import {Axios} from 'tiklab-core-ui';
import {data} from "autoprefixer";

export class LibraryStore{

    //制品版本详情
    @observable libraryVersionData=''
    //所有制品库
    @observable libraryFileList = []
    //制品list
    @observable libraryList=[]
    //maven制品相关 详情
    @observable libraryMavenData=''
    //服务起ip
    @observable serverIp=''


    /**
     * 通过制品版本id查询制品文件列表
     * @param  versionId 版本id
     */
    @action
    findLibraryVersion=async (versionId)=>{
        const param = new FormData()
        param.append('id',versionId)
        const res = await Axios.post("/libraryVersion/findLibraryVersion",param)
        if (res.code===0){
            this.libraryVersionData=res.data
        }
        return res;
    }
    /**
     * 条件查询制品列表
     * @param  data data
     */
    @action
    findLibraryList=async (data)=>{
        const res = await Axios.post("/library/findLibraryList",data)
        if (res.code===0){
            this.libraryList=res.data
        }
        return res;
    }

    /**
     * 制品库下面条件查询制品列表
     * @param  data data
     */
    @action
    findLibraryListByRepository=async (data)=>{
        const res = await Axios.post("/library/findLibraryListByRepository",data)
        if (res.code===0){
            this.libraryList=res.data
        }
        return res;
    }

    /**
     * 条件查询制品
     * @param  data data
     */
    @action
    findLibraryListByCondition=async (data)=>{
        const res = await Axios.post("/library/findLibraryListByCondition",data)
        if (res.code===0){
            this.libraryList=res.data
        }
        return res;
    }

    /**
     * 分页查询制品版本
     * @param  data data
     */
    @action
    findLibraryVersionPage=async (data)=>{
        const res = await Axios.post("/libraryVersion/findLibraryVersionPage",data)
        return res;
    }
    /**
     * 通过制品id查询最新的制品版本
     * @param  libraryId 制品id
     */
    @action
    findLibraryNewVersion=async (libraryId)=>{
        const param={
            libraryId: libraryId
        }
        const res = await Axios.post("/libraryVersion/findLibraryNewVersion",param)
        return res;
    }
    /**
     * 删除版本及相关的制品
     * @param  versionId 版本id
     */
    @action
    deleteVersionAndLibrary=async (versionId)=>{
        debugger
        const param=new FormData();
        param.append("id",versionId)
        const res = await Axios.post("/libraryVersion/deleteVersionAndLibrary",param)
        return res;
    }
    /**
     * 删除版本
     * @param  versionId 版本id
     */
    @action
    deleteLibraryVersion=async (versionId)=>{
        const param=new FormData();
        param.append("id",versionId)
        const res = await Axios.post("/libraryVersion/deleteLibraryVersion",param)
        return res;
    }

    /**
     * 通过制品版本id查询制品文件列表
     * @param  versionId 制品版本id
     */
    @action
    findLibraryFileList=async (versionId)=>{
        const param={
            libraryVersionId:versionId
        }
        const res = await Axios.post("/libraryFile/findLibraryFileList",param)
        if (res.code===0){
            this.libraryFileList=res.data
        }
    }

    /**
     * 查询最新的制品文件
     * @param  value
     */
    @action
    findLibraryNewFileList=async (value)=>{
        const res = await Axios.post("/libraryFile/findLibraryNewFileList",value)
        if (res.code===0){
            this.libraryFileList=res.data
        }
        return res;
    }

    /**
     * 查询制品maven 详情
     * @param  libraryId 制品id
     */
    @action
    findLibraryMaven=async (libraryId)=>{
        const param={
            libraryId:libraryId
        }
        const res = await Axios.post("/libraryMaven/findLibraryMavenList",param)
        if (res.code===0){
            this.libraryMavenData=res.data[0]
        }
    }

    /**
     * 获取服务器ip
     */
    @action
    findServerIp=async ()=>{
        const res = await Axios.post("/libraryFile/findServerIp")
        if (res.code===0){
            this.serverIp=res.data
        }
    }

}

let libraryStore=new LibraryStore()
export default libraryStore;
