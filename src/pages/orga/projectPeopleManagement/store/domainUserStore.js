/**
 * @name: domainUserStore
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：组织中心项目域的用户store
 * @update: 2021-05-06 15:19
 */
import { action, observable } from 'mobx';

export class DomainUserStore {
    // 项目域的用户数据
    @observable privilegeDomainUsers = [];

    @action
    getDomainUser = (data) => {
        this.privilegeDomainUsers = data
    }

    @action
    deleteDomainUser = (id) => {
        this.privilegeDomainUsers = this.privilegeDomainUsers.filter(item => item.id !== id)
    }
}
// 项目域的用户 store 常量
export const DOMAIN_USER_STORE = 'domainUserStore';

