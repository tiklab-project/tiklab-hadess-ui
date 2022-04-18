import React from 'react';
import {ProjectLogin} from "doublekit-frame-ui";
import {inject, observer} from "mobx-react";


const Login  = props => {

    return (
        <div>
            <ProjectLogin
                {...props}
                loginGoRouter={'/setting'}
                fetchMethod={method}
                languageUrl={plugin_url}
            />
        </div>
    )
}

export default inject()(observer(Login))
