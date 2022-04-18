/**
 * @name: system  系统管理
 * @Systemor: limingliang
 * @date: 2021-05-21 16:51
 * @description：setting
 * @update: 2021-05-21 16:51
 */
import React,{useState} from 'react';
import {renderRoutes} from 'react-router-config'
import MenuList from "../../common/menu/menu";

const System = props => {
    const [key,setKey]=useState('')
    const {match} =props
    const menuData = [
        {
            id:'3',
            key:'3',
            title: '认证配置',
        },
        {
            id:'1',
            key:'1',
            title: '权限中心',
            children:[
                {
                    id:'1-1',
                    key:'1-1',
                    title: '角色管理',
                },
                {
                    id:'1-2',
                    key:'1-2',
                    title: '功能管理',
                }
            ]
        },
        {
            id:'2',
            key:'2',
            title: '组织中心',
            children:[
                {
                    id:'2-1',
                    key:'2-1',
                    title: '组织管理',
                },
                {
                    id:'2-2',
                    key:'2-2',
                    title: '用户管理',
                }
            ]
        }

    ]


    const onSelectMenu = e => {
        const key = e.key;

        let links = [
              {
                 key:'1-1',
                 router:`/system/projectrole`,
             },
             {
                 key:'1-2',
                 router:`/system/projectfeature`,
             },

            {
                key:'2-1',
                router:`/system/orga`,
            },
            {
                key:'2-2',
                router:`/system/user`,
            },
            {
                key:'3',
                router:`/system/accountconfig`,
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
export default System
