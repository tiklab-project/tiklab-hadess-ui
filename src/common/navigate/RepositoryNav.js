/**
 * @name: xpack 制品库左侧导航栏
 * @author: limingliang
 * @date: 2022-05-21 16:51
 * @description：setting
 * @update: 2022-05-21 16:51
 */
import React,{useState,useEffect} from 'react';
import {renderRoutes} from 'react-router-config'
import './RepositoryNav.scss'
import {CaretDownOutlined, CodeOutlined, SettingOutlined} from "@ant-design/icons";
import {Profile} from "tiklab-eam-ui";
import ChangeRepository from "./ChangeRepository";
const RepositoryNav = props => {
    const [key,setKey]=useState('')
    const {match} =props
    const repositoryId = props.match.params.id;      // 当前选中路由
    const [type,setType]=useState('2')   //左侧导航览类型
    const [openState,setOpenState]=useState(false)

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

    let scrumRouter = [
        /*{
            key:'1',
            title: '概览',
            router:`/index/repository/${repositoryId}/survey`,
            icon:   <SettingOutlined className='icon-nav'/>

        },*/
        {
            key:'2',
            title: '制品',
            router:`/index/repository/${repositoryId}/libraryList`,
            icon:   <CodeOutlined className='icon-nav'/>
        },
        {
            key:'3',
            title: '成员',
            router:`/index/repository/${repositoryId}/programUser`,
            icon:   <SettingOutlined className='icon-nav'/>
        }];


    const onSelectMenuSetting = (history, key, links) => {
        const index = links.findIndex(item => item.key === key)
        history.push(links[index].router)
    }

    //切换类型
    const cuteType =async (value) => {
        setType(value.key)
        props.history.push(value.router)
    }

    //跳转设置
    const goSetting =async () => {
        setType(null)
        props.history.push(`/index/repository/${repositoryId}/setting/repositoryInfo`)
    }

    return (
        <div className='setting layerSetup'>
            <div className={'left-nav left-nav-setting-width'}>
                <div>
                    <div className='flex pl-6 '>
                        <ChangeRepository openState={openState}
                                          setOpenState={setOpenState}
                                          repositoryId={repositoryId}
                                          setType={setType} {...props}/>
                    </div>
                    {scrumRouter?.map(item=>{
                        return(
                            <div key={item.key} className={`${type===item.key&&' choice-table'} my-2 py-1 cursor-pointer hover:bg-gray-200 `} onClick={()=>cuteType(item)} >
                                <div className='setting-nav'>
                                    <div>{item.icon}</div>
                                    <div>{item.title}</div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                <div className='hover:bg-gray-200 border-t py-1' onClick={goSetting}>
                    <div className='setting-nav '>
                        <SettingOutlined className='icon-nav'/>
                        <div>设置</div>
                    </div>
                </div>
            </div>

            <div  className={'setting_right_height'}>
                {renderRoutes(props.route.routes)}
            </div>
        </div>
    )
};
export default RepositoryNav
