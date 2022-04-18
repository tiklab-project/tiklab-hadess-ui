/**
 * @name: user.service
 * @author: mahai
 * @date: 2021-07-12 15:17
 * @description：user.service
 * @update: 2021-07-12 15:17
 */
import {Axios} from 'doublekit-core-ui';
export const loginApi = '/passport/login';
export const logoutApi = '/passport/logout';
export const registerApi = '/member/registeMember'; // 注册会员
export const createTenantApi = '/tenant/createTenant'; // 创建租户
export const tenantUserApi = '/tenant/findTenantList';  // 根据查询对象查询租户列表
export const findTenantMember = '/tenantMember/findTenantMemberList';  // 根据查询对象查询租户成员

export const findTenantListPageApi = '/tenant/findTenantListPage';  // 根据查询对象分页查询租户列表

export const updateTenantApi = '/tenant/updateTenant';  // 更新租户
export const findAllTenantApi = '/tenant/findAllTenant';  // 查找所有租户
export const deleteTenantUserApi = '/tenant/deleteTenant';  // 根据租户ID删除租户

export const tmcLoginApi = '/tmc/passport/login';  // TMC 登录
export const tmcLogoutApi = '/tmc/passport/logout';  // TMC 退出

class UserService {
    constructor() {
    }

    async loginService(data){
        const user = await Axios.post(loginApi, data)
        return user
    }
    async tmcLoginService(data){
        const user = await Axios.post(tmcLoginApi, data)
        return user
    }
    async logOutService(params){
        const res = await Axios.post(logoutApi, params)
        return res
    }
    async tmcLogOutService(params){
        const res = await Axios.post(tmcLogoutApi, params)
        return res
    }
    async registerService(params){
        const res = await Axios.post(registerApi, params)
        return res
    }
    async createTenantService(params){
        const res = await Axios.post(createTenantApi, params)
        return res
    }
    async tenantUsersService(params){
        const res = await Axios.post(tenantUserApi, params)
        return res
    }
    async findAllTenantService(){
        const res = await Axios.post(findAllTenantApi)
        return res
    }

    async findTenantListPage(params){
        const res = await Axios.post(findTenantListPageApi, params)
        return res
    }


    async updateTenantService(params){
        const res = await Axios.post(updateTenantApi, params)
        return res
    }
    async deleteTenantUsersService(params){
        const res = await Axios.post(deleteTenantUserApi, params)
        return res
    }
    async findTenantMemberService(params){
        const res = await Axios.post(findTenantMember, params)
        return res
    }
}
const userService = new UserService()
export default userService
