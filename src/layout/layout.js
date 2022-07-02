/**
 * @name: layout
 * @author: mahai
 * @date: 2021-05-21 16:53
 * @description：layout
 * @update: 2021-05-21 16:53
 */

import React ,{Fragment,useState}from 'react';
import { verifyUserHOC, EAM_STORE,useWorkAppConfig } from "doublekit-eam-ui";
import {inject, observer} from 'mobx-react'
import {renderRoutes} from "react-router-config";

import Header from "../common/header/header";

const SaasLayout = props => {
    return (
        <Fragment>
          <Header {...props} />
            <div stye={{display: 'flex',height: '100%'}} className={'pt-14'} >
                <div style={{width:'100%'}}>
                    {renderRoutes(props.route.routes)}
                </div>
            </div>

        </Fragment>

    )
};

export default verifyUserHOC(inject(EAM_STORE)(observer(SaasLayout)))
