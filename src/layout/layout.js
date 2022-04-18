/**
 * @name: layout
 * @author: mahai
 * @date: 2021-05-21 16:53
 * @description：layout
 * @update: 2021-05-21 16:53
 */

import React from 'react';
import {Menu } from 'antd';
import { Portal } from "doublekit-frame-ui";
import logo from '../assets/images/logo.jpeg';
import {renderRoutes} from "react-router-config";
import {getUser} from "../utils";

const HeaderConfig = [
    {
        to:'/',
        title:'首页',
        key: '/'
    },{
        to:`/setting`,
        title:'运营管理',
        key: '/setting'
    },
    {
        to:`/system`,
        title:'系统管理',
        key: '/system'
    },
];

const SaasLayout = props => {


    const onSearch = e => {
        console.log(e)
    }
    const changeCurrentLink = item => {
        props.history.push(item.to)
    }
    const renderRouter = () => {

        if (HeaderConfig) {
            return (
                <div defaultValue='/setting' className={'portal-header-link'}>
                    {
                        HeaderConfig.map(item => {
                            return <div key={item.key} onClick={ () => changeCurrentLink(item)} > {item.title}</div>
                        })
                    }
                </div>
            )
        }
    }
    return (

        <Portal
            {...props}
            logo={logo}
            HeaderRouterComponent={renderRouter()}
            redirect={'/login'}
            enterSearch={onSearch}
            userMessageLink={'/message/usermessage'}
            fetchMethod={method}
            languageUrl={plugin_url}
            isSSO = {false}
        >
            <div style={{    display: 'flex',height: '100%'}}>
                <div style={{width:'100%'}}>
                    {renderRoutes(props.route.routes)}
                </div>
            </div>
        </Portal>
    )
};
export default SaasLayout
