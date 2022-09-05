/**
 * @name: OrgaManage
 * @author: limingliang
 * @date: 2022-06-24 10:30
 * @description：组织管理
 * @update: 2022-06-24 10:30
 */
import React from "react";
import {OrgaList} from 'tiklab-user-ui';
const OrgaManage = props => {

    return(
        <OrgaList
            {...props}
        />

    )
}
export default OrgaManage;