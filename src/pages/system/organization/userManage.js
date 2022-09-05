/**
 * @name: UserManage
 * @author: limingliang
 * @date: 2022-06-24 10:30
 * @description：用户管理
 * @update: 2022-06-24 10:30
 */
import React from "react";
import { UserList} from 'tiklab-user-ui';
const UserManage = props => {
    return (
        <UserList
            {...props}
        />
    )
}
export default UserManage;