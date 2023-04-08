/**
 * @name: Organ
 * @author: limingliang
 * @date: 2022-05-21 16:51
 * @description：部门
 * @update: 2022-05-21 16:51
 */
import React from "react";
import { User} from 'tiklab-user-ui';
const OrgaUser = props => {
    return (
        <User{...props} bgroup={"xpack"}/>
    )
}

export default OrgaUser;
