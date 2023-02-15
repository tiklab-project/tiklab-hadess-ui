/**
 * @name: copy.service
 * @author: liminliang
 * @date: 2022-12-27 15:00
 * @description：制品库复制信息
 * @update: 2022-12-27 15:00
 */
import {Axios} from 'tiklab-core-ui';
export const createRepositoryClusterCfgApi = '/repositoryClusterCfg/createRepositoryClusterCfg';   //创建复制信息信息
export const updateRepositoryClusterCfgApi = '/repositoryClusterCfg/updateRepositoryClusterCfg';   //更新复制信息信息
export const deleteRepositoryClusterCfgApi = '/repositoryClusterCfg/deleteRepositoryClusterCfg';   //删除复制信息信息
export const findRepositoryClusterCfgListApi = '/repositoryClusterCfg/findRepositoryClusterCfgList';   //查询复制信息信息

class CopyService {
    constructor() {
    }
    async createRepositoryClusterCfg(data){
        const response = await Axios.post(createRepositoryClusterCfgApi,data)
        return response
    }
    async updateRepositoryClusterCfg(data){
        const response = await Axios.post(updateRepositoryClusterCfgApi,data)
        return response
    }
    async deleteRepositoryClusterCfg(data){
        const response = await Axios.post(deleteRepositoryClusterCfgApi,data)
        return response
    }
    async findRepositoryClusterCfgList(data){
        const response = await Axios.post(findRepositoryClusterCfgListApi,data)
        return response
    }


}

const copyService=new CopyService();
export default copyService