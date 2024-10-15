/**
 * @name: Portals
 * @author: limingliang
 * @date: 2021-05-21 16:53
 * @description：layout
 * @update: 2021-05-21 16:53
 */

import React ,{useEffect,useState}from 'react';
import {renderRoutes} from "react-router-config";
import "./layout.scss"
import {observer,inject} from "mobx-react";
import {Layout} from "antd";
import {getUser} from "tiklab-core-ui";

const Portals = (props) => {
    const {location,repositoryStore,systemRoleStore,FirstNav}=props
    const {getSystemPermissions} = systemRoleStore
    const {navLevel,setNavLevel}=repositoryStore

    useEffect(()=>{
        if (navLevel===2&&((location.pathname==='/repository'||location.pathname.startsWith("/repository/add")||
            location.pathname.startsWith("/library")))){
            setNavLevel(1)
        }
    },[location.pathname])

    useEffect(()=>{
        getSystemPermissions(getUser().userId)
    },[])
    return (
        <Layout className='hadess-frame'>
            {
                navLevel===1&&FirstNav
            }
            <Layout>
                <div className='portals-content' >
                    {renderRoutes(props.route.routes)}
                </div>
            </Layout>
        </Layout>
    )
}
export default inject('systemRoleStore','repositoryStore')(observer(Portals))
