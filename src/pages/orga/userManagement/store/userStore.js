/**
 * @name: userStore
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：组织中心 系统用户的store
 * @update: 2021-05-06 15:19
 */
import { action, observable } from 'mobx';

export class UserStore {
    // 系统用户数据
    @observable userData = [];


    @action
    getUserList = (data) => {
        this.userData = data
    }

    @action
    editUser = (data) => {
        this.userData = this.userData.map(item => {
            if (item.id === data.id) {
                return data
            } else {
                return item
            }
        })
    }
    @action
    addUser = (data) => {
        this.userData = this.userData.concat(data)
    }

    @action
    deleteUser = (id) => {
        this.userData = this.userData.filter(item => item.id !== id)
    }
}
// 系统用户的store 常量
export const USER_STORE = 'userStore';

