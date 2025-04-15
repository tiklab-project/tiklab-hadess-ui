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
import {message} from 'antd';

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

    @observable libraryVersion=''
    //搜索的信息
    @observable searchMessage=''
    //仓库类型
    @observable libraryType='maven'
    //刷新
    @observable refresh=false

    //详情加载状态
    @observable detailsLoad=false
    //制品列表加载状态
    @observable libraryLoad=false
    //版本刷新
    @observable versionLoad=false

    @observable detailsType=''

    @observable page=1



    @action
    setRefresh=async (refresh)=>{
        this.refresh=refresh
    }

    //设置跳转制品详情类型
    @action
    setDetailsType=async (value)=>{
        this.detailsType=value
    }

    //添加搜索的信息
    @action
    setLibraryType=async (type)=>{
        this.libraryType=type
    }


    //添加搜索的信息
    @action
    setSearchName=async (type,value,page)=>{
        this.searchMessage=value
        this.libraryType=type
        this.page=page
    }

    @action
    setLibraryVersion=async (value)=>{
        this.libraryVersion=value
    }

    /**
     * 删除制品
     * @param  id 制品id
     */
    @action
    deleteLibrary=async (id)=>{
        const param = new FormData()
        param.append('id',id)

        const res = await Axios.post("/library/deleteLibrary",param)
        if (res.code===0){
            this.refresh=!this.refresh
        }
        return res;
    }


    /**
     * 通过制品版本id查询制品文件列表
     * @param  versionId 版本id
     */
    @action
    findLibraryVersion=async (versionId)=>{
        this.detailsLoad=false
        const param = new FormData()
        param.append('id',versionId)
        const res = await Axios.post("/libraryVersion/findLibraryVersion",param)

        if (res.code===0){
            this.libraryVersionData=res.data
        }
        this.detailsLoad=true
        return res;
    }

    /**
     * 条件查询制品列表
     * @param  data data
     */
    @action
    findVersionByLibraryId=async (libraryId,versionId)=>{
        this.detailsLoad=false
        const param = new FormData()
        param.append("libraryId",libraryId)
        if (versionId){
            param.append("versionId",versionId)
        }
        const res = await Axios.post("/libraryVersion/findVersionByLibraryId",param)
        if (res.code===0){
            this.libraryVersionData=res.data
        }
        this.detailsLoad=true
        return res;
    }


    /**
     * 查询未添加到推送中央仓表的制品
     * @param  versionId 制品版本id
     */
    @action
    findNotPushLibraryList=async (param)=>{

        const res = await Axios.post("/library/findNotPushLibraryList",param)

        if (res.code===0){
            this.libraryList=res.data
        }
        return res;
    }

    /**
     * 分页查询
     * @param  data data
     */
    @action
    findLibraryPage=async (data)=>{
        const res = await Axios.post("/library/findLibraryPage",data)
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
        this.libraryLoad=false
        const res = await Axios.post("/library/findLibraryListByRepository",data)
        if (res.code===0){
            this.libraryList=res.data
        }
        this.libraryLoad=true
        return res;
    }

    /**
     * 条件查询制品
     * @param  data data
     */
    @action
    findLibraryListByCond=async (data)=>{
        this.libraryLoad=false
        const res = await Axios.post("/library/findLibraryListByCond",data)
        if (res.code===0){
            this.libraryList=res.data
        }
        this.libraryLoad=true
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
     * 分页查询历史制品版本
     * @param  data data
     */
    @action
    findHistoryVersionPage=async (data)=>{
        const res = await Axios.post("/libraryVersion/findHistoryVersionPage",data)
        return res;
    }
    /**
     * 分页查询制品版本
     * @param  data data
     */
    @action
    findLibraryVersionList=async (data)=>{
        const res = await Axios.post("/libraryVersion/findLibraryVersionList",data)
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
     * 删除版本
     * @param  versionId 版本id
     */
    @action
    deleteVersion=async (versionId,type)=>{
        const param=new FormData();
        param.append("id",versionId)
        const res = await Axios.post("/libraryVersion/deleteVersion",param)
        if (res.code===0){
            if (type==='version'){
                this.versionLoad=!this.versionLoad
            }else {
                this.refresh=!this.refresh
            }
            message.success("删除成功")
        }
        return res;
    }

    /**
     * 根据时间搓和版本id 删除文件
     * @param  versionId 版本id
     */
    @action
    deleteSnapshotFile=async (versionId,snapshotVersion)=>{
        const param=new FormData();
        param.append("versionId",versionId)
        param.append("snapshotVersion",snapshotVersion)
        const res = await Axios.post("/libraryFile/deleteSnapshotFile",param)
        if (res.code===0){
            message.success("删除成功")
        }

        return res;
    }


    /**
     * 删除版本
     * @param  versionId 版本id
     */
    @action
    deleteLibraryVersion=async (versionId,libraryId)=>{
        const param=new FormData();
        param.append("versionId",versionId)
        param.append("libraryId",libraryId)
        const res = await Axios.post("/libraryVersion/deleteLibraryVersion",param)
        if (res.code===0){
            this.refresh=!this.refresh
            message.success("删除成功")
        }
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
        return res;
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
     * 读取制品文件内容
     * @param  value
     */
    @action
    readLibraryFileData=async (value)=>{
        const res = await Axios.post("/libraryFile/readLibraryFileData",value)
        if (res.code!==0) {
            message.error(res.msg)
        }
        return res;
    }

    /**
     * 获取镜像历史
     * @param  value
     */
    @action
    findDockerLayers=async (value)=>{
        const res = await Axios.post("/libraryFile/findDockerLayers",value)
        if (res.code!==0) {
            message.error(res.msg)
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
        const res = await Axios.post("/fileHand/findServerIp")
        if (res.code===0){
            this.serverIp=res.data
        }
    }

    /**
     * 手动推送制品
     */
    @action
    libraryHandPush=async (param)=>{
        const res = await Axios.post("/fileHand/libraryHandPush",param)
        return res
    }

    /**
     * 手动推送制品
     */
    @action
    findHandPushResult=async (repositoryId)=>{
        const param=new FormData()
        param.append("repositoryId",repositoryId)
        const res = await Axios.post("/fileHand/findHandPushResult",param)
        return res
    }


}

let libraryStore=new LibraryStore()
export default libraryStore;
