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

}
const userService = new UserService()
export default userService
