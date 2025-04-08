
/**
 * @name: SettingAside
 * @author: limingliang
 * @date: 2022-05-21 16:51
 * @description：设置 左侧导航栏
 * @update: 2022-05-21 16:51
 */
import {
    DeploymentUnitOutlined, FileDoneOutlined,
    LayoutOutlined, SafetyCertificateOutlined,
    SoundOutlined,
    TeamOutlined, VerifiedOutlined
} from "@ant-design/icons";
import React,{useEffect} from 'react';
import SettingContent from './SettingContent';
import {BasicRouter} from "./BasicRouters"
import {inject,observer} from "mobx-react";

const SettingAside = (props) => {
    const {repositoryStore}=props
    const {setNavLevel} = repositoryStore

    useEffect( ()=>{
        setNavLevel(2)
    },[])

    const applicationRouters =[
        {
            id:'1',
            key:'1',
            title: '用户与权限',
            icon:<TeamOutlined />,
            children:[
                {
                    id: '/setting/orga',
                    title: '部门',
                    purviewCode: "orga",
                },
                {
                    id:'/setting/user',
                    title: '用户',
                    purviewCode: "user",
                },
                {
                    id:'/setting/userGroup',
                    title: '用户组',
                    purviewCode: "user_group",
                },
                {
                    id:'/setting/dir',
                    title: '用户目录',
                    purviewCode: "user_dir",
                },
                {
                    id:'/setting/role',
                    title: '权限',
                    purviewCode:'hadess_authority',
                },
            ]
        },

        {
            id:'3',
            key:'3',
            title: '消息中心',
            icon:<SoundOutlined />,
            children:[
                {
                    id:'/setting/mes/notice',
                    title: '消息通知方案',
                    purviewCode:'news_inform_scheme',
                },
                {
                    id:'/setting/mes/send',
                    title: '消息发送方式',
                    purviewCode: 'news_send_way',
                }
            ]
        },
        {
            id:'7',
            key:'7',
            title: '仓库配置',
            icon:<DeploymentUnitOutlined />,
            children:[
                {
                    id:'/setting/resources',
                    title: '资源监控',
                },
                {
                    id:'/setting/agency',
                    title: '仓库代理地址',
                },
                {
                    id:'/setting/networkProxy',
                    title: '网络代理地址',
                },
            ]
        },

        {
            id:'4',
            key:'4',
            title: '扫描配置',
            icon:<FileDoneOutlined />,
            children:[
                {
                    id:'/setting/scanScheme',
                    title: '扫描方案',
                },
                {
                    id:'/setting/holeList',
                    title: '漏洞列表',
                },
            ]
        },
        {
            id:'9',
            title: '集成与开放',
            icon: <LayoutOutlined />,
            children: [
                {
                    id:'/setting/openApi',
                    title:'openApi',
                },

            ]
        },
        {
            id:'5',
            key:'5',
            title: '安全',
            icon:<SafetyCertificateOutlined />,
            children:[
                {
                    id:'/setting/myLog',
                    title: '操作日志',
                },
                {
                    id:'/setting/backupRecovery',
                    title: '备份与恢复',
                    purviewCode:'hadess_backup',
                }
            ]
        },
        {
            id:'6',
            title:'应用',
            icon:<VerifiedOutlined />,
            children: [
                {
                    id:'/setting/version',
                    title:'版本与许可证',
                    purviewCode:'version',
                },
                {
                    id:'/setting/authContent',
                    title:'应用访问权限',
                    purviewCode:'access_auth',
                },
            ]
        },
    ]

    return(
        <SettingContent
            {...props}
            isDepartment={true}
            applicationRouters={applicationRouters}
            basicRouter={BasicRouter}
            setNavLevel={setNavLevel}
        />
    )
}
export default inject('repositoryStore')(observer(SettingAside))
