/**
 * @name: setting
 * @author: mahai
 * @date: 2021-05-21 16:51
 * @description：setting
 * @update: 2021-05-21 16:51
 */
import React,{useState} from 'react';
import {renderRoutes} from 'react-router-config'
import MenuList from "../../common/menu/menu";
import './setting.scss'
import {CopyOutlined, MessageOutlined, TeamOutlined} from "@ant-design/icons";
const Setting = props => {
    const [key,setKey]=useState('')
    const {match} =props
    const menuData = [
        {
            id:'1',
            key:'1',
            title: '用户与部门',
            icon:<TeamOutlined />,
            children:[
                {
                    id:'1-1',
                    key:'1-1',
                    title: '部门',
                },
                {
                    id:'1-2',
                    key:'1-2',
                    title: '用户',
                },
                {
                    id:'1-3',
                    key:'1-3',
                    title: '用户组',
                },
                {
                    id:'1-4',
                    key:'1-4',
                    title: '用户目录',
                },
            ]
        },
        {
            id:'2',
            key:'2',
            title: '权限',
            icon:<CopyOutlined />
        },
        {
            id:'3',
            key:'3',
            title: '消息中心',
            icon:<CopyOutlined />,
            children:[
                {
                    id:'3-4',
                    key:'3-4',
                    title: '消息管理',
                },
                {
                    id:'3-1',
                    key:'3-1',
                    title: '消息类型管理',
                },
                {
                    id:'3-2',
                    key:'3-2',
                    title: '消息发送方式',
                },
                {
                    id:'3-3',
                    key:'3-3',
                    title: '消息模版配置',
                }
            ]
        },

    ]

    const onSelectMenu = e => {
        const key = e.key;

        let links = [
            {
                key:'1-1',
                router:`/sysmgr/orga`,
            },
            {
                key:'1-2',
                router:`/sysmgr/user`,
            },
            {
                key:'1-4',
                router:`/sysmgr/user/directory`,
            },
            {
                key:'2',
                router:`/sysmgr/systemRole`,
            },
            {
                key:'3-1',
                router:`/sysmgr/messageType`,
            },
            {
                key:'3-2',
                router:`/sysmgr/messageSendType`,
            },
            {
                key:'3-3',
                router:`/sysmgr/messageTemplate`,
            },
            {
                key:'3-4',
                router:`/sysmgr/messageManagement`,
            },
        ];
        onSelectMenuSetting(props.history, key, links)
        setKey(key)
    }

    const onSelectMenuSetting = (history, key, links) => {
        const index = links.findIndex(item => item.key === key)
        history.push(links[index].router)
    }

    return (
        <div className='setting'>
            <div className={'left-nav left-nav-system-width'}>
                <MenuList
                    data={menuData}
                    onSelectMenu={onSelectMenu}
                    defaultSelectedKeys={[key]}
                />
            </div>

            <div  className={'setting_right_height'}>
                {renderRoutes(props.route.routes)}
            </div>
        </div>
    )
};
export default Setting
