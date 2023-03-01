/**
 * @name: repositoryApi
 * @author: liminliang
 * @date: 2022-12-27 15:00
 * @description：制品库管理
 * @update: 2022-12-27 15:00
 */
import {Axios} from 'tiklab-core-ui';

export const findAllStorageApi = '/storage/findAllStorage';   //查询所有存储库

export const findAllRepositoryApi = '/repository/findAllRepository';   //查询所有制品库
export const findRepositoryApi = '/repository/findRepository';   //通过id查询制品库
export const createRepositoryApi = '/repository/createRepository';   //创建制品库
export const updateRepositoryApi = '/repository/updateRepository';   //更新制品库
export const findRepositoryPageApi = '/repository/findRepositoryPage';   //分页查询制品库
export const findRepositoryListApi = '/repository/findRepositoryList';   //查询制品库
export const deleteRepositoryApi = '/repository/deleteRepository';   //删除制品库
export const findLocalAndRemoteRepositoryApi = '/repository/findLocalAndRemoteRepository';   //查询本地和远程的制品库
export const findUnRelevanceRepositoryApi = '/repository/findUnRelevanceRepository';   //查询未关联组合库的本地和远程库list
export const findRepositoryByGroupApi = '/repository/findRepositoryByGroup';   //根据组合库查询相关联的制品库

export const createRepositoryGroupApi = '/repositoryGroup/createRepositoryGroup';   //创建组合库的关联
export const findRepositoryGroupListApi = '/repositoryGroup/findRepositoryGroupList';   //条件查询组合库
export const compileRepositoryGroupApi = '/repositoryGroup/compileRepositoryGroup';   //条件编辑组合库关联关系

class RepositoryApi {
    constructor() {
    }

    async findAllStorage(){
        const response = await Axios.post(findAllStorageApi)
        return response
    }
    async findRepository(data){
        const response = await Axios.post(findRepositoryApi,data)
        return response
    }
    async updateRepository(data){
        const response = await Axios.post(updateRepositoryApi,data)
        return response
    }
    async findAllRepository(data){
        const response = await Axios.post(findAllRepositoryApi,data)
        return response
    }
    async createRepository(data){
        const response = await Axios.post(createRepositoryApi,data)
        return response
    }
    async findRepositoryPage(data){
        const response = await Axios.post(findRepositoryPageApi,data)
        return response
    }
    async findRepositoryList(data){
        const response = await Axios.post(findRepositoryListApi,data)
        return response
    }
    async deleteRepository(data){
        const response = await Axios.post(deleteRepositoryApi,data)
        return response
    }

    async findRepositoryByGroup(data){
        const response = await Axios.post(findRepositoryByGroupApi,data)
        return response
    }
    async findLocalAndRemoteRepository(data){
        const response = await Axios.post(findLocalAndRemoteRepositoryApi,data)
        return response
    }
    async findUnRelevanceRepository(data){
        const response = await Axios.post(findUnRelevanceRepositoryApi,data)
        return response
    }

    async createRepositoryGroup(data){
        const response = await Axios.post(createRepositoryGroupApi,data)
        return response
    }
    async findRepositoryGroupList(data){
        const response = await Axios.post(findRepositoryGroupListApi,data)
        return response
    }
    async compileRepositoryGroup(data){
        const response = await Axios.post(compileRepositoryGroupApi,data)
        return response
    }
}
const repositoryApi=new RepositoryApi();
export default repositoryApi
