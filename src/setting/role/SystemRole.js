
import React from "react";
import {SystemRole} from "tiklab-privilege-ui";
import { inject, observer } from "mobx-react";
const SystemRoleWrap = props => {
    return (
            <SystemRole
                {...props}
                bgroup={'hadess'}
            />
    )
}
export default inject("systemRoleStore")(observer(SystemRoleWrap));
