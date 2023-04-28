import React from 'react';
import { Redirect } from 'react-router';
import {Logout} from 'tiklab-eam-ui'
import SyncComponent from './common/lazy/SyncComponent';
import LayoutHoc from './common/layout/layout';


// 制品库设置模块
const Setting = SyncComponent(() => import('./common/navigate/RepositoryNav'));
// 制品库设置-设置模块
const LayerSetup = SyncComponent(() => import('./common/navigate/RepositorySettingNav'));


// 系统管理模块
const System = SyncComponent(() => import('./common/navigate/Setting'));
const Login = SyncComponent(() => import('./Login/components/LoginXpack'));


// 制品列表
const librarys = SyncComponent(() => import('./library/components/LibraryList'))
// 制品详情-概览
const librarySurvey = SyncComponent(() => import('./library/components/LibrarySurvey'))
// 制品详情-文件列表
const fileList = SyncComponent(() => import('./library/components/LibraryFileList'))
// 制品详情-历史版本
const libraryHistory = SyncComponent(() => import('./library/components/LibraryHistory'))


// 制品库列表
const RepositoryList = SyncComponent(() => import('./repository/repository/components/RepositoryList'))
// 制品库-创建
const RepositoryAdd = SyncComponent(() => import('./repository/repository/components/RepositoryAdd'))
//制品列表
const LibraryList = SyncComponent(() => import('./repository/library/components/LibraryList'))
//制品库-制品列表-概览
const reLibrarySurvey = SyncComponent(() => import('./repository/library/components/LibrarySurvey'))
//制品库-制品列表-文件列表
const reLibraryFileList = SyncComponent(() => import('./repository/library/components/LibraryFileList'))
//制品库-制品列表-历史版本
const reLibraryHistory = SyncComponent(() => import('./repository/library/components/LibraryHistory'))


// 制品库-概览
const repositorySurvey = SyncComponent(() => import('./repository/survey/components/Survey'))

//制品库信息
const RepositoryInfo = SyncComponent(() => import('./repository/repository/components/RepositoryUpdate'))


//配置-代理信息
const agency = SyncComponent(() => import('./repository/deploy/components/Agency'))
//配置-复制信息
const copy = SyncComponent(() => import('./repository/deploy/components/Copy'))

//制品库-成员
const programUser = SyncComponent(() => import('./repository/setting/ProgramUser'))
//制品库-权限
const programDomainRole = SyncComponent(() => import('./repository/setting/ProjectDomainRole'))

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
        path: '/',
        exact: true,
        render: ()=><Redirect to="/index/library"/>
    },
    {
        component: LayoutHoc,
        key: 'index',
        routes: [
            {
                path: '/index/library',
                component: librarys,
                exact: true,
            },
            {
                path: '/index/library/librarySurvey/:versionId',
                component: librarySurvey,
                exact: true,
            },
            {
                path: '/index/library/fileList/:versionId',
                component: fileList,
                exact: true,
            },
            {
                path: '/index/library/history/:versionId',
                component: libraryHistory,
                exact: true,
            },
            {
                path: '/index/repository',
                component: RepositoryList,
                exact: true,
            },
            {
                path: '/index/repository/add/:type',
                component: RepositoryAdd,
                exact: true,
            },
            {
                component: Setting,
                path:'/index/repository/:id',
                routes:[
                    {

                        path: '/index/repository/:id/survey',
                        component: repositorySurvey,
                        exact: true,
                    },
                    {
                        path: '/index/repository/:id/libraryList',
                        component: LibraryList,
                        exact: true,
                    },
                    {
                        path: '/index/repository/:id/libraryList/survey/:versionId',
                        component: reLibrarySurvey,
                        exact: true,
                    },
                    {
                        path: '/index/repository/:id/libraryList/file/:versionId',
                        component: reLibraryFileList,
                        exact: true,
                    },
                    {
                        path: '/index/repository/:id/libraryList/history/:versionId',
                        component: reLibraryHistory,
                        exact: true,
                    },
                    {
                        path: '/index/repository/:id/programUser',
                        component: programUser,
                        exact: true,
                    },

                    {
                        path: '/index/repository/:id/setting',
                        component: LayerSetup,
                        routes:[
                            {
                                path: '/index/repository/:id/setting/repositoryInfo',
                                component: RepositoryInfo,
                                exact: true,
                            },
                            {
                                path: '/index/repository/:id/setting/agency',
                                component: agency,
                                exact: true,
                            },
                            {
                                path: '/index/repository/:id/setting/copy',
                                component: copy,
                                exact: true,
                            },
                            {
                                path: '/index/repository/:id/setting/programDomainRole',
                                component: programDomainRole,
                                exact: true,
                            },
                            {
                                path: '/index/repository/:id/setting',
                                exact: true,
                                render: ()=><Redirect to='/index/repository/:id/setting/repositoryInfo'/>
                            },

                            ]

                    },
                    {
                        path: '/',
                        exact: true,
                        render: ()=><Redirect to="/index/library"/>
                    },
                ]
            },
            {
                component: System,
                path:'/sysmgr',
                routes: [
                    {
                        path: '/sysmgr/notice',
                        component:messageNotice,
                        exact: true,
                    },
                    {
                        path: '/sysmgr/messageSend',
                        component:messagesendtype,
                        exact: true,
                    },
                    {
                        path: '/sysmgr/orga',
                        component:orga,
                        exact: true,
                    },
                    {
                        path: '/sysmgr/user',
                        component:user,
                        exact: true,
                    },
                    {
                        path: '/sysmgr/userGroup',
                        component:group,
                        exact: true,
                    },
                    {
                        path: '/sysmgr/user/directory',
                        component:userDirectory,
                        exact: true,
                    },
                    {
                        path: '/sysmgr/systemRole',
                        component:systemRole,
                        exact: true,
                    },
                    {
                        path: '/sysmgr/plugin',
                        component: plugin,
                    },
                    {
                        path: '/sysmgr/logList',
                        component: MyLog,
                    },
                    {
                        path: '/sysmgr/version',
                        component: Version,
                    },
                    {
                        path: '/',
                        exact: true,
                        render: ()=><Redirect to="sysmgr/systemRole"/>
                    },
                ]
            },
        ],
    },


];

export default routers
