/**
 * @name: header
 * @author: limingliang
 * @date: 2022-06-04 16:53
 * @description：头部
 * @update: 2022-06-16 16:53
 */


import React, { useState} from 'react';
import {
    MessageOutlined,
    PoweroffOutlined,
    SettingOutlined, UserOutlined,
} from "@ant-design/icons";
import {Avatar, Dropdown, Space, Tooltip, Badge, Row, Col} from "antd";
import {AppLink} from "tiklab-integration-ui"
import Message from "../components/message";
import './header.scss'
const HeaderConfig = [
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
    const [type,setType]=useState("library");  //首页类型
    const [headState,setHeadState]=useState()
    const [open, setOpen] = useState(false);

    const logOut = item => {
        if (item === '/logout') {
            props.history.push(item)
        } else {
            props.history.push(item.to)
        }
    }

    //切换head类型
    const cutHeadType =async (item) => {
        setType(item.key)
        props.history.push(item.to)
    }

    const goSetting =async (path) => {
        setType("")
        props.history.push('/sysmgr/orga')
    }

    const onclickHead = async (value) => {
        if (headState){
            setHeadState(null)
        }else {
            setHeadState(value)
        }
    }

    const helpMenu = (
        <div className="dk-head-user-box ">
            <div className='user-head'>
                个人资料
            </div>
            <div className='user-info'>
                <UserOutlined className='icon-size' />
                <div className='user-info-text'>
                    <div className='user-info-name'>admin</div>
                    <div className='user-info-email'>1810617772</div>
                </div>
            </div>
            <div onClick={()=>logOut('/logout')} className='user-logout'>
                <PoweroffOutlined className='' width={"20"} height={"20"}/>
                  <div className='log-out'>退出</div>
            </div>
        </div>
    )
    return(
        <div className='dk-head ' >
            <header className='frame-header-right ' >
                <div className='frame-header-left'>
                    <div className='project-icon'>
                        <AppLink  isSSO={false}/>
                    </div>

                    <div className='project-text'>XPack</div>
                    <div className='frame-header-link'>
                        {HeaderConfig.map(item=>{
                           return(
                               <div key={item.key} className={`frame-header-link-item ${type===item.key&&" frame-header-link-active"}`} onClick={()=>cutHeadType(item)}>
                                   {item.title}
                               </div>
                           )
                        })}
                    </div>
                </div>
                <div className='dis-flex'>
                        <div  className='dk-head-nav-item'>
                            <Tooltip title="系统设置">
                                <SettingOutlined className={'dk-head-nav-item-link  '}  onClick={()=>goSetting('setting')} />
                            </Tooltip>
                        </div>
                        <a className='dk-head-nav-item' onClick={() => setOpen(true)}>
                            <Badge count={5} size="small">
                                <Avatar
                                    size="small" style={{ background: "transparent", fontSize: "18px" }} icon={<MessageOutlined style={{ color: "#ffffff" }} />} />
                            </Badge>
                        </a>


                        <div className='dk-head-nav-item  ' onClick={()=>onclickHead('head')}>
                            <Tooltip title="个人资料与设置">
                                <Dropdown overlay={helpMenu} trigger={"click"}>
                                    <Space>
                                        <Avatar icon={<UserOutlined  className='head-icon'/>} />
                                    </Space>
                                </Dropdown>
                            </Tooltip>
                        </div>
                    </div>

            </header>
            <Message
                open={open}
                setOpen={setOpen}
            />
        </div>
    )

}
export default Header
