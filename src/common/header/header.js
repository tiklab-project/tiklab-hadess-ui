/**
 * @name: header
 * @author: limingliang
 * @date: 2022-06-04 16:53
 * @description：头部
 * @update: 2022-06-16 16:53
 */


import React, { useState,useEffect} from 'react';
import {inject,observer} from "mobx-react";
import {
    BellOutlined,
} from "@ant-design/icons";
import {Avatar, Dropdown, Badge } from "antd";
import Message from "./message";
import './header.scss'
import {getUser,productImg,productWhiteImg} from "thoughtware-core-ui";
import hadess from "../../assets/images/img/xpack.png"
import PortalFeature from "./PortalFeature";

const Header = props => {
    const {location,AppLink,HelpLink,AvatarLink,systemRoleStore}=props

    const {getSystemPermissions} = systemRoleStore
    let path = location.pathname

    const [currentLink,setCurrentLink] = useState(path)
    const [visible,setVisible] = useState(false)

    const [unread,setUnread] = useState(1)

    useEffect(()=>{
        if(path.indexOf('/repository')===0){
            path='/repository'
        }
        if(path.indexOf('/library')===0){
            path='/library/maven'
        }
        setCurrentLink(path)
        getSystemPermissions(getUser().userId)
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
                         className={`hadess-header-link-item ${currentLink===routers.to ? "hadess-header-link-active" : null}`}
            >
                <span>
                    {routers.title}
                </span>
            </div>
        })
    }
    /**
     * 跳转系统设置
     */
    const goSystem = () =>{
        props.history.push('/setting/home')
    }

    //点击图标跳转首页
    const goHomePage = () => {
        props.history.push(`/library/maven`)
    }

    return(
         <div className='hadess-header' >
            <div className='hadess-header-right'>
                <div className='recovery-item'>
                    {AppLink}
                </div>

                <div className='hadess-header-logo' onClick={goHomePage}>
                    <img  src={productWhiteImg.matflow}  style={{width:22,height:22}}/>
                    <div className='hadess-header-logo-text'>Hadess</div>
                </div>
             {/*   <div className='hadess-header-link'>
                    {renderRouter(HeaderRuter)}
                </div>*/}
            </div>
            <div className='hadess-header-right'>
                <div className='hadess-header-right-text'>
                 {/*   <div className='hadess-header-set' onClick={()=>goSystem()}>
                        <SettingOutlined className='hadess-header-icon'/>
                    </div>*/}
                    <div className='hadess-header-message' onClick={()=>setVisible(true)}>
                        <Badge count={unread} size='small'>
                            <BellOutlined className="hadess-header-icon"/>
                        </Badge>
                    </div>

                    <div className='recovery-item'>
                        {HelpLink}
                    </div>
                    <div className='recovery-item'>
                        <PortalFeature/>
                    </div>
                    {AvatarLink}
                </div>
            </div>
            <Message
                {...props}
                visible={visible}
                setVisible={setVisible}
                unread={unread}
                setUnread={setUnread}
            />
         </div>
    )
}

export default inject("systemRoleStore")(observer(Header))
