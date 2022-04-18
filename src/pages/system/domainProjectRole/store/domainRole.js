/**
 * @name: domainRole
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：权限中心 项目域下的角色store
 * @update: 2021-05-06 15:19
 */
import { action, observable } from 'mobx';

export class DomainRoleStore {
    // 项目域下的角色数据
    @observable privilegeDomainRole = [];

    @action
    getDomainRoles = (data) => {
        this.privilegeDomainRole = data
    }

}
// 项目域下的角色store 常量
export const PRIVILEGE_DOMAIN_ROLE_STORE = 'privilegeDomainRoleStore';

