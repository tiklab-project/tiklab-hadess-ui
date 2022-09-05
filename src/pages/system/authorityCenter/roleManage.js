/**
 * @name: RoleManage
 * @author: limingliang
 * @date: 2022-06-24 10:30
 * @description：角色管理
 * @update: 2022-06-24 10:30
 */
import React from 'react'
import { SystemRoleList} from 'tiklab-privilege-ui';
const RoleManage = props => {

    return(
        <SystemRoleList
            {...props}
            group={'system'}
        />
    )
}
export default RoleManage