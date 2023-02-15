/**
 * @name: proxy.service
 * @author: liminliang
 * @date: 2022-12-27 15:00
 * @description：远程库代理信息
 * @update: 2022-12-27 15:00
 */
import {Axios} from 'tiklab-core-ui';
import {findLibraryVersionListApi} from "./library.service";
export const createRepositoryRemoteProxyApi = '/repositoryRemoteProxy/createRepositoryRemoteProxy';   //创建代理信息
export const updateRepositoryRemoteProxyApi = '/repositoryRemoteProxy/updateRepositoryRemoteProxy';   //更新代理信息
export const deleteRepositoryRemoteProxyApi = '/repositoryRemoteProxy/deleteRepositoryRemoteProxy';   //删除代理信息
export const findRepositoryRemoteProxyListApi = '/repositoryRemoteProxy/findRepositoryRemoteProxyList';   //条件查询代理信息

class ProxyService {
    constructor() {
    }
    async createRepositoryRemoteProxy(data){
        const response = await Axios.post(createRepositoryRemoteProxyApi,data)
        return response
    }
    async updateRepositoryRemoteProxy(data){
        const response = await Axios.post(updateRepositoryRemoteProxyApi,data)
        return response
    }
    async deleteRepositoryRemoteProxy(data){
        const response = await Axios.post(deleteRepositoryRemoteProxyApi,data)
        return response
    }
    async findRepositoryRemoteProxyList(data){
        const response = await Axios.post(findRepositoryRemoteProxyListApi,data)
        return response
    }

}

const proxyService=new ProxyService();
export default proxyService