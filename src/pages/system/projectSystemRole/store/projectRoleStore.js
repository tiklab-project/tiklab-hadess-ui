/**
 * @name: projectRoleStore
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：权限中心 项目域下的角色 store
 * @update: 2021-05-06 15:19
 */
import { action, observable } from 'mobx';

export class PrivilegeProjectRoleStore {
    // 项目域下的角色数据
    @observable privilegeProjectRole = [];

    @action
    getDomainRoles = (data) => {
        this.privilegeProjectRole = data
    }

}
// 项目域下的角色 store
export const PRIVILEGE_PROJECT_ROLE_STORE = 'privilegeProjectRoleStore';

