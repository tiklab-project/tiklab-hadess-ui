import React from 'react';
import { Redirect } from 'react-router';

import SyncComponent from './common/lazy/SyncComponent';
import Home from './home/Home';
import SettingHome from "./setting/home/components/SettingHome";
import NotFoundContent from "./setting/not/NotFoundContent";
import NoAccessContent from "./setting/not/NoAccessContent";



//登陆
const Login = SyncComponent(() => import('./login/components/LoginXpack'));

//退出
const Logout = SyncComponent(() => import('./login/components/Logout'));


const FirstNav = SyncComponent(() => import('./common/navigation/FirstNav'));
// 制品库设置模块
const RepositoryAside = SyncComponent(() => import('./repository/navigator/RepositoryAside'));
// 制品库设置-设置模块
const RepositorySetting = SyncComponent(() => import('./repository/setting/navigator/RepositorySetting'));
// 系统管理模块
const SettingAside = SyncComponent(() => import('./setting/navigator/SettingAside'));


const ExcludeProductUser=SyncComponent(()=>import('./login/components/ExcludeProductUser'))

// 制品列表
const librarys = SyncComponent(() => import('./library/components/LibraryList'))



// 制品库列表
const RepositoryList = SyncComponent(() => import('./repository/repository/components/RepositoryList'))
// 制品库-创建
const RepositoryAdd = SyncComponent(() => import('./repository/repository/components/RepositoryAdd'))

//制品列表
const LibraryList = SyncComponent(() => import('./repository/library/LibraryList'))


//制品库信息
//const RepositoryInfo = SyncComponent(() => import('./repository/repository/components/RepositoryUpdate'))
const RepositoryInfo = SyncComponent(() => import('./repository/setting/basicInfo/RepositoryBasicInfo'))

//制品库-成员
const programUser = SyncComponent(() => import('./repository/setting/ProgramUser'))
//制品库-权限
const programDomainRole = SyncComponent(() => import('./repository/setting/ProjectDomainRole'))
//推送中央仓库
const PushGroup = SyncComponent(() => import('./repository/setting/pushCenter/components/PushGroup'))
const PushLibrary = SyncComponent(() => import('./repository/setting/pushCenter/components/PushLibrary'))



//设置-消息通知方案
const messageNotice =SyncComponent(()=>import('./setting/message/MessageNotice'))
//设置-消息发送方式
const messagesendtype =SyncComponent(()=>import('./setting/message/Messagesendtype'))


//设置-部门
const orga =SyncComponent(()=>import('./setting/organ/Orga'))
//设置-用户
const user =SyncComponent(()=>import('./setting/organ/User'))
//设置-用户组
const group =SyncComponent(()=>import('./setting/organ/Group'))
//设置-用户目录
const userDirectory =SyncComponent(()=>import('./setting/organ/UserDirectory'))
//设置-权限
const systemRole =SyncComponent(()=>import('./setting/role/SystemRole'))

//设置-插件
const plugin =SyncComponent(()=>import('./setting/plugins/Plugin'))
//设置-操作日志
const MyLog =SyncComponent(()=>import('./setting/security/MyLog'))

//设置-版本与许可证
const Version =SyncComponent(()=>import('./setting/licence/Version'))
const AuthContent =SyncComponent(()=>import('./setting/licence/AuthContent'))

//设置-备份与恢复
const BackupRecovery =SyncComponent(()=>import('./setting/backup/BackupRecoveryContent'))

//扫描方案
const ScanScheme =SyncComponent(()=>import('./setting/scan/components/ScanScheme'))
const ScanHole =SyncComponent(()=>import('./setting/scan/components/ScanHole'))
const HoleList =SyncComponent(()=>import('./setting/scan/components/HoleList'))

//资源监控
const Resources =SyncComponent(()=>import('./setting/resources/components/Resources'))
//设置-代理地址
const RemoteAgency =SyncComponent(()=>import('./setting/remoteAgency/components/RemoteAgency'))


//基础数据
const SystemFunction =SyncComponent(()=>import('./setting/basicData/SystemFunction'))
const ProjectFunction =SyncComponent(()=>import('./setting/basicData/ProjectFunction'))
const ProjectRole =SyncComponent(()=>import('./setting/basicData/ProjectRole'))
const SystemRole =SyncComponent(()=>import('./setting/basicData/SystemRole'))
const LogType =SyncComponent(()=>import('./setting/basicData/LogType'))




const routers = [
    {
        path: "/login",
        exact: true,
        component: Login,
        key:'login'
    },
    {
        path: "/logout",
        exact: true,
        component: Logout,
        key:'logout'
    },
    {
        path:'/no-auth',
        exact:true,
        component:ExcludeProductUser,
    },
    {
        exact: true,
        path: '/404',
        render: props => <NotFoundContent {...props}/>
    },
    {
        exact: true,
        path: '/noaccess',
        render: props => <NoAccessContent {...props}/>
    },
    {
        path:'/',
        exact: true,
        render: ()=><Redirect to="/library/maven"/>
    },
    {
        component: Home,
        path: "/",
        routes: [
            {
                path: '/library/:type',
                component: librarys,
                exact: true,
            },
            {
                path: '/repository',
                component: RepositoryList,
                exact: true,
            },
            {
                path: '/repository/add/:type',
                component: RepositoryAdd,
                exact: true,
            },
            {
                component: RepositoryAside,
                path:'/repository/:id',
                routes:[
                    {
                        path: '/repository/:id/libraryList',
                        component: LibraryList,
                        exact: true,
                    },
                    {
                        path: '/repository/:id/setting',
                        component: RepositorySetting,
                        routes:[
                            {
                                path: '/repository/:id/setting/repositoryInfo',
                                component: RepositoryInfo,
                                exact: true,
                            },
                            {
                                path: '/repository/:id/setting/programDomainRole',
                                component: programDomainRole,
                                exact: true,
                            },
                            {
                                path: '/repository/:id/setting/pushGroup',
                                component: PushGroup,
                                exact: true,
                            },
                            {
                                path: '/repository/:id/setting/:pushGroupId/pushLibrary',
                                component: PushLibrary,
                                exact: true,
                            },
                            {
                                path: '/repository/:id/setting/programUser',
                                component: programUser,
                                exact: true,
                            },
                            {
                                path: '/repository/:id/setting',
                                exact: true,
                                render: ()=><Redirect to='/repository/:id/setting/repositoryInfo'/>
                            },

                            ]

                    },

                ]
            },
            {
                component: SettingAside,
                path:'/setting',
                routes: [
                    {
                        path: '/setting/home',
                        component: SettingHome,
                    },
                    {
                        path: '/setting/mes/notice',
                        component:messageNotice,
                        exact: true,
                    },
                    {
                        path: '/setting/mes/send',
                        component:messagesendtype,
                        exact: true,
                    },
                    {
                        path: '/setting/orga',
                        component:orga,
                        exact: true,
                    },
                    {
                        path: '/setting/user',
                        component:user,
                        exact: true,
                    },
                    {
                        path: '/setting/userGroup',
                        component:group,
                        exact: true,
                    },
                    {
                        path: '/setting/dir',
                        component:userDirectory,
                        exact: true,
                    },
                    {
                        path: '/setting/role',
                        component:systemRole,
                        exact: true,
                    },
                    {
                        path: '/setting/plugin',
                        component: plugin,
                    },
                    {
                        path: '/setting/myLog',
                        component: MyLog,
                    },
                    {
                        path: '/setting/version',
                        component: Version,
                    },
                    {
                        path:'/setting/authContent',
                        component: AuthContent,
                    },
                    {
                        path:'/setting/backupRecovery',
                        component: BackupRecovery,
                    },
                    {
                        path:'/setting/scanScheme',
                        component: ScanScheme,
                    },
                    {
                        path:'/setting/scanHole/:schemeId',
                        component: ScanHole,
                    },
                    {
                        path:'/setting/holeList',
                        component: HoleList,
                    },
                    {
                        path:'/setting/agency',
                        component: RemoteAgency,
                    },
                    {
                        path:'/setting/resources',
                        component: Resources,
                    },



                    {
                        path:'/setting/systemFunction',
                        component: SystemFunction,
                    },
                    {
                        path:'/setting/projectFunction',
                        component: ProjectFunction,
                    },
                    {
                        path:'/setting/projectRole',
                        component: ProjectRole,
                    },
                    {
                        path:'/setting/systemRole',
                        component: SystemRole,
                    },
                    {
                        path:'/setting/logType',
                        component: LogType,
                    },


                    {
                        path: '/',
                        exact: true,
                        render: ()=><Redirect to="/setting/systemRole"/>
                    },
                ]
            },

        ],

    },
];

export default routers
