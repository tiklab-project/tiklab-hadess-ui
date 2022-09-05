/**
 * @name: systemRole
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：系统角色的store
 * @update: 2021-05-06 15:19
 */
import { action, observable } from 'mobx';
import {Axios} from 'tiklab-core-ui';

export class SystemRoleStore {
    // 系统权限角色
    @observable privilegeSystemRole = [];
    // 系统权限字段
    @observable systemPermissions = [];
    // 项目域权限字段
    @observable domainPermissions = {};
    @action
    getRoles = (data) => {
        this.privilegeSystemRole = data
    }

    @action
    clearAllPermissions = () => {
        this.systemPermissions = []
        this.domainPermissions = {}
    }

    @action
    getInitProjectPermissions = (userId, domainId) => {
        if (!this.domainPermissions[domainId] && userId && domainId ) {
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('domainId', domainId)
            return Axios.post('prjPermission/findPrjPermissions', formData, match.params.tenant).then(res => {
                if (!res.code) {
                    this.domainPermissions[domainId] = res.data
                }
                return res
            })
        }
    }

    @action
    getSystemPermissions = (userId) => {
        const formData = new FormData();
        formData.append('userId', userId)
        return Axios.post( 'permission/findPermissions', formData, match.params.tenant).then(res => {
            if (!res.code) {
                this.systemPermissions = res.data
            }
            return res
        })

    }


}
// 系统角色的store 常量
export const SYSTEM_ROLE_STORE = 'systemRoleStore';

