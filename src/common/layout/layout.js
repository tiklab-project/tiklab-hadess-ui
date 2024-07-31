/**
 * @name: layout
 * @author: mahai
 * @date: 2021-05-21 16:53
 * @description：layout
 * @update: 2021-05-21 16:53
 */

import React ,{useEffect,useState}from 'react';
import {renderRoutes} from "react-router-config";
import Header from "../header/header";
import FirstNav from "../navigation/FirstNav"
import "./layout.scss"
import {observer,inject} from "mobx-react";
const Layout = props => {
    const {location,AppLink,HelpLink,AvatarLink,repositoryStore}=props
    const {navLevel,setNavLevel}=repositoryStore
    useEffect(()=>{
        if (navLevel===2&&((location.pathname==='/repository'||location.pathname.startsWith("/repository/add")||
            location.pathname.startsWith("/library")))){
            setNavLevel(1)
        }
    },[location.pathname])

    return (
        <div className='hadess-frame'>
            <Header {...props}
                    AppLink={AppLink}
                    HelpLink={HelpLink}
                    AvatarLink={AvatarLink}
            />

            <div className='frame-content'>
                {
                    navLevel===1&&
                    <FirstNav {...props}
                              HelpLink={HelpLink}
                    />
                }
                <div style={{height:'100%'}} >
                    {renderRoutes(props.route.routes)}
                </div>
            </div>
        </div>
    )
}

export default inject('repositoryStore')(observer(Layout))
