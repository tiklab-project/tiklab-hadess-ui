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
            id:'1',
            key:'1',
            title: '产品管理',
            icon:<CopyOutlined />
        },
        {
            id:'2',
            key:'2',
            title: '订阅中心',
            icon:<MessageOutlined />,
            children:[
                {
                    id:'2-1',
                    key:'2-1',
                    title: '服务订阅',
                },
                {
                    id:'2-2',
                    key:'2-2',
                    title: '订单管理',
                },
                {
                    id:'2-3',
                    key:'2-3',
                    title: '发票管理',
                },
            ]
        },
        {
            id:'3',
            key:'3',
            title: '用户中心',
            icon:<MessageOutlined /> ,
            children:[
                {
                    id:'3-1',
                    key:'3-1',
                    title: '会员管理',
                },
                {
                    id:'3-2',
                    key:'3-2',
                    title: '租户管理',
                }
            ]
        },
        {
            id:'6',
            key:'6',
            title: '促销管理',
            icon:<MessageOutlined />,
            children:[
                {
                    id:'6-1',
                    key:'6-1',
                    title: '活动管理',
                },
                {
                    id:'6-2',
                    key:'6-2',
                    title: '优惠卷管理',
                },

            ]},

        {
            id:'7',
            key:'7',
            title: '文档管理',
            icon:<MessageOutlined />
        },
        {
           id:'8',
           key:'8',
           title: '统计管理',
            icon:<MessageOutlined />,
           children:[
               {
                   id:'8-1',
                   key:'8-1',
                   title: '会员统计',
               },
               {
                   id:'8-2',
                   key:'8-2',
                   title: '租户统计',
               },
               {
                   id:'8-3',
                   key:'8-3',
                   title: '订单统计',
               },
               {
                   id:'8-4',
                   key:'8-4',
                   title: '支付统计',
               },
               {
                   id:'8-5',
                   key:'8-5',
                   title: '浏览量统计',
               }

           ]
       },

        {
            id:'10',
            key:'10',
            title: '在线工单',
            icon:<MessageOutlined />,
        },
        {
            id:'11',
            key:'11',
            title: '数据源管理',
            icon:<MessageOutlined />,
            children:[
                {
                    id:'11-1',
                    key:'11-1',
                    title: 'db数据源管理',
                },
                {
                    id:'11-2',
                    key:'11-2',
                    title: 'dss数据源管理',

                }]
        },
        {
            id:'12',
            key:'12',
            title: '对公转账支付',
            icon:<MessageOutlined />,
        },
    ]


    const onSelectMenu = e => {
        const key = e.key;

        let links = [
            {
                key:'1',
                router:`/`,
            },
            {
                key:'2-1',
                router:`/setting/subscribe`,
            },
            {
                key:'2-2',
                router:`/setting/order`,
            },
            {
                key:'2-3',
                router:`/setting/invoiceManage`,
            },
            {
                key:'3-1',
                router:`/setting/member`,
            },
            {
                key:'3-2',
                router:`/setting/tenant`,
            },

            {
                key:'6-1',
                router:`/setting/activity`,
            },
            {
                key:'6-2',
                router:`/setting/activity/cashVolumeList`,
            },
            {
                key:'7',
                router:`/setting/documentList`,
            },
            {
                key:'8-1',
                router:`/setting/memberStatistics`,
            },
            {
                key:'8-2',
                router:`/setting/tenantStatistics`,
            },
              {
               key:'8-3',
               router:`/setting/orderStatistics`,
           },
            {
                key:'8-4',
                router:`/setting/payStatistics`,
            },
            {
                key:'8-5',
                router:`/setting/viewStatistics`,
            },

            {
                key:'10',
                router:`/setting/workOrder`,
            },
            {
                key:'11-1',
                router:'/setting/sourceManage/manageDb',
            },
            {
                key:'11-2',
                router:`/setting/sourceManage/manageDss`,
            },
            {
                key:'12',
                router:`/setting/publicTransfer`,
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
        <div className='flex'>
            <div className={'setting-height'}>
                <MenuList
                    data={menuData}
                    onSelectMenu={onSelectMenu}
                    defaultSelectedKeys={[key]}
                />
            </div>

            <div style={{width:'100%'}} className={'setting_right_height'}>
                {renderRoutes(props.route.routes)}
            </div>
        </div>
    )
};
export default Setting
