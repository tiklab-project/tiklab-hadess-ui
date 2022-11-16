import React from 'react';
import {Login} from "tiklab-eam-ui";
//import logo from "../../assets/images/logo.png";
import {inject, observer} from "mobx-react";


const LoginOMS  = props => {
    return (
        <div>
            <Login loginGoRouter={'/index/home'} {...props}/>
        </div>
    )
}

export default LoginOMS
