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

const Setting = props => {
    const [key,setKey]=useState('')
    const {match} =props
    const menuData = [
        {
            id:'1',
            key:'1',
            title: '服务订阅',

        },
        {
            id:'2',
            key:'2',
            title: '订单管理',
        },

        {
            id:'3',
            key:'3',
            title: '产品管理',
        },
        {
            id:'4',
            key:'4',
            title: '租户管理',
        }
        ,
        {
            id:'5',
            key:'5',
            title: '会员管理',
        },
        {
            id:'7',
            key:'7',
            title: '文档管理',
        },
       /* {
            id:'6',
            key:'6',
            title: '统计管理',
        },*/
        {
           id:'6',
           key:'6',
           title: '统计管理',
           children:[
               {
                   id:'6-1',
                   key:'6-1',
                   title: '会员统计',
               },
               {
                   id:'6-2',
                   key:'6-2',
                   title: '租户统计',
               },
               {
                   id:'6-3',
                   key:'6-3',
                   title: '订单统计',
               },
               {
                   id:'6-4',
                   key:'6-4',
                   title: '支付统计',
               },
               {
                   id:'6-5',
                   key:'6-5',
                   title: '浏览量统计',
               }

           ]
       },
        {
            id:'8',
            key:'8',
            title: '发票管理',
        },
        {
            id:'9',
            key:'9',
            title: '在线工单',
        },

    ]


    const onSelectMenu = e => {
        const key = e.key;

        let links = [
            {
                key:'1',
                router:`/setting/subscribe`,
            },

            {
                key:'2',
                router:`/setting/order`,
            },

            {
                key:'3',
                router:`/setting/product`,
            },
            {
                key:'4',
                router:`/setting/tenant`,
            },
            {
                key:'5',
                router:`/setting/member`,
            },
            {
                key:'7',
                router:`/setting/documentList`,
            },
            {
                key:'6-1',
                router:`/setting/memberStatistics`,
            },
            {
                key:'6-2',
                router:`/setting/tenantStatistics`,
            },
              {
               key:'6-3',
               router:`/setting/orderStatistics`,
           },
            {
                key:'6-4',
                router:`/setting/payStatistics`,
            },
            {
                key:'6-5',
                router:`/setting/viewStatistics`,
            },
            {
                key:'6',
                router:`/setting/statistics`,
            },
            {
                key:'8',
                router:`/setting/invoiceManage`,
            },
            {
                key:'9',
                router:`/setting/workOrder`,
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
        <div style={{    display: 'flex',height: '100%'}}>

            <MenuList
                data={menuData}
                onSelectMenu={onSelectMenu}
                defaultSelectedKeys={[key]}
            />
            <div style={{width:'100%'}}>
                {renderRoutes(props.route.routes)}
            </div>
        </div>
    )
};
export default Setting
