/**
 * @name: setting
 * @author: mahai
 * @date: 2021-05-21 16:51
 * @description：setting
 * @update: 2021-05-21 16:51
 */
import React,{useState,useEffect} from 'react';
import {renderRoutes} from 'react-router-config'
import MenuList from "../../common/menu/menu";
import './setting.scss'
import {CopyOutlined, MessageOutlined} from "@ant-design/icons";
const Setting = props => {
    const [key,setKey]=useState('')
    const {match} =props
    const repositoryId = props.match.params.id;      // 当前选中路由
    const [type,setType]=useState('')   //左侧导航览类型

    useEffect(async () => {
        compileType()
    }, []);

    const compileType = () => {
        if (props.location.pathname.includes("/compile")) {
            setType("3")
        }
        if (props.location.pathname.includes("/survey")){
            setType("1")
        }
    }
    const menuData = [
        {
            id:'1',
            key:'1',
            title: '概览',
            icon:<MessageOutlined /> ,
        },
        {
            id:'2',
            key:'2',
            title: '制品列表',
            icon:<MessageOutlined /> ,
        },
        {
            id:'3',
            key:'3',
            title: '配置',
            icon:<MessageOutlined /> ,
        },
        {
            id:'4',
            key:'4',
            title: '成员',
            icon:<MessageOutlined />,
        },
        {
            id:'5',
            key:'5',
            title: '权限',
            icon:<MessageOutlined />,
        }
    ]

    let scrumRouter = [
        {
            key:'1',
            title: '概览',
            router:`/index/repository/${repositoryId}/survey`,
        },
        {
            key:'2',
            title: '制品列表',
            router:`/index/repository/${repositoryId}/libraryList`,
        },
        {
            key:'3',
            title: '配置',
            router:`/index/repository/${repositoryId}/compile`,
        },
        {
            key:'4',
            title: '成员',
            router:`/index/repository/${repositoryId}/programUser`,
        },
        {
            key:'5',
            title: '权限',
            router:`/index/repository/${repositoryId}/programDomainRole`,
        }];

    const onSelectMenu = e => {
        const key = e.key;

        let links = [

            {
                key:'1',
                title: '概览',
                router:`/index/member`,
            },
            {
                key:'2',
                title: '制品列表',
                router:`/index/repository/:id/libraryList`,
            },
            {
                key:'3',
                title: '配置',
                router:`/index/tenant`,
            },
            {
                key:'4',
                title: '成员',
                router:`/index/tenantStatistics`,
            },
            {
                key:'5',
                title: '权限',
                router:'/index/sourceManage/manageDb',
            }];
        onSelectMenuSetting(props.history, key, links)
        setKey(key)
    }

    const onSelectMenuSetting = (history, key, links) => {
        const index = links.findIndex(item => item.key === key)
        history.push(links[index].router)
    }

    //切换类型
    const cuteType =async (value) => {
        setType(value.key)
        props.history.push(value.router)
    }

    return (
        <div className='system'>
            <div className={'setting-height '}>
               {/* <MenuList
                    data={menuData}
                    onSelectMenu={onSelectMenu}
                    defaultSelectedKeys={[key]}
                />*/}
                {scrumRouter?.map(item=>{
                    return(
                        <div key={item.key} className={`${type===item.key&&' choice-table'} my-2 py-2 cursor-pointer hover:bg-gray-200 `} onClick={()=>cuteType(item)} >
                            <div className='text-center'>
                                {item.title}
                            </div>
                        </div>
                    )
                })
                }
            </div>
            <div  className={'setting_right_height'}>
                {renderRoutes(props.route.routes)}
            </div>
        </div>
    )
};
export default Setting
