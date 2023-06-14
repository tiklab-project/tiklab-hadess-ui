/**
 * @name: layout
 * @author: mahai
 * @date: 2021-05-21 16:53
 * @description：layout
 * @update: 2021-05-21 16:53
 */

import React ,{Fragment,useState}from 'react';
import {renderRoutes} from "react-router-config";
import {UserVerify} from 'tiklab-eam-ui';
import Header from "../header/header";
import "./layout.scss"
import {connect} from "tiklab-plugin-core-ui";

const SaasLayout = props => {
    return (
        <div>
          <Header {...props} />
            <div className='frame-content'>
                <div style={{width:'100%',height: '100%'}} >
                    {renderRoutes(props.route.routes)}
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

export default connect(mapStateToProps)(UserVerify(SaasLayout,"/no-auth"))
