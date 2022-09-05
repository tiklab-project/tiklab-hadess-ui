import React from 'react';
import {Login} from "tiklab-eam-ui";
//import logo from "../../assets/images/logo.png";
import {inject, observer} from "mobx-react";


const LoginOMS  = props => {
    return (
        <div>
            <Login
                {...props}
                loginGoRouter={'/setting'}
                title = {'OMS管理'}
            />
        </div>
    )
}

export default LoginOMS
