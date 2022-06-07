/**
 * @name: header
 * @author: limingliang
 * @date: 2022-06-04 16:53
 * @description：头部
 * @update: 2022-06-16 16:53
 */


import React, {Fragment, useEffect, useState} from 'react';
import {AppstoreFilled, DownOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar} from "antd";
import {getUser} from "doublekit-core-ui";
import {useWorkAppConfig } from "doublekit-eam-ui";
import './header.scss'
const HeaderConfig = [
    /* {
         to:'/',
         title:'首页',
         key: '/'
     },*/{
        to:`/setting`,
        title:'运营管理',
        key: '/setting'
    },
    /*{
        to:`/system`,
        title:'系统管理',
        key: '/system'
    },*/
];
const Header = props => {
    const [component, ModalComponent, editOrAddModal] = useWorkAppConfig(false);
    const [openValue,setOpenValue]=useState('');
    const changeCurrentLink = item => {
        if (item === '/logout') {
            props.history.push(item)
        } else {
            props.history.push(item.to)
        }

    }
    const renderRouter = () => {
        if (HeaderConfig) {
            return (
                <div defaultValue='/setting' className={'flex h-14  '}>
                    {
                        HeaderConfig.map(item => {
                            return <div key={item.key} className='pt-5 px-3 cursor-pointer' onClick={ () => changeCurrentLink(item)} > {item.title}</div>
                        })
                    }
                </div>
            )
        }
    }

    const openPortal = (value) => {
        setOpenValue(value)
    }
    const closePortal = () => {
        debugger
        setOpenValue('')
    }

    return(
        <Fragment>
            <header className='flex border-b'>
                <div className='flex w-4/5'>
                    <div className='pt-2'>
                        {component}
                    </div>
                    <div className='font-extrabold italic text-3xl w-40 pl-4 pt-2 '>oms</div>
                    {renderRouter()}
                </div>
                <div className=' w-1/5  pr-16 '>
                    <div className=' flex py-2 justify-end ' >
                        <div  className='cursor-pointer'>
                            <SettingOutlined className='pr-6  text-2xl'  onMouseOver={()=>openPortal('system')} />
                            {
                                openValue==='system'&&
                                <div className='absolute pt-4 w-28 ' onMouseOut={closePortal} >
                                    <div className='rounded-none border grid gap-y-2 py-2 pl-2 relative' >
                                        <div className=' '>
                                            用户管理
                                        </div>
                                        <div>
                                            系统设置
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <Avatar size={36} icon={<UserOutlined/>} />
                        <div className='py-2 pl-3'>{getUser().name}</div>
                        <div>
                            <DownOutlined className={'py-3 pl-1 cursor-pointer'} onMouseOut={()=>openPortal('user')}/>
                            {
                                openValue==='user'&&
                                <div className={'absolute  pt-2.5 '}>
                                    <div className='rounded-none logout-menu border grid gap-y-2 py-2 pl-2 relative  w-24' onMouseOut={closePortal}>
                                        <div className=' ' onClick={()=>changeCurrentLink('/logout')}>
                                            退出
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                </div>
            </header>
            {ModalComponent}
            {editOrAddModal}
        </Fragment>
    )

}
export default Header