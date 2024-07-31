/**
 * @name: RepositoryTable
 * @date: 2023-05-22 14:30
 * @description：页面找不到
 * @update: 2023-05-22 14:30
 */
import React from "react";
import {NotFound} from "thoughtware-eam-ui";

const NotFoundContent = props =>{
    return <NotFound {...props}
                     homePath={'/library/maven'}
    />

}

export default NotFoundContent
