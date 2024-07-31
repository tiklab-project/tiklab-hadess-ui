import React from 'react';
import {NoAccess} from "thoughtware-privilege-ui";

/**
 * 没有资源访问权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const NoAccessContent = props =>{
    return (
        <NoAccess
            {...props}
            homePath={'/library/maven'} //传返回的页面路由参数
        />
    )
}

export default NoAccessContent
