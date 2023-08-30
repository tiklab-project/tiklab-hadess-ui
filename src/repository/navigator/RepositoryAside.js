/**
 * @name: RepositoryNav
 * @author: limingliang
 * @date: 2022-05-21 16:51
 * @description：xpack 制品库左侧导航栏
 * @update: 2022-05-21 16:51
 */
import React,{useState,useEffect} from 'react';
import {renderRoutes} from 'react-router-config'
import "./RepositoryAside.scss"
import {CaretDownOutlined, CodeOutlined, SettingOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {Dropdown} from "antd";
import ChangeRepository from "./ChangeRepository";
import ListIcon from "../../common/repositoryIcon/Listicon";
const RepositoryAside = (props) => {
    const {location,match:{params},repositoryStore}=props
    const {repositoryData,findRepository,findAllRepository,repositoryAllList}=repositoryStore
    const repositoryId = params.id;
    let path = location.pathname

    const [navPath,setNavPath]=useState('')   //左侧导航览类型
    const [triggerVisible,setTriggerVisible] = useState(false)
    let scrumRouter = [
        {
            key:'2',
            title: '制品',
            router:`/index/repository/${repositoryId}/libraryList`,
            icon:   <CodeOutlined className='icon-nav'/>
        },
       ];

    useEffect(async () => {

        findAllRepository()
        findRepository(repositoryId)
    }, []);

    useEffect(async () => {
        if (path.includes(`/index/repository/${repositoryId}/libraryList`)){
            setNavPath(`/index/repository/${repositoryId}/libraryList`)
        }

    }, [path]);


    //切换类型
    const cuteType =async (value) => {
        setNavPath(value.router)
        props.history.push(value.router)
    }

    //跳转设置
    const goSetting =async () => {
        setNavPath(null)
        props.history.push(`/index/repository/${repositoryId}/setting/repositoryInfo`)
    }


    return (
        <div className='setting '>
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
                    </div>
                    {scrumRouter?.map(item=>{
                        return(
                            <div key={item.key} className={`${navPath===item.router&&' choice-table-nav'} table-nav `} onClick={()=>cuteType(item)} >
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
}

export default withRouter(inject('repositoryStore')(observer(RepositoryAside)))


