/**
 * @name: SettingContent
 * @author: limingliang
 * @date: 2021-05-21 16:51
 * @description：setting
 * @update: 2021-05-21 16:51
 */

import React,{useState,useEffect} from 'react';
import {renderRoutes} from 'react-router-config'
import {PrivilegeButton,SystemNav} from 'tiklab-privilege-ui';

import {inject, observer} from "mobx-react";
import "./SettingAside.scss"
import {DownOutlined, ExportOutlined, HomeOutlined, UpOutlined} from "@ant-design/icons";
import {getVersionInfo} from "tiklab-core-ui";
import customLogo from "../../assets/images/img/custom-logo.png";
import ipAllow from "../../assets/images/img/ip-allow.png";
import member from "../../assets/images/img/member.png";
import ScanConfigFree from "../../common/upgrade/ScanConfigFree";
import {LicenceEnhance} from "tiklab-licence-ui";
import {SecurityEnhance} from "tiklab-security-ui";
const SettingContent = (props) => {
    const {route,applicationRouters,basicRouter,isDepartment,systemRoleStore,setNavLevel} = props
    const {systemPermissions}=systemRoleStore

    const path = props.location.pathname
    const [selectKey,setSelectKey] = useState(path)
    const [expandedTree,setExpandedTree] = useState([''])  // 树的展开与闭合
    const [authConfig,setAuthConfig]=useState(null)

    const [upgradeVisible,setUpgradeVisible]=useState(false)


    const [licenceVisible,setLicenceVisible]=useState(false)
    const [securityVisible,setSecurityVisible]=useState(false)

    useEffect(()=>{
        if (path.startsWith("/setting/scanHole")){
            setSelectKey("/setting/oldScheme")
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
        if (key==="4"&&(getVersionInfo().expired&&getVersionInfo().release!==3)){
            setUpgradeVisible(true)
        }else {
            if (isExpandedTree(key)) {
                setExpandedTree(expandedTree.filter(item => item !== key))
            } else {
                setExpandedTree(expandedTree.concat(key))
            }
        }


    }

    //跳转
    const skip = data =>{
        const value=data.id;
       /* //未订阅
        if (getVersionInfo().expired){
            //自定义log
            if (value==='/setting/customLogo'){
                setLicenceVisible(true)
                return
            }
            //ip黑白名单
            if (value==='/setting/ipRoster'){
                setSecurityVisible(true)
                return
            }
        }*/

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

    //跳转设置首页
    const goSettingHome = () => {
        props.history.push('/setting/home')
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
                       {/* {
                            getVersionInfo().expired&&data.character&&
                            <span>
                             <img  src={member}  style={{width:18,height:18}}/>
                          </span>
                        }*/}
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
                    <div className='system-aside-item-space'>
                        <div className='sys-content-icon'>{item.icon}</div>
                        <div className='system-aside-title'>{item.title}</div>
                     {/*   <div>
                            {item.id==="4"&&(getVersionInfo().expired)&&
                                <img  src={member}  style={{width:18,height:18}}/>
                            }
                        </div>*/}

                    </div>
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
                    <div className='system-aside-tab-up'>
                        <div className='system-icon' onClick={goSettingHome}>
                            <div className='aside-text-size'>设置</div>
                        </div>
                        <div className='system-aside-goHome'>
                            <div className='system-aside-title-nav' onClick={backHome}>
                                <HomeOutlined className='system-aside-icon'/>
                                <div>返回首页</div>
                            </div>
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
                </div>
                <div className='system-content'>
                    {renderRoutes(props.route.routes)}
                </div>
            </div>
            <ScanConfigFree visible={upgradeVisible}
                            setVisible={setUpgradeVisible}
            />

            <LicenceEnhance
                visible={licenceVisible} //必填
                setVisible={setLicenceVisible} //必填
                bgroup={'hadess'} //必填
                list={[
                    {id:'logo',title:'自定义Logo',icon:customLogo}
                ]}  //必填
            />

          {/*  <SecurityEnhance
                visible={securityVisible} //必填
                setVisible={setSecurityVisible} //必填
                bgroup={'hadess'} //必填
                list={[
                    {id:'ipRoster',title:'IP黑白名单',icon:ipAllow}
                ]}  //必填
            />*/}
        </SystemNav>
    )

}
export default inject("systemRoleStore")(observer(SettingContent))
