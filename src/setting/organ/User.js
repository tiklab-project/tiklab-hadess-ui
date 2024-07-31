/**
 * @name: Organ
 * @author: limingliang
 * @date: 2022-05-21 16:51
 * @description：部门
 * @update: 2022-05-21 16:51
 */
import React from "react";
import { User} from 'thoughtware-user-ui';
const OrgaUser = props => {
    return (
        <User{...props} bgroup={"hadess"}/>
    )
}

export default OrgaUser;
