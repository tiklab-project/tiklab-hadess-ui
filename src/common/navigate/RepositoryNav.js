/**
 * @name: RepositoryNav
 * @author: limingliang
 * @date: 2022-05-21 16:51
 * @description：xpack 制品库左侧导航栏
 * @update: 2022-05-21 16:51
 */
import React,{useState,useEffect} from 'react';
import {renderRoutes} from 'react-router-config'
import './RepositoryNav.scss'
import {CaretDownOutlined, CodeOutlined, SettingOutlined} from "@ant-design/icons";
import ChangeRepository from "./ChangeRepository";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {Dropdown} from "antd";
import ListIcon from "../repositoryIcon/Listicon";
const RepositoryNav = props => {
    const {location,repositoryStore}=props
    let path = location.pathname

    const {repositoryData,findRepository,findAllRepository,repositoryAllList}=repositoryStore

    const repositoryId = props.match.params.id;      // 当前选中路由
    const [triggerVisible,setTriggerVisible] = useState(false)

    useEffect(async () => {
        findRepository(repositoryId)
    }, []);

    useEffect(async () => {

        findAllRepository()
    }, []);


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
        props.history.push(value.router)
    }

    //跳转设置
    const goSetting =async () => {
        props.history.push(`/index/repository/${repositoryId}/setting/repositoryInfo`)
    }

    return (
        <div className='setting layerSetup'>
            <div className={'left-nav left-nav-setting-width'}>
                <div>
                    <div className='nav-repository'>
                        <Dropdown
                            overlay={<ChangeRepository
                                {...props}
                                repositoryAllList={repositoryAllList}
                                setTriggerVisible={setTriggerVisible}
                            />}
                            trigger={['click']}
                            visible={triggerVisible}
                            onVisibleChange={visible=>setTriggerVisible(visible)}
                            overlayClassName={`aside-dropdown-normal aside-dropdown`}
                        >
                            <div className='repository-nav' >
                                <ListIcon text={repositoryData.name}/>
                                <CaretDownOutlined  className='repository-nav-icon'/>
                            </div>
                        </Dropdown>

                      {/*  <ChangeRepository openState={openState}
                                          setOpenState={setOpenState}
                                          repository={repositoryData}
                                          repositoryAllList={repositoryAllList}
                                          setType={setType} {...props}/>*/}
                    </div>
                    {scrumRouter?.map(item=>{
                        return(
                            <div key={item.key} className={`${path===item.router&&' choice-table-nav'} table-nav `} onClick={()=>cuteType(item)} >
                                <div className='setting-nav'>
                                    <div>{item.icon}</div>
                                    <div>{item.title}</div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                <div className='setting-nav-color setting-nav-style' onClick={goSetting}>
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

export default withRouter(inject('repositoryStore')(observer(RepositoryNav)))
