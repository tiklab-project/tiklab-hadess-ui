
import React from 'react';
import { Redirect } from 'react-router';
import {Logout} from 'doublekit-eam-ui'
import SyncComponent from './common/lazy/SyncComponent';
import LayoutHoc from './layout/layout';
// 设置运营管理模块
const Setting = SyncComponent(() => import('./pages/setting/setting'));

// 系统管理模块
const System = SyncComponent(() => import('./pages/setting/system'));

// 权限模块
const ProjectFeature = SyncComponent(() => import('./pages/system/projectFeature/projectFeature'));
const ProjectSystemRole = SyncComponent(() => import('./pages/system/projectSystemRole/projectSystemRole'));

// 组织模块
const OrgaManagement = SyncComponent(() => import('./pages/orga/orgaManagement/org'));
const UserManagement = SyncComponent(() => import('./pages/orga/userManagement/userManagement'));

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
const addVersion = SyncComponent(() => import('./pages/product/addVersion'))

// 会员管理
const Member = SyncComponent(() => import('./pages/member'))
//会员详情
const MemberDetails = SyncComponent(() => import('./pages/member/details'))

// 租户管理
const Tenant = SyncComponent(() => import('./pages/tenant'))
//租户详情
const TenantDetails = SyncComponent(() => import('./pages/tenant/tenantDetails'))

// 活动管理列表
const activityList = SyncComponent(() => import('./pages/promotion/activity/activityList'))
// 活动编辑
const compileActivity = SyncComponent(() => import('./pages/promotion/activity/compileActivity'))
//现金卷列表
const cashVolumeList = SyncComponent(() => import('./pages/promotion/coupon/cashVolumeList'))
//编辑现金卷  （创建和修改）
const compileCashVolume = SyncComponent(() => import('./pages/promotion/coupon/compileCashVolume'))
//现金卷详情
const cashVolumeDetails = SyncComponent(() => import('./pages/promotion/coupon/cashVolumeDetails'))


//统计管理
const Statistics = SyncComponent(() => import('./pages/statistics'))
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
//创建文档
const AddDocument = SyncComponent(() => import('./pages/document/create/createDocument'))
//修改文档
const UpdateDocument = SyncComponent(() => import('./pages/document/update/updateDocument'))
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
const tenantDbList = SyncComponent(() => import('./pages/sourceManage/manageDb/tenantDbList'))
//数据源管理- dss list
const dssSourceList = SyncComponent(() => import('./pages/sourceManage/manageDss/dssSourceList'))
//数据源管理- tenantDss list
const tenantDssList = SyncComponent(() => import('./pages/sourceManage/manageDss/tenantDssList'))

//对公转账订单管理
const publicTransferList =SyncComponent(()=>import('./pages/publicTransfer/publicTransferList'))

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
        key: 'setting',
        routes: [
            {
                component: Setting,
                path:'/setting',
                routes:[
                    {
                        path: '/setting/subscribe',
                        component: Subscribe,
                        exact: true,
                    },
                    {
                        path: '/setting/subscribe/details',
                        component: SubscribeDetails,
                        exact: true,
                    },
                    {
                        path: '/setting/order',
                        component: Orders,
                        exact: true,
                    },
                    {
                        path: '/setting/order/details',
                        component: OrdersDetails,
                        exact: true,
                    },
                    {
                        path: '/setting/product',
                        component: Product,
                        exact: true,
                    },
                    {
                        path: '/setting/product/detail',
                        component: ProductDetails,
                        exact: true,
                    },
                    {
                        path: '/setting/product/addVersion',
                        component: addVersion,
                        exact: true,
                    },
                    {
                        path: '/setting/user',
                        component: UserManagement,
                        exact: true,
                    },
                    {
                        path: '/setting/orga',
                        component: OrgaManagement,
                        exact: true,
                    },
                    {
                        path: '/setting/member',
                        component: Member,
                        exact: true,
                    },
                    {
                        path: '/setting/member/details',
                        component: MemberDetails,
                        exact: true,
                    },
                    {
                        path: '/setting/tenant',
                        component:Tenant ,
                        exact: true,
                    },
                    {
                        path: '/setting/tenant/tenantDetails',
                        component:TenantDetails ,
                        exact: true,
                    },
                    {
                        path: '/setting/activity',
                        component:activityList ,
                        exact: true,
                    },
                    {
                        path: '/setting/activity/compileActivity',
                        component:compileActivity ,
                        exact: true,
                    },
                    {
                        path: '/setting/activity/cashVolumeList',
                        component:cashVolumeList ,
                        exact: true,
                    },
                    {
                        path: '/setting/activity/cashVolumeDetails',
                        component:cashVolumeDetails ,
                        exact: true,
                    },
                    {
                        path: '/setting/activity/compileCashVolume',
                        component:compileCashVolume ,
                        exact: true,
                    },
                    {
                        path: '/setting/statistics',
                        component:Statistics ,
                        exact: true,
                    },
                    {
                        path: '/setting/orderStatistics',
                        component:OrderStatistics ,
                        exact: true,
                    },
                    {
                        path: '/setting/viewStatistics',
                        component:ViewStatistics ,
                        exact: true,
                    },
                    {
                        path: '/setting/memberStatistics',
                        component:MemberStatistics ,
                        exact: true,
                    },
                    {
                        path: '/setting/payStatistics',
                        component:PayStatistics ,
                        exact: true,
                    },
                    {
                        path: '/setting/tenantStatistics',
                        component:TenantStatistics ,
                        exact: true,
                    },
                    {
                        path: '/setting/documentList',
                        component:Repository ,
                        exact: true,
                    },
                    {
                        path: '/setting/document/details',
                        component:Document ,
                        exact: true,
                    },
                    {
                        path: '/setting/document/addDocument',
                        component:AddDocument ,
                        exact: true,
                    },
                    {
                        path: '/setting/document/updateDocument',
                        component:UpdateDocument ,
                        exact: true,
                    },
                    {
                        path: '/setting/document/updateDocument',
                        component:UpdateDocument ,
                        exact: true,
                    },
                    {
                        path: '/setting/invoiceManage',
                        component: InvoiceManage,
                        exact: true,
                    },
                    {
                        path: '/setting/workOrder',
                        component: workOrderList,
                        exact: true,
                    },
                    {
                        path: '/setting/workOrder/details',
                        component: workOrderDetails,
                        exact: true,
                    },
                    {
                        path: '/setting/sourceManage/manageDb',
                        component: dbSourceList,
                        exact: true,
                    },
                    {
                        path: '/setting/sourceManage/manageDb/tenantManageDb',
                        component: tenantDbList,
                        exact: true,
                    },
                    {
                        path: '/setting/sourceManage/manageDss',
                        component: dssSourceList,
                        exact: true,
                    },
                    {
                        path: '/setting/sourceManage/manageDss/tenantManageDss',
                        component:tenantDssList,
                        exact: true,
                    },
                    {
                        path: '/setting/publicTransfer',
                        component:publicTransferList,
                        exact: true,
                    },
                    {
                        path: '/setting',
                        exact: true,
                        render: ()=><Redirect to="/setting/subscribe"/>
                    },
                ]
            },
            {
                component: System,
                path:'/system',
                routes: [
                    {
                        path: '/system/accountconfig',
                        component: AuthConfig,
                        exact: true,
                    },
                    {
                        path: '/system/projectfeature',
                        component: ProjectFeature,
                        exact: true,
                    },

                    {
                        path: '/system/projectrole',
                        component: ProjectSystemRole,
                        exact: true,
                    },
                    {
                        path: '/system/orga',
                        component:OrgaManagement,
                        exact: true
                    },
                    {
                        path: '/system',
                        exact: true,
                        render: ()=><Redirect to="/system/accountconfig"/>
                    },
                ]
            }
        ],
    },


];

export default routers
