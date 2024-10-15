import React from "react";
import {SystemRole} from "tiklab-privilege-ui";

/**
 * 系统权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HdessSystemRole = props =>{

    return <SystemRole {...props}   bgroup={'hadess'} isBase={true}/>

}

export default HdessSystemRole
