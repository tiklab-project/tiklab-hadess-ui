/**
 * @name: RepositorySetting 制品库左侧导设置-导航栏
 * @author: limingliang
 * @date: 2023-02-17 16:51
 * @description：setting
 * @update: 2023-02-17 16:51
 */
import React,{useState,useEffect} from 'react';
import {renderRoutes} from 'react-router-config'
import './RepsoitorySetting.scss'
import {inject, observer} from "mobx-react";
import {SettingOutlined} from "@ant-design/icons";
const RepositorySetting = (props) => {
    const {match:{params},location,repositoryStore} = props
    let path = location.pathname

    const repositoryId = params.id;      // 当前选中路由
    const {findRepository}=repositoryStore
    const [navPath,setNavPath]=useState()   //左侧导航览类型
    const [navList,setNavList]=useState([])


    let remoteLayerRouter = [
        {
            key:'1',
            title: '仓库信息',
            router:`/index/repository/${repositoryId}/setting/repositoryInfo`,
        },
        {
            key:'2',
            title: '代理',
            router:`/index/repository/${repositoryId}/setting/agency`,
        },
        {
            key:'3',
            title: '复制',
            router:`/index/repository/${repositoryId}/setting/copy`,
        },
      /*  {
            key:'3',
            title: '复制',
            router:`/index/repository/${repositoryId}/setting/ManageList`,
        },*/
        {
            key:'4',
            title: '成员',
            router:`/index/repository/${repositoryId}/setting/programUser`,
            icon:   <SettingOutlined className='icon-nav'/>
        },
        {
            key:'5',
            title: '权限',
            router:`/index/repository/${repositoryId}/setting/programDomainRole`,
        },
        {
            key:'6',
            title: '推送',
            router:`/index/repository/${repositoryId}/setting/pushCenter`,
        }

    ];


    useEffect(async () => {
        const res= await findRepository(repositoryId)
        setNavPath(path)
        navi(res.data)
    }, [path]);


    //切换类型
    const cuteType =async (value) => {
        setNavPath(value.router)
        props.history.push(value.router)
    }

    const navi = (repositoryData) => {
        let navList;
        if ( repositoryData.repositoryType ==='remote'){
            navList= remoteLayerRouter.filter(a=>a.key!=5)
        }
        if ( repositoryData.repositoryType ==='group'){
            navList=  remoteLayerRouter.filter(a=>a.key!=5&&a.key!=2)
        }
        if ( repositoryData.repositoryType ==='local'){
            navList=remoteLayerRouter.filter(a=>a.key!=2)
        }
        setNavList(navList)
    }

    return(
        <div className='layerSetup'>
            <div className={'layer-nav'}>
                <div className='layer-title layer-nav-char'>设置</div>
                {
                    navList?.map(item=>{
                        return(
                            <div key={item.key} className={`${navPath===item.router&&' layer-choice-table'}  nav-tabs pitch-nav-table`} onClick={()=>cuteType(item)} >
                                <div className='layer-nav-char'>
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
}
export default inject('repositoryStore')(observer(RepositorySetting))
