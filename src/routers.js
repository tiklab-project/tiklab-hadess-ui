
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

/*// 权限模块  (角色管理)
const ProjectFeature = SyncComponent(() => import('./pages/system/projectFeature/projectFeature'));
const ProjectSystemRole = SyncComponent(() => import('./pages/system/projectSystemRole/projectSystemRole'));*/

// 认证配置
const AuthConfig = SyncComponent(() => import('./pages/authConfig/authConfig'));

// 订阅服务
const Subscribe = SyncComponent(() => import('./pages/subscription'))
// 订阅服务详情
const SubscribeDetails = SyncComponent(() => import('./pages/subscription/subscribeDetails'))

// 订单管理
const Orders = SyncComponent(() => import('./pages/orders'))
// 订单详情
const OrdersDetails = SyncComponent(() => import('./pages/orders/orderDetails'))

// 产品
const Product = SyncComponent(() => import('./pages/product'))
// 产品详情
const ProductDetails = SyncComponent(() => import('./pages/product/productDetails'))
// 产品版本
const compileVersion = SyncComponent(() => import('./pages/product/compileVersion'))

// 会员管理
const Member = SyncComponent(() => import('./pages/member'))
//会员详情
const MemberDetails = SyncComponent(() => import('./pages/member/old/details'))
//添加会员
const addMember = SyncComponent(() => import('./pages/member/addMember'))

// 租户管理
const Tenant = SyncComponent(() => import('./pages/tenant'))
//租户详情
const TenantDetails = SyncComponent(() => import('./pages/tenant/tenantDetails'))

// 活动管理列表
const activityList = SyncComponent(() => import('./pages/promotion/activity/activityList'))
// 活动编辑
const compileActivity = SyncComponent(() => import('./pages/promotion/activity/compileActivity'))
//优惠券列表
const CouponList = SyncComponent(() => import('./pages/promotion/coupon/CouponList'))
//编辑现金卷  （创建和修改）
const compileCashVolume = SyncComponent(() => import('./pages/promotion/coupon/compileCashVolume'))
//优惠券详情
const couponDetails = SyncComponent(() => import('./pages/promotion/coupon/couponDetails'))


//订单统计管理
const OrderStatistics = SyncComponent(() => import('./pages/statistics/orderStatistics'))
//浏览量统计管理
const ViewStatistics = SyncComponent(() => import('./pages/statistics/viewStatistics'))
//会员统计管理
const MemberStatistics = SyncComponent(() => import('./pages/statistics/memberStatistics'))
//支付统计管理
const PayStatistics = SyncComponent(() => import('./pages/statistics/payStatistics'))
//租户统计管理
const TenantStatistics = SyncComponent(() => import('./pages/statistics/tenantStatistics'))

//文档列表
const Repository = SyncComponent(() => import('./pages/document/documentList'))
//文档
const Document = SyncComponent(() => import('./pages/document/document'))
//编辑文档  （修改或删除）
const compileDocument = SyncComponent(() => import('./pages/document/compileDocument'))

//插件列表
const plugList = SyncComponent(() => import('./pages/plug/plugList'))
//编辑插件  添加、更新
const compilePlugVersion = SyncComponent(() => import('./pages/plug/compilePlugVersion'))
//插件详情
const plugDetails = SyncComponent(() => import('./pages/plug/plugDetails'))

const Login = SyncComponent(() => import('./pages/Login'));

//发票管理
const InvoiceManage = SyncComponent(() => import('./pages/invoice/invoiceManage'))

//工单管理
const workOrderList = SyncComponent(() => import('./pages/workOrder/workOrderList'))
//工单详情
const workOrderDetails = SyncComponent(() => import('./pages/workOrder/workOrderDetails'))

//数据源管理- db list
const dbSourceList = SyncComponent(() => import('./pages/sourceManage/manageDb/dbSourceList'))
//数据源管理- tenantDb list
const tenantDbList = SyncComponent(() => import('./pages/sourceManage/manageDb/dbSourceDetails'))
//数据源管理- dss list
const dssSourceList = SyncComponent(() => import('./pages/sourceManage/manageDss/dssSourceList'))
//数据源管理- tenantDss list
const tenantDssList = SyncComponent(() => import('./pages/sourceManage/manageDss/dssSourceDetails'))

//对公转账订单管理
const publicTransferList =SyncComponent(()=>import('./pages/publicTransfer/publicTransferList'))

//博客列表
const blogList =SyncComponent(()=>import('./pages/blog/blogList'))
//博客列表
const compileBlog =SyncComponent(()=>import('./pages/blog/compileBlog'))

//homes-消息配置发送方式
const homesMessageSendType =SyncComponent(()=>import('./pages/message/homesMessagesendtype'))
//homes-消息类型
const homesMessageType =SyncComponent(()=>import('./pages/message/homesMessageType'))
//homes-消息模版
const homesMessageTemplate =SyncComponent(()=>import('./pages/message/homesMessageTemplate'))


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
                component: Setting,
                path:'/index',
                routes:[
                    {
                        path: '/index/member',
                        component: Member,
                        exact: true,
                    },
                    {
                        path: '/index/member/details',
                        component: MemberDetails,
                        exact: true,
                    },
                    {
                        path: '/index/member/addmember',
                        component: addMember,
                        exact: true,
                    },
                    {
                        path: '/index/tenant',
                        component:Tenant ,
                        exact: true,
                    },
                    {
                        path: '/index/tenant/details',
                        component:TenantDetails ,
                        exact: true,
                    },
                    {
                        path: '/index/sourceManage/manageDb',
                        component: dbSourceList,
                        exact: true,
                    },
                    {
                        path: '/index/sourceManage/manageDb/details/:id',
                        component: tenantDbList,
                        exact: true,
                    },
                    {
                        path: '/index/sourceManage/manageDss',
                        component: dssSourceList,
                        exact: true,
                    },
                    {
                        path: '/index/sourceManage/manageDss/details/:id/:type',
                        component:tenantDssList,
                        exact: true,
                    },
                    {
                        path: '/index/productList',
                        component: Product,
                        exact: true,
                    },
                    {
                        path: '/index/product/detail/:productId/:type',
                        component: ProductDetails,
                        exact: true,
                    },
                    {
                        path: '/index/product/compileVersion',
                        component: compileVersion,
                        exact: true,
                    },
                    {
                        path: '/index/subscribe',
                        component: Subscribe,
                        exact: true,
                    },
                    {
                        path: '/index/subscribe/details',
                        component: SubscribeDetails,
                        exact: true,
                    },
                    {
                        path: '/index/order',
                        component: Orders,
                        exact: true,
                    },
                    {
                        path: '/index/order/details',
                        component: OrdersDetails,
                        exact: true,
                    },
                    {
                        path: '/index/invoiceManage',
                        component: InvoiceManage,
                        exact: true,
                    },

                    {
                        path: '/index/publicTransfer',
                        component:publicTransferList,
                        exact: true,
                    },
                    {
                        path: '/index/coupon',
                        component:CouponList ,
                        exact: true,
                    },
                    {
                        path: '/index/activity',
                        component:activityList ,
                        exact: true,
                    },
                    {
                        path: '/index/activity/compileActivity',
                        component:compileActivity ,
                        exact: true,
                    },
                    {
                        path: '/index/coupon/details',
                        component:couponDetails ,
                        exact: true,
                    },
                    {
                        path: '/index/coupon/compileCoupon',
                        component:compileCashVolume ,
                        exact: true,
                    },
                   /* {
                        path: '/index/activity',
                        component:activityList ,
                        exact: true,
                    },
                    {
                        path: '/index/activity/compileActivity',
                        component:compileActivity ,
                        exact: true,
                    },*/
                    {
                        path: '/index/orderStatistics',
                        component:OrderStatistics ,
                        exact: true,
                    },
                    {
                        path: '/index/viewStatistics',
                        component:ViewStatistics ,
                        exact: true,
                    },
                    {
                        path: '/index/memberStatistics',
                        component:MemberStatistics ,
                        exact: true,
                    },
                    {
                        path: '/index/payStatistics',
                        component:PayStatistics ,
                        exact: true,
                    },
                    {
                        path: '/index/tenantStatistics',
                        component:TenantStatistics ,
                        exact: true,
                    },
                    {
                        path: '/index/documentList',
                        component:Repository ,
                        exact: true,
                    },
                    {
                        path: '/index/document/details',
                        component:Document ,
                        exact: true,
                    },
                    {
                        path: '/index/document/compileDocument',
                        component:compileDocument ,
                        exact: true,
                    },
                    {
                        path: '/index/plugList',
                        component:plugList ,
                        exact: true,
                    },
                    {
                        path: '/index/plug/compileVersion/:plugId',
                        component:compilePlugVersion ,
                        exact: true,
                    },
                    {
                        path: '/index/plug/details/:plugId',
                        component:plugDetails ,
                        exact: true,
                    },
                    {
                        path: '/index/blogList',
                        component:blogList ,
                        exact: true,
                    },
                    {
                        path: '/index/blog/compileBlog/:id',
                        component:compileBlog ,
                        exact: true,
                    },
                    {
                        path: '/index/workOrder',
                        component: workOrderList,
                        exact: true,
                    },
                    {
                        path: '/index/workOrder/details',
                        component: workOrderDetails,
                        exact: true,
                    },

                    {
                        path: '/index/messageSendType',
                        component:homesMessageSendType ,
                        exact: true,
                    },
                    {
                        path: '/index/messageType',
                        component:homesMessageType ,
                        exact: true,
                    },
                    {
                        path: '/index/messageTemplate',
                        component:homesMessageTemplate ,
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
