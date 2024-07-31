/**
 * @name: SettingContent
 * @author: limingliang
 * @date: 2021-05-21 16:51
 * @description：setting
 * @update: 2021-05-21 16:51
 */

import React,{useState,useEffect} from 'react';
import {renderRoutes} from 'react-router-config'
import {PrivilegeButton,SystemNav} from 'thoughtware-privilege-ui';
import {SYSTEM_ROLE_STORE} from "thoughtware-privilege-ui/es/store"

import {inject, observer} from "mobx-react";
import "./SettingAside.scss"
import {DownOutlined, ExportOutlined, UpOutlined} from "@ant-design/icons";
import goBack from "../../assets/images/img/goBack.png";
const SettingContent = (props) => {
    const {route,applicationRouters,basicRouter,isDepartment,systemRoleStore,setNavLevel} = props
    const {systemPermissions}=systemRoleStore

    const path = props.location.pathname
    const [selectKey,setSelectKey] = useState(path)
    const [expandedTree,setExpandedTree] = useState([''])  // 树的展开与闭合
    const [authConfig,setAuthConfig]=useState(null)

    useEffect(()=>{
        if (path.startsWith("/setting/scanHole")){
            setSelectKey("/setting/scanScheme")
        }else {
            setSelectKey(path)
        }

        const authConfig=localStorage.getItem('authConfig')
        setAuthConfig(JSON.parse(authConfig))


    },[path])

    // 菜单
    let menus = () => {
        try{
            if(isDepartment && env==="dev"){
                return [...applicationRouters,...basicRouter]
            }else {
                return [...applicationRouters]
            }
        }catch {
            return [...applicationRouters]
        }
    }


    const isExpandedTree = key => {
        return expandedTree.some(item => item ===key)
    }

    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key))
        }
    }

    //跳转
    const skip = data =>{
        const value=data.id;
        if (value.endsWith("orga")||value.endsWith("user")||value.endsWith("userGroup")||value.endsWith("dir")){
            //统一登陆
            if (!authConfig.authType) {
                const a =value.substring(value.lastIndexOf("/"));
                window.open(`${authConfig.authUrl}/#/setting${a}`)
            }else {
                props.history.push(data.id)
            }
        }else {
            props.history.push(data.id)
        }
    }

    //跳转首页
    const backHome = () => {
        setNavLevel(1)
        props.history.push(`/repository`)
    }

    const renderMenu = (data,deep)=> {
        return (
            <PrivilegeButton key={data.id} code={data.purviewCode} {...props}>
                <li
                    className={`system-aside-li system-aside-second system-aside-second-${deep}  ${data.id=== selectKey ? 'system-aside-select' :null}`}
                    onClick={()=>skip(data)}
                    key={data.id}
                >

                    <div className='nav-style'>
                        <span className='sys-content-icon'>{data.icon}</span>
                        <span className='nav-style-title'>{data.title}</span>
                        {!authConfig?.authType&&(data.id.endsWith("orga")||data.id.endsWith("user")||
                                data.id.endsWith("userGroup")||data.id.endsWith("dir"))&&
                            <span>
                                <ExportOutlined  />
                            </span>
                        }
                    </div>
                </li>
            </PrivilegeButton>
        )
    }

    const subMenu = (item,deep)=> {
        return (
            <li key={item.id} className='system-aside-li'>
                <div className='system-aside-item system-aside-first'
                     style={{paddingLeft: `${deep * 20 + 10}`}}
                     onClick={()=>setOpenOrClose(item.id)}
                >
                    <span>
                        <span className='sys-content-icon'>{item.icon}</span>
                        <span className='system-aside-title'>{item.title}</span>
                    </span>
                    <div className='system-aside-item-icon'>
                        {
                            item.children ?
                                (isExpandedTree(item.id)?
                                        <DownOutlined style={{fontSize: '10px'}}/> :
                                        <UpOutlined style={{fontSize: '10px'}}/>
                                ): ''
                        }
                    </div>
                </div>
                <ul className={`system-aside-ul ${isExpandedTree(item.id) ? null: 'system-aside-hidden'}`}>
                    {
                        item.children && item.children.map(item =>{
                            const deepnew = deep +1
                            return item.children && item.children.length?
                                renderSubMenu(item,deepnew) : renderMenu(item,deepnew)
                        })
                    }
                </ul>
            </li>
        )
    }

    const renderSubMenu = (item,deep) => {
        const isCode = item.children.some(list=>!list.purviewCode)
        if(isCode) return subMenu(item,deep)
        const isPromise = item.children.some(list=> systemPermissions.includes(list.purviewCode))
        return isPromise && subMenu(item,deep)
    }
    return (
        <SystemNav
            {...props}
            expandedTree={expandedTree} // 树的展开和闭合(非必传)
            setExpandedTree={setExpandedTree} // 树的展开和闭合(非必传)
            applicationRouters={applicationRouters} // 菜单
            outerPath={"/setting"} // 系统设置Layout路径
            noAccessPath={"/noaccess"}  //没有资源访问权限页面的路由参数
            pathKey={'id'}
        >
            <div className='system'>
                <div className='system-aside'>
                    <div className='system-aside-title-nav'>
                        <img src={goBack} className='system-aside-icon' onClick={backHome}/>
                        <div className='system-aside-title-text'>设置</div>
                    </div>
                    <ul className='system-aside-top' style={{padding:0}}>
                        {
                            menus().map(firstItem => {
                                return firstItem.children && firstItem.children.length > 0 ?
                                    renderSubMenu(firstItem,0) : renderMenu(firstItem,0)
                            })
                        }
                    </ul>
                </div>
                <div className='system-content'>
                    {renderRoutes(route.routes)}
                </div>
            </div>
        </SystemNav>
    )

}
export default inject("systemRoleStore")(observer(SettingContent))
