
/**
 * @name: SettingAside
 * @author: limingliang
 * @date: 2022-05-21 16:51
 * @description：设置 左侧导航栏
 * @update: 2022-05-21 16:51
 */
import {
    BarsOutlined,
    BuildOutlined,
    LayoutOutlined, MergeCellsOutlined,
    SafetyCertificateOutlined,
    SoundOutlined,
    TeamOutlined, VerifiedOutlined
} from "@ant-design/icons";
import React,{useState} from 'react';
import SettingContent from './SettingContent';

const SettingAside = (props) => {

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
                },
                {
                    id:'/index/sysmgr/backupRecovery',

                    title: '备份与恢复',
                }
            ]
        },
        {
            id:'/index/sysmgr/version',
            title: '版本与许可证',
            icon:<VerifiedOutlined />
        }
    ]

    return(
        <SettingContent
            {...props}
            applicationRouters={applicationRouters}
        />
    )
}
export default SettingAside
