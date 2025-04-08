/**
 * @name: RepositorySetting 制品库左侧导设置-导航栏
 * @author: limingliang
 * @date: 2023-02-17 16:51
 * @description：setting
 * @update: 2023-02-17 16:51
 */
import React,{useState,useEffect,Fragment} from 'react';
import {renderRoutes} from 'react-router-config'
import './RepsoitorySetting.scss'
import {inject, observer} from "mobx-react";
import {SettingOutlined} from "@ant-design/icons";
import {ProjectNav,PrivilegeProjectButton} from 'tiklab-privilege-ui';
const RepositorySetting = (props) => {
    const {match:{params},location,repositoryStore} = props
    let path = location.pathname

    const repositoryId = params.id;      // 仓库id
    const {findRepository}=repositoryStore
    const [navPath,setNavPath]=useState()   //左侧导航览类型
    const [navList,setNavList]=useState([])


    let remoteLayerRouter = [
        {
            id:'1',
            title: '仓库信息',
            router:`/repository/${repositoryId}/setting/info`,
        },

        {
            id:'4',
            title: '成员',
            router:`/repository/${repositoryId}/setting/user`,
            icon:   <SettingOutlined className='icon-nav'/>,
            purviewCode: "rpy_user",
        },
        {
            id:'5',
            title: '权限',
            router:`/repository/${repositoryId}/setting/role`,
            purviewCode: "rpy_authority",
        },
        {
            id:'6',
            title: '制品推送',
            router:`/repository/${repositoryId}/setting/push`,
        }
    ];


    useEffect(async () => {
        if (path.endsWith("/pushLibrary")){
            const pa= path.substr(0,path.lastIndexOf("setting")+7);
            setNavPath(pa+"/push")
        }else {
            setNavPath(path)
        }
       findRepository(repositoryId).then(res=>{
           if (res.code===0){
               navi(res.data)
           }
       })
    }, [path]);

    //切换类型
    const cuteType =async (value) => {
        setNavPath(value.router)
        props.history.push(value.router)
    }

    const navi = (repositoryData) => {
        let navList;
        if ( repositoryData?.repositoryType ==='remote'){
            navList= remoteLayerRouter.filter(a=>a.id!==5)
        }
        if ( repositoryData?.repositoryType ==='group'){
            navList=  remoteLayerRouter.filter(a=>a.id!==5&&a.id!==2)
        }
        if ( repositoryData?.repositoryType ==='local'){
            navList=remoteLayerRouter.filter(a=>a.id!==2)
        }
        if (version==='ce'){
            navList=remoteLayerRouter.filter(a=>a.id!==5)
        }
        setNavList(navList)
    }


    const renderRouter = item => {
        return  <PrivilegeProjectButton key={item.id} code={item.purviewCode} domainId={repositoryId}>
            {navContent(item)}
        </PrivilegeProjectButton>
    }

    const navContent = item =>{
        return   <div key={item.id} className={`${navPath===item.router&&' layer-choice-table'}  nav-tabs pitch-nav-table`}
                      onClick={()=>cuteType(item)} >
            <div className='layer-nav-char'>
                {item.title}
            </div>
        </div>
    }

    return(
        <ProjectNav
            {...props}
            domainId={repositoryId}
            projectRouters={navList}
            noAccessPath={"/noaccess"}  //没有访问权限
            pathkey={'id'}
            outerPath={`/repository/${path}/setting`}
        >
            <div className='layerSetup'>
                <div className={'layer-nav'}>
                    <div className='layer-title layer-nav-char'>设置</div>
                    { navList?.map(item=>renderRouter(item))}
                </div>
                <div  className={'layer-right-style'}>
                    {renderRoutes(props.route.routes)}
                </div>
            </div>
        </ProjectNav>

    )
}
export default inject('repositoryStore')(observer(RepositorySetting))
