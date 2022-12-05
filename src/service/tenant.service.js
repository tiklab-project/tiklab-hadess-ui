/**
 * @name: tenant.service
 * @author: limingliang
 * @date: 2022-05-16 15:17
 * @description：tenant.service
 */

import {Axios} from 'tiklab-core-ui';

export const findTenantMember = '/tenantMember/findTenantMemberList';  // 根据查询对象查询租户成员
export const findTenantListPageApi = '/tenant/findTenantListPage';  // 根据查询对象分页查询租户列表
export const updateTenantApi = '/tenant/updateTenant';  // 更新租户
export const recoverDataApi = '/tenant/recoverData';  // 恢复租户数据


export const findTenantDatabaseListApi = '/tenantDatabase/findTenantDatabaseList';  // 根据查询对象查询租户数据源对应表
export const findTenantDatabaseByDbApi = '/tenantDatabase/findTenantDatabaseByDb';
export const updateTenantDatabaseApi = '/tenantDatabase/updateTenantDatabase';  //修改
export const updateTenantDatabaseByIdsApi = '/tenantDatabase/updateTenantDatabaseByIds';  //批量修改租户的db数据源

export const findAllTenantDbGroupApi = '/tenantDbGroup/findAllTenantDbGroup';  // 查询所有的db数据源
export const findTenantDbGroupApi = '/tenantDbGroup/findTenantDbGroup';  // 通过id 查询数据源
export const findTenantDbGroupListApi = '/tenantDbGroup/findTenantDbGroupList';  // 条件查询db数据源
export const createTenantDbGroupApi = '/tenantDbGroup/createTenantDbGroup';  // 创建db数据源
export const updateTenantDbGroupApi = '/tenantDbGroup/updateTenantDbGroup';  // 修改db数据源
export const deleteTenantDbGroupApi = '/tenantDbGroup/deleteTenantDbGroup';  //删除数据源


export const findAllTenantDsGroupApi = '/tenantDsGroup/findAllTenantDsGroup';  //查询所有dss数据源
export const findTenantDsGroupApi = '/tenantDsGroup/findTenantDsGroup';  //通过id查询dss数据源详情
export const findTenantDsGroupListApi = '/tenantDsGroup/findTenantDsGroupList';  //条件查询dss数据源
export const deleteTenantDsGroupApi = '/tenantDsGroup/deleteTenantDsGroup';  //删除dss数据源
export const updateTenantDsGroupApi = '/tenantDsGroup/updateTenantDsGroup';  //修改dss数据源
export const createTenantDsGroupApi = '/tenantDsGroup/createTenantDsGroup';  //创建dss数据源


export const findTenantDssByConApi = '/tenantDss/findTenantDssByCon';
export const findTenantDssListApi = '/tenantDss/findTenantDssList';   //条件查询
export const updateTenantDssApi = '/tenantDss/updateTenantDss';   //修改租户dss数据源
export const updateTenantDssByIdsApi = '/tenantDss/updateTenantDssByIds';   //批量修改租户dss数据源

export const findTenantDfsByConApi = '/tenantDfs/findTenantDfsByCon';
export const findTenantDcsByConApi = '/tenantDcs/findTenantDcsByCon';
class TenantService {
    constructor() {
    }


    async findTenantListPage(params){
        const res = await Axios.post(findTenantListPageApi, params)
        return res
    }


    async updateTenantService(params){
        const res = await Axios.post(updateTenantApi, params)
        return res
    }

    async recoverData(params){
        const res = await Axios.post(recoverDataApi, params)
        return res
    }

    async findTenantMemberService(params){
        const res = await Axios.post(findTenantMember, params)
        return res
    }
    async findAllTenantDbGroup(){
        const res = await Axios.post(findAllTenantDbGroupApi)
        return res
    }
    async findTenantDbGroup(params){
        const res = await Axios.post(findTenantDbGroupApi,params)
        return res
    }
    async findTenantDbGroupList(params){
        const res = await Axios.post(findTenantDbGroupListApi,params)
        return res
    }
    async findTenantDatabaseList(params){
        const res = await Axios.post(findTenantDatabaseListApi,params)
        return res
    }
    async findTenantDatabaseByDb(params){
        const res = await Axios.post(findTenantDatabaseByDbApi,params)
        return res
    }

    async createTenantDbGroup(params){
        const res = await Axios.post(createTenantDbGroupApi,params)
        return res
    }
    async updateTenantDatabase(params){

        const res = await Axios.post(updateTenantDatabaseApi,params)
        return res
    }
    async deleteTenantDbGroup(params){
        const res = await Axios.post(deleteTenantDbGroupApi,params)
        return res
    }
    async updateTenantDbGroup(params){
        const res = await Axios.post(updateTenantDbGroupApi,params)
        return res
    }

    async findAllTenantDssGroup(params){
        const res = await Axios.post(findAllTenantDsGroupApi,params)
        return res
    }

    async findTenantDsGroup(params){
        const res = await Axios.post(findTenantDsGroupApi,params)
        return res
    }

    async findTenantDsGroupList(params){
        const res = await Axios.post(findTenantDsGroupListApi,params)
        return res
    }
    async deleteTenantDssGroup(params){
        const res = await Axios.post(deleteTenantDsGroupApi,params)
        return res
    }
    async updateTenantDssGroup(params){
        const res = await Axios.post(updateTenantDsGroupApi,params)
        return res
    }
    async createTenantDssGroup(params){
        const res = await Axios.post(createTenantDsGroupApi,params)
        return res
    }
    async updateTenantDatabaseByIds(params){
        const res = await Axios.post(updateTenantDatabaseByIdsApi,params)
        return res
    }
    async updateTenantDssByIds(params){
        const res = await Axios.post(updateTenantDssByIdsApi,params)
        return res
    }

    async findTenantDssByCon(params){
        const res = await Axios.post(findTenantDssByConApi,params)
        return res
    }
    async updateTenantDss(params){
        const res = await Axios.post(updateTenantDssApi,params)
        return res
    }
    async findTenantDssList(params){
        const res = await Axios.post(findTenantDssListApi,params)
        return res
    }

    async findTenantDfsByCon(params){
        const res = await Axios.post(findTenantDfsByConApi,params)
        return res
    }
    async findTenantDcsByCon(params){
        const res = await Axios.post(findTenantDcsByConApi,params)
        return res
    }

}
const tenantService = new TenantService()
export default tenantService

