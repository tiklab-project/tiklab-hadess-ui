/**
 * @name: PlugList
 * @author: limingliang
 * @date: 2022-10-20 14:48
 * @description：插件相关接口
 * @update: 2022-10-20 14:48
 */
import {Axios} from 'tiklab-core-ui';
import {findOrderPageApi} from "./order.service";


export const createArtifactApi = '/artifact/createArtifact'; //创建插件
export const updateArtifactApi = '/artifact/updateArtifact'; //修改插件
export const deleteArtifactApi = '/artifact/deleteArtifact';  //删除插件
export const findArtifactPageApi = '/artifact/findArtifactPage'; //通过条件分页查询插件
export const findArtifactApi = '/artifact/findArtifact';  //通过id查询插件
export const findNewArtifactPageApi = '/artifact/findNewArtifactPage';  //分页查询最新版本插件

export const createArtifactVersionApi = '/artifactVersion/createArtifactVersion'; //创建插件版本
export const findArtifactVersionApi = '/artifactVersion/findArtifactVersion';  //通过id查询
export const findArtifactVersionListApi = '/artifactVersion/findArtifactVersionList'; //条件查询插件版本
export const deleteArtifactVersionApi = '/artifactVersion/deleteArtifactVersion'; //删除插件版本
export const findArtifactVersionPageApi = '/artifactVersion/findArtifactVersionPage';  //条件分页查询插件版本
class PlugService {
    constructor() {
    }


    async createArtifact(data){
        const response = await Axios.post(createArtifactApi, data)
        return response
    }
    async updateArtifact(data){
        const response = await Axios.post(updateArtifactApi, data)
        return response
    }
    async deleteArtifact(data){
        const response = await Axios.post(deleteArtifactApi, data)
        return response
    }
    async findArtifactPag(data){
        const response = await Axios.post(findArtifactPageApi, data)
        return response
    }
    async updateArtifact(data){
        const response = await Axios.post(updateArtifactApi, data)
        return response
    }
    async findArtifact(data){
        const response = await Axios.post(findArtifactApi, data)
        return response
    }
    async findNewArtifactPage(data){
        const response = await Axios.post(findNewArtifactPageApi, data)
        return response
    }
    async createArtifactVersion(data){
        const response = await Axios.post(createArtifactVersionApi, data)
        return response
    }
    async findArtifactVersion(data){
        const response = await Axios.post(findArtifactVersionApi, data)
        return response
    }
    async findArtifactVersionList(data){
        const response = await Axios.post(findArtifactVersionListApi, data)
        return response
    }
    async deleteArtifactVersion(data){
        const response = await Axios.post(deleteArtifactVersionApi, data)
        return response
    }
    async findArtifactVersionPage(data){
        const response = await Axios.post(findArtifactVersionPageApi, data)
        return response
    }
}

const plugService=new PlugService();
export default plugService