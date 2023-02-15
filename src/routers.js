
import React from 'react';
import { Redirect } from 'react-router';
import {Logout} from 'tiklab-eam-ui'
import SyncComponent from './common/lazy/SyncComponent';
import LayoutHoc from './layout/layout';

//home 首页
const Home = SyncComponent(() => import('./pages/home/home'));

// 设置运营管理模块
const Setting = SyncComponent(() => import('./pages/setting/setting'));

// 系统管理模块
const System = SyncComponent(() => import('./pages/setting/system'));

const Login = SyncComponent(() => import('./pages/Login'));
// 制品库列表
const librarys = SyncComponent(() => import('./pages/library/libraryList'))
// 制品详情-概览
const librarySurvey = SyncComponent(() => import('./pages/library/librarySurvey'))
// 制品详情-文件列表
const fileList = SyncComponent(() => import('./pages/library/libraryFileList'))
// 制品详情-历史版本
const libraryHistory = SyncComponent(() => import('./pages/library/libraryHistory'))


// 制品库列表
const RepositoryList = SyncComponent(() => import('./pages/warehouse/repository/repositoryList'))
//制品列表
const LibraryList = SyncComponent(() => import('./pages/warehouse/library/libraryList'))
//制品库-制品列表-概览
const reLibrarySurvey = SyncComponent(() => import('./pages/warehouse/library/librarySurvey'))
//制品库-制品列表-文件列表
const reLibraryFileList = SyncComponent(() => import('./pages/warehouse/library/libraryFileList'))
//制品库-制品列表-历史版本
const reLibraryHistory = SyncComponent(() => import('./pages/warehouse/library/libraryHistory'))

// 制品地址
const warehouse = SyncComponent(() => import('./pages/warehouse'))

// 制品库-概览
const repositorySurvey = SyncComponent(() => import('./pages/warehouse/survey/survey'))

//配置-详情
const repositoryCompile = SyncComponent(() => import('./pages/warehouse/deploy/repositoryCompile'))
//配置-代理信息
const agency = SyncComponent(() => import('./pages/warehouse/deploy/agency'))
//配置-复制信息
const copy = SyncComponent(() => import('./pages/warehouse/deploy/copy'))

//制品库-成员
const programUser = SyncComponent(() => import('./pages/program/user/programUser'))
//制品库-权限
const programDomainRole = SyncComponent(() => import('./pages/program/user/programDomainRole'))

//设置-消息配置发送方式
const messageSendType =SyncComponent(()=>import('./pages/sysmgr/message/messagesendtype'))
//设置-消息类型
const messageType =SyncComponent(()=>import('./pages/sysmgr/message/messageType'))
//设置-消息模版
const messageTemplate =SyncComponent(()=>import('./pages/sysmgr/message/messageTemplate'))
//设置-消息管理 （发送）
const messageManagement =SyncComponent(()=>import('./pages/sysmgr/message/messageManagement'))


//设置-组织管理
const orga =SyncComponent(()=>import('./pages/sysmgr/organ/orga'))
//设置-组织管理
const user =SyncComponent(()=>import('./pages/sysmgr/organ/user'))
//设置-用户目录
const userDirectory =SyncComponent(()=>import('./pages/sysmgr/organ/userDirectory'))
//设置-权限
const systemRole =SyncComponent(()=>import('./pages/sysmgr/role/systemRole'))
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
        component: LayoutHoc,
        key: 'index',
        routes: [
            {
                path: '/index/home',
                component: Home,
                exact: true,
            },
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
                path: '/index/warehouse/:repository',
                component: warehouse,
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
                        path: '/index/repository/:id/compile',
                        component: repositoryCompile,
                        exact: true,
                    },
                    {
                        path: '/index/repository/:id/agency',
                        component: agency,
                        exact: true,
                    },
                    {
                        path: '/index/repository/:id/copy',
                        component: copy,
                        exact: true,
                    },
                    {
                        path: '/index/repository/:id/programUser',
                        component: programUser,
                        exact: true,
                    },
                    {
                        path: '/index/repository/:id/programDomainRole',
                        component: programDomainRole,
                        exact: true,
                    },
                    {
                        path: '/',
                        exact: true,
                        render: ()=><Redirect to="/index/home"/>
                    },
                ]
            },
            {
                component: System,
                path:'/sysmgr',
                routes: [
                    {
                        path: '/sysmgr/messageSendType',
                        component:messageSendType,
                        exact: true,
                    },
                    {
                        path: '/sysmgr/messageType',
                        component:messageType,
                        exact: true,
                    },
                    {
                        path: '/sysmgr/messageTemplate',
                        component:messageTemplate,
                        exact: true,
                    },
                    {
                        path: '/sysmgr/messageManagement',
                        component:messageManagement,
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
                        path: '/',
                        exact: true,
                        render: ()=><Redirect to="/sysmgr/orga"/>
                    },
                ]
            }
        ],
    },


];

export default routers
