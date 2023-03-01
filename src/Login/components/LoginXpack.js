import React from 'react';
import {Login} from "tiklab-eam-ui";
//import logo from "../../assets/images/logo.png";
import {inject, observer} from "mobx-react";


const LoginXpack  = props => {
    return (
        <div>
            <Login loginGoRouter={'index/library'} {...props}/>
        </div>
    )
}

export default LoginXpack
