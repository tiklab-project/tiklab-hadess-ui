/**
 * @name: header
 * @author: limingliang
 * @date: 2022-06-04 16:53
 * @description：头部
 * @update: 2022-06-16 16:53
 */


import React, { useState,useEffect} from 'react';
import {
    ExpandOutlined,
    GlobalOutlined, LogoutOutlined,
    MessageOutlined, ProfileOutlined,
    QuestionCircleOutlined, ScheduleOutlined,
    SettingOutlined, UserOutlined, WhatsAppOutlined,
} from "@ant-design/icons";
import {Avatar, Dropdown, Badge } from "antd";
import {AppLink} from "tiklab-integration-ui"
import Message from "./message";
import './header.scss'
const HeaderRuter = [
     /*{
         to:'/homes',
         title:'首页',
         key: 'homes'
     },*/
    {
        to:`/index/library`,
        title:'制品',
        key: 'library'
    },
    {
        to:`/index/repository`,
        title:'制品库',
        key: 'repository'
    },
    /*{
        to:`/scan`,
        title:'扫描',
        key: 'scan'
    },*/
];
const Header = props => {
    let path = props.location.pathname
    const [currentLink,setCurrentLink] = useState(path)
    const [visible,setVisible] = useState(false)

    useEffect(()=>{
        if(path.indexOf('/index/repository')===0){
            path='/index/repository'
        }
        if(path.indexOf('/index/library')===0){
            path='/index/library'
        }
        setCurrentLink(path)
    },[path])


    /**
     * 退出登录
     */
    const goOut = () => {
        props.history.push({
            pathname: '/logout',
            state:{
                preRoute: props.location.pathname
            }
        })
    }

    /**
     * 路由跳转
     * @param item
     */
    const changeCurrentLink = item => {
        props.history.push(item.to)
    }
    // 切换语言目录
    const languageMenu = (
        <div className='outMenu-lan-menu'>
            <div className='lan-menu' >中文</div>
            {/*<div className='lan-menu'>英文</div>*/}
        </div>
    )

    // 渲染一级标题
    const renderRouter = routers => {
        return routers.map(routers=>{
            return  <div key={routers.key}
                         onClick={()=>changeCurrentLink(routers)}
                         className={currentLink===routers.to ? 'headers-active' : null}
            >{routers.title}</div>
        })
    }
    /**
     * 跳转系统设置
     */
    const goSystem = () =>{
        props.history.push('/sysmgr/orga')
    }

    // 退出登录页面
    const outMenu = (
        <div className='header-outMenu'>
            <div className='header-outMenu-top'>
                <div className='outMenu-out'>
                    <Avatar icon={<UserOutlined />} />
                    <div className='outMenu-out-info'>
                        <div className='outMenu-out-name'>name</div>
                        <div className='outMenu-out-eamil'>tiklab@</div>
                    </div>
                </div>
            </div>
            <div className='header-outMenu-lan'>
                <Dropdown overlay={languageMenu}>
                    <div className='outMenu-lan'>
                        <GlobalOutlined className='header-dropdown-icon'/>
                        <span className='lan'>切换语言</span>
                    </div>
                </Dropdown>
            </div>
            <div className='header-outMenu-out'>
                <div onClick={()=>goOut()} className='outMenu-out'>
                    <LogoutOutlined className='header-dropdown-icon'/>
                    <span className='bottom-out'>退出</span>
                </div>
            </div>
        </div>
    )

    // 帮助目录
    const helpMenu = (
        <div className='header-helpMenu'>
            <div className='header-helpMenu-item'>
                <ProfileOutlined className='header-dropdown-icon'/>
                文档
            </div>
            <div className='header-helpMenu-item'>
                <ExpandOutlined className='header-dropdown-icon'/>
                社区支持
            </div>
            <div className='header-helpMenu-item'>
                <ScheduleOutlined className='header-dropdown-icon'/>
                在线工单
            </div>
            <div className='header-helpMenu-item'>
                <WhatsAppOutlined className='header-dropdown-icon'/>
                在线客服
            </div>
        </div>
    )
    return(
            <div>
                <div className='frame-header' >
                    <div className='frame-header-right'>
                        <div className='frame-app-link'>
                            <AppLink  isSSO={false}/>
                        </div>
                        <div className='frame-header-logo'>
                            <div className='frame-header-logo-text'>Xpack</div>
                        </div>
                        <div className='headers-link'>
                            {renderRouter(HeaderRuter)}
                        </div>
                    </div>
                    <div className='frame-header-right'>
                        <div className='frame-header-right-text'>
                            <div className='frame-header-set' onClick={()=>goSystem()}>
                                <SettingOutlined className='frame-header-icon'/>
                            </div>
                            <div className='frame-header-message' onClick={()=>setVisible(true)}>
                                <Badge count={3} size='small'>
                                    <MessageOutlined className='frame-header-icon'/>
                                </Badge>
                            </div>
                            <div className='frame-header-help'>
                                <Dropdown overlay={helpMenu}>
                                    <QuestionCircleOutlined className='frame-header-icon'/>
                                </Dropdown>
                            </div>
                            <Dropdown overlay={outMenu}>
                                <div className='frame-header-user'>
                                    <Avatar icon={<UserOutlined />} />
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <Message
                    {...props}
                    visible={visible}
                    setVisible={setVisible}
                />
            </div>
    )

}
export default Header
