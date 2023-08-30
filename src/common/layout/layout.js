/**
 * @name: layout
 * @author: mahai
 * @date: 2021-05-21 16:53
 * @description：layout
 * @update: 2021-05-21 16:53
 */

import React ,{Fragment,useState}from 'react';
import {renderRoutes} from "react-router-config";
import Header from "../header/header";
import "./layout.scss"
const Layout = props => {
    const {AppLink}=props
    return (
        <div>
          <Header {...props} AppLink={AppLink}/>
            <div className='frame-content'>
                <div style={{width:'100%',height: '100%'}} >
                    {renderRoutes(props.route.routes)}
                </div>
            </div>
        </div>
    )
}

export default Layout
