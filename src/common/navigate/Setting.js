import {
    LayoutOutlined, MergeCellsOutlined,
    SafetyCertificateOutlined,
    SoundOutlined,
    TeamOutlined, VerifiedOutlined
} from "@ant-design/icons";
import React,{useState} from 'react';
import SettingNav from './SettingNav';
const Setting = (props) => {
    const [key,setKey]=useState('')
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
            icon:<SafetyCertificateOutlined />
        },
        {
            id:'3',
            key:'3',
            title: '消息中心',
            icon:<SoundOutlined />,
            children:[
                {
                    id:'3-1',
                    key:'3-1',
                    title: '消息通知方案',
                },
                {
                    id:'3-2',
                    key:'3-2',
                    title: '消息发送方式',
                }
            ]
        },
        {
            id:'4',
            key:'4',
            title: '插件',
            icon:<MergeCellsOutlined />
        },
        {
            id:'5',
            key:'5',
            title: '安全',
            icon:<LayoutOutlined />,
            children:[
                {
                    id:'5-1',
                    key:'5-1',
                    title: '操作日记',
                }
            ]
        },
        {
            id:'6',
            key:'6',
            title: '版本与许可证',
            icon:<VerifiedOutlined />
        }

    ]

    const onSelectMenu = e => {
        const key = e.key;
        let links = [
            {
                key:'1-1',
                router:`/index/sysmgr/orga`,
            },
            {
                key:'1-2',
                router:`/index/sysmgr/user`,
            },
            {
                key:'1-3',
                router: '/index/sysmgr/userGroup',
            },
            {
                key:'1-4',
                router:`/index/sysmgr/user/directory`,
            },
            {
                key:'2',
                router:`/index/sysmgr/role`,
            },
            {
                key:'3-1',
                router:`/index/sysmgr/notice`,
            },
            {
                key:'3-2',
                router:`/index/sysmgr/messageSend`,
            },
            {
                key:'4',
                router:`/index/sysmgr/plugin`,
            },
            {
                key:'5-1',
                router:'/index/sysmgr/logList',
            },
            {
                key:'6',
                router:'/index/sysmgr/version',
            },
        ];
        onSelectMenuSetting(props.history, key, links)
        setKey(key)
    }

    const applicationRouters =[
        {
            id:'1',
            key:'1',
            title: '用户与部门',
            icon:<TeamOutlined />,
            children:[
                {
                    id: '/index/sysmgr/orga',
                    title: '部门',
                },
                {
                    id:'/index/sysmgr/user',
                    title: '用户',
                },
                {
                    id:'/index/sysmgr/userGroup',
                    title: '用户组',
                },
                {
                    id:'/index/sysmgr/user/directory',
                    title: '用户目录',
                },
            ]
        },
        {
            id:'/index/sysmgr/role',
            title: '权限',
            icon:<SafetyCertificateOutlined />
        },
        {
            id:'3',
            key:'3',
            title: '消息中心',
            icon:<SoundOutlined />,
            children:[
                {
                    id:'/index/sysmgr/notice',
                    title: '消息通知方案',
                },
                {
                    id:'/index/sysmgr/messageSend',
                    title: '消息发送方式',
                }
            ]
        },
        {
            id:'/index/sysmgr/plugin',
            title: '插件',
            icon:<MergeCellsOutlined />
        },
        {
            id:'5',
            key:'5',
            title: '安全',
            icon:<LayoutOutlined />,
            children:[
                {
                    id:'/index/sysmgr/logList',
                    title: '操作日记',
                }
            ]
        },
        {
            id:'/index/sysmgr/version',
            title: '版本与许可证',
            icon:<VerifiedOutlined />
        }
    ]

    const onSelectMenuSetting = (history, key, links) => {
        const index = links.findIndex(item => item.key === key)
        history.push(links[index].router)
    }

    return(
       /* <SettingNav
            {...props}
            menuData={menuData}
            onSelectMenu={onSelectMenu}
            openKey={key}
        />*/
        <SettingNav
            {...props}
            applicationRouters={applicationRouters}
        />
    )

}

export default Setting
