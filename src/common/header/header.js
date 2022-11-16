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
    SettingOutlined,
} from "@ant-design/icons";
import {Avatar,Dropdown,Space,Tooltip, Badge} from "antd";
import {getUser} from "tiklab-core-ui";
import {Profile, WorkAppConfig} from "tiklab-eam-ui";
import Message from "../components/message";
import './header.scss'
const HeaderConfig = [
     {
         to:'/',
         title:'首页',
         key: '/'
     },
    {
        to:`/system`,
        title:'系统管理',
        key: '/system'
    },
    {
        to:`/setting/tenant`,
        title:'运营管理',
        key: '/setting'
    },
];
const Header = props => {
    const [openValue,setOpenValue]=useState('');
    const [type,setType]=useState("home");  //首页类型
    const [headState,setHeadState]=useState()
    const [open, setOpen] = useState(false);

    const logOut = item => {
        if (item === '/logout') {
            props.history.push(item)
        } else {
            props.history.push(item.to)
        }
    }
    
    const goSystem = value => {
        props.history.push(value)
    }
    const renderRouter = () => {
        return(
            <div className='flex space-x-6 '>
              <div>首页</div>
              <div>内容管理</div>
            </div>
        )


       /* if (HeaderConfig) {
            return (
                <div defaultValue='/setting' className={'flex h-14  '}>
                    {
                        HeaderConfig.map(item => {
                            return <div key={item.key} className='pt-5  cursor-pointer' onClick={ () => changeCurrentLink(item)} > {item.title}</div>
                        })
                    }
                </div>
            )
        }*/
    }

    const openPortal = (value) => {
        setOpenValue(value)
    }
    const closePortal = () => {
        debugger
        setOpenValue('')
    }
    //切换head类型
    const cutHeadType =async (type) => {
        setType(type)
     /*   if (type==='details'){
            props.history.push('/index/cont/tenant')
        }
        if (type==='sub'){
            props.history.push('/index/sub/subscribelist')
        }
        if (type==='server'){
            props.history.push('/index/server/workOrder')
        }*/

        if (type==='setting'){
            props.history.push('/sysmgr/orga')
        }
        if (type==='manage'){
            props.history.push('/index/member')
        }
        if (type==='home'){
            props.history.push('/index/home')
        }

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
            <div className='user-head '>
                个人资料
            </div>
            <div className='user-info'>
                <Profile />
                <div className='user-info-text'>
                    <div className='user-info-name'>admin</div>
                    <div className='user-info-email'>1810617772</div>
                </div>
            </div>
            <div onClick={()=>logOut('/logout')} className='user-logout'>
                <PoweroffOutlined className='' width={"20"} height={"20"}/>
                  <div className='pl-4'>退出</div>
            </div>
        </div>
    )
    return(
        <div className='dk-head text-white' >
            <header className='  justify-between frame-header-right ' >
                <div className='flex'>
                    <WorkAppConfig/>
                    <div className='text-2xl mt-3 pl-4 font-medium'>OMS</div>
                    {/*<div className='frame-header-link'>
                        <div className={`frame-header-link-item ${type==='details'&&" frame-header-link-active"}`} onClick={()=>cutHeadType("details")}>内容管理</div>
                        <div className={`frame-header-link-item ${type==='sub'&&" frame-header-link-active"}`} onClick={()=>cutHeadType("sub")}>订阅管理</div>
                        <div className={`frame-header-link-item ${type==='server'&&" frame-header-link-active"}`} onClick={()=>cutHeadType("server")}>服务与支持</div>
                    </div>*/}
                    <div className='frame-header-link'>
                        <div className={`frame-header-link-item ${type==='home'&&" frame-header-link-active"}`} onClick={()=>cutHeadType("home")}>首页</div>
                        <div className={`frame-header-link-item ${type==='manage'&&" frame-header-link-active"}`} onClick={()=>cutHeadType("manage")}>运营管理</div>
                    </div>
                </div>
                <div className=' w-1/5   '>
                    <div className=' flex  justify-end ' >
                        <div  className='dk-head-nav-item'>

                            <Tooltip title="系统设置">
                                <SettingOutlined className={'dk-head-nav-item-link pr-6 text-white  text-xl'}  onClick={()=>cutHeadType('setting')} />
                            </Tooltip>
                        </div>
                        <a className='dk-head-nav-item pr-6' onClick={() => setOpen(true)}>
                            <Badge count={5} size="small">
                                <Avatar
                                    size="small" style={{ background: "transparent", fontSize: "18px" }} icon={<MessageOutlined style={{ color: "#ffffff" }} />} />
                            </Badge>
                        </a>


                        <div className='dk-head-nav-item flex mr-12' onClick={()=>onclickHead('head')}>
                            <Tooltip title="个人资料与设置">
                                <Dropdown overlay={helpMenu} trigger={"click"}>
                                    <Space>
                                        <Profile />
                                    </Space>
                                </Dropdown>
                            </Tooltip>
                        </div>
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