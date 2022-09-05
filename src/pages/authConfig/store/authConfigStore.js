/**
 * @name: authenticationStore
 * @author: mahai
 * @date: 2021-06-23 13:15
 * @description：authenticationStore
 * @update: 2021-06-23 13:15
 */
import { action, observable } from 'mobx';
import {Axios} from "tiklab-core-ui";

export class AuthConfigStore{
    @observable authentication = JSON.parse(localStorage.getItem('authConfig')) || {};

    @action
    getFindAuthConfig = async (tenant) => {
        const data = await Axios.post('/authConfig/getAuthConfig', {} , tenant)
        if (!data.code) {
            this.authentication = data.data
            localStorage.setItem('authConfig', JSON.stringify(this.authentication))
        }
    }
    @action
    updateConfigList= data => {
        this.authentication = data
        localStorage.setItem('authConfig', JSON.stringify(this.authentication))
    }

}
// 系统用户的store 常量
export const AUTH_CONFIG_STORE = 'authConfigStore';
