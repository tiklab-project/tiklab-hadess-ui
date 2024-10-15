import React from 'react';
import {Login} from "tiklab-eam-ui";


const LoginXpack  = props => {
    return (
        <Login {...props}
                loginGoRouter="/"
                bgroup={'hadess'}
                vaildUserAuthRouter={"/no-auth"}
        />
    )
}

export default LoginXpack
