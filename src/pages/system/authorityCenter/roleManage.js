/**
 * @name: RoleManage
 * @author: limingliang
 * @date: 2022-06-24 10:30
 * @description：角色管理
 * @update: 2022-06-24 10:30
 */
import React from 'react'
import { RoleList } from 'doublekit-privilege-ui';
const RoleManage = props => {

    return(
        <RoleList
            {...props}
            group={'system'}
        />
    )
}
export default RoleManage