/**
 * @name: systemCustomRole
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：系统角色(自)
 * @update: 2021-05-06 15:19
 */
import React from 'react';
import {inject, observer} from "mobx-react";
import PrivilegeSystemRole from "../systemRole/systemRole";
import {SYSTEM_ROLE_STORE} from "../systemRole/store/systemRoleStore";

const SystemCustomRole = props => {

    return(
        <div>
            <PrivilegeSystemRole {...props}/>
        </div>
    )
}

export default inject(SYSTEM_ROLE_STORE)(observer(SystemCustomRole));


