/**
 * @name: OrgaManage
 * @author: limingliang
 * @date: 2022-06-24 10:30
 * @description：组织管理
 * @update: 2022-06-24 10:30
 */
import React from "react";
import { observer, inject} from "mobx-react"
import { OrgList, ORG_STORE} from 'doublekit-user-ui';
const OrgaManage = props => {

    return(
        <OrgList
            {...props}
        />

    )
}
export default inject(ORG_STORE)(observer(OrgaManage)) ;