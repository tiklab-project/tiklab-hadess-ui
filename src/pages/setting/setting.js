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
import {CopyOutlined, MessageOutlined} from "@ant-design/icons";
const Setting = props => {
    const [key,setKey]=useState('')
    const {match} =props
    const menuData = [

        {
            id:'2',
            key:'2',
            title: '会员管理',
            icon:<MessageOutlined /> ,
            children:[
                {
                    id:'2-1',
                    key:'2-1',
                    title: '会员列表',
                },
                {
                    id:'2-2',
                    key:'2-2',
                    title: '会员统计',
                },
            ]
        },
        {
            id:'3',
            key:'3',
            title: '企业管理',
            icon:<MessageOutlined /> ,
            children:[
                {
                    id:'3-1',
                    key:'3-1',
                    title: '企业列表',
                },
                {
                    id:'3-2',
                    key:'3-2',
                    title: '企业统计',
                },
                {
                    id:'3-3',
                    key:'3-3',
                    title: 'db数据源管理',
                },
                {
                    id:'3-4',
                    key:'3-4',
                    title: 'dss数据源管理',

                }
            ]
        },
        {
            id:'4',
            key:'4',
            title: '产品管理',
            icon:<MessageOutlined /> ,
        },
        {
            id:'5',
            key:'5',
            title: '订阅管理',
            icon:<MessageOutlined />,
            children:[
                {
                    id:'5-1',
                    key:'5-1',
                    title: '订阅列表',
                },
                {
                    id:'5-2',
                    key:'5-2',
                    title: '订单管理',
                },
                {
                    id:'5-3',
                    key:'5-3',
                    title: '发票管理',
                },
                {
                    id:'5-4',
                    key:'5-4',
                    title: '对公转账支付',
                },
                {
                    id:'5-5',
                    key:'5-5',
                    title: '优惠卷管理',
                },
                {
                    id:'5-6',
                    key:'5-6',
                    title: '订单统计',
                },
                {
                    id:'5-7',
                    key:'5-7',
                    title: '支付统计',
                },
            ]
        },

        {
            id:'6',
            key:'6',
            title: '内容管理',
            icon:<MessageOutlined />,
            children:[
                {
                    id:'6-1',
                    key:'6-1',
                    title: '文档管理',

                },
                {
                    id:'6-2',
                    key:'6-2',
                    title: '插件管理',
                },
                {
                    id:'6-3',
                    key:'6-3',
                    title: '博客管理',

                },
                {
                    id:'6-4',
                    key:'6-4',
                    title: '浏览量统计',
                }

            ]},
        {
            id:'7',
            key:'7',
            title: '服务与支持',
            icon:<MessageOutlined />,
        },
    ]


    const onSelectMenu = e => {
        const key = e.key;

        let links = [

            {
                key:'2-1',
                router:`/index/member`,
            },
            {
                key:'2-2',
                router:`/index/memberStatistics`,
            },
            {
                key:'3-1',
                router:`/index/tenant`,
            },
            {
                key:'3-2',
                router:`/index/tenantStatistics`,
            },
            {
                key:'3-3',
                router:'/index/sourceManage/manageDb',
            },
            {
                key:'3-4',
                router:`/index/sourceManage/manageDss`,
            },
            {
                key:'4',
                router:`/index/productList`,
            },
            {
                key:'5-1',
                router:`/index/subscribe`,
            },
            {
                key:'5-2',
                router:`/index/order`,
            },
            {
                key:'5-3',
                router:`/index/invoiceManage`,
            },
            {
                key:'5-4',
                router:`/index/publicTransfer`,
            },
            {
                key:'5-5',
                router:`/index/coupon`,
            },
            {
                key:'5-6',
                router:`/index/orderStatistics`,
            },
            {
                key:'5-7',
                router:`/index/payStatistics`,
            },
            {
                key:'6-1',
                router:`/index/documentList`,
            },

            {
                key:'6-2',
                router:`/index/plugList`,
            },
            {
                key:'6-3',
                router:`/index/blogList`,
            },
            {
                key:'6-4',
                router:`/index/viewStatistics`,
            },

            {
                key:'7',
                router:`/index/workOrder`,
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
        <div className='system'>
            <div className={'setting-height'}>
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
