/**
 * @name: LibraryApi
 * @author: liminliang
 * @date: 2022-12-29 15:00
 * @description：制品管理Api
 * @update: 2022-12-29 15:00
 */
import {Axios} from 'tiklab-core-ui';


export const findLibraryListApi = '/library/findLibraryList';   //条件查询制品
export const findLibraryListByCondition = '/library/findLibraryListByCondition';   //条件查询制品
export const deleteLibraryApi = '/library/deleteLibrary';   //制品删除

export const findLibraryVersionListApi = '/libraryVersion/findLibraryVersionList';   //条件查询制品版本
export const findLibraryVersionPageApi = '/libraryVersion/findLibraryVersionPage';   //分页查询版本
export const findLibraryNewVersionApi = '/libraryVersion/findLibraryNewVersion';   //查询最新版本
export const findLibraryVersionApi = '/libraryVersion/findLibraryVersion';   //通过id查询版本

export const findLibraryNewFileListApi = '/libraryFile/findLibraryNewFileList';   //查询最新版本的文件列表
export const findLibraryFileListApi = '/libraryFile/findLibraryFileList';   //条件查询制品文件
export const downloadSingleFileApi = '/libraryFile/downloadSingleFile';   //单个下载制品文件

export const findLibraryMavenListApi = '/libraryMaven/findLibraryMavenList';   //条件查询maven

class LibraryApi {
    constructor() {
    }
    async findLibraryList(data){
        const response = await Axios.post(findLibraryListApi,data)
        return response
    }

    async findLibraryListByCondition(data){
        const response = await Axios.post(findLibraryListByCondition,data)
        return response
    }
    async deleteLibrary(data){
        const response = await Axios.post(deleteLibraryApi,data)
        return response
    }
    async findLibraryVersionList(data){
        const response = await Axios.post(findLibraryVersionListApi,data)
        return response
    }
    async findLibraryNewVersion(data){
        const response = await Axios.post(findLibraryNewVersionApi,data)
        return response
    }
    async findLibraryVersion(data){
        const response = await Axios.post(findLibraryVersionApi,data)
        return response
    }
    async findLibraryVersionPage(data){
        const response = await Axios.post(findLibraryVersionPageApi,data)
        return response
    }
    async findLibraryNewFileList(data){
        const response = await Axios.post(findLibraryNewFileListApi,data)
        return response
    }
    async findLibraryFileList(data){
        const response = await Axios.post(findLibraryFileListApi,data)
        return response
    }
    async downloadSingleFile(data){
        const response = await Axios.get(downloadSingleFileApi,data)
        return response
    }
    async findLibraryMavenList(data){
        const response = await Axios.post(findLibraryMavenListApi,data)
        return response
    }
}
const libraryApi=new LibraryApi();
export default libraryApi
