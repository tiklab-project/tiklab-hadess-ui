/**
 * @name: FirstNav
 * @author: limingliang
 * @date: 2024-07-10 10:53
 * @description：一级导航栏
 */

import React ,{useEffect,useState}from 'react';
import "./FirstNav.scss"
import {CaretDownOutlined, CodeOutlined, SettingOutlined} from "@ant-design/icons";
import {renderRoutes} from "react-router-config";
import warehouse from "../../assets/images/img/warehouse.png"
import library from "../../assets/images/img/library.png"
import create from "../../assets/images/img/create.png"
import {Dropdown, Tooltip} from "antd";
const FirstNav = (props) => {
    const {location,HelpLink}=props
    const [navPath,setNavPath]=useState('')   //选中的导航栏路径
    const [triggerVisible,setTriggerVisible] = useState(false)

    useEffect(async () => {
        if (location){
            if (location.pathname.startsWith("/library")){
                setNavPath("/library/maven")
            }else if (location.pathname.startsWith("/repository")){
                setNavPath("/repository")
            } else {
                setNavPath(location.pathname)
            }
        }
    }, [location.pathname]);



    let navigation = [
        {
            key: 'library',
            id:`/library/maven`,
            title:'制品',
            icon:   <img src={library} style={{ width:20,height:20}}/>
        },
        {
            key: 'repository',
            id:`/repository`,
            title:'制品库',
            icon:   <img src={warehouse} style={{ width:20,height:20}}/>
        },
        {
            key: 'create',
            id:`/create`,
            title:'新建',
            icon:   <img src={create} style={{ width:20,height:20}}/>
        },
    ];

    //切换nav
    const cuteNav = (value) => {
        if (value.id==='/create'){
            return
        }
        setNavPath(value.id)
        props.history.push(value.id)
    }

    const cutSetting = () => {
        props.history.push('/setting/version')
        setNavPath("setting")
    }

    /**
     * 跳转添加制品库
     * @param  type （local、remote、group）
     */
    const goRepositoryAdd=async (type)=>{
        setTriggerVisible(false)
        props.history.push(`/repository/add/${type}`)
    }

    return(
        <div className="fist-nav">
            <div className='fist-nav-style '>
                <div>
                    {navigation?.map(item=>{
                        return(
                            <div key={item.key} className={`${navPath===item.id&&' fist-nav-tab-choice'} fist-nav-tab `} onClick={()=>cuteNav(item)} >
                                <div className='table-nav-place'>
                                    {
                                        item.key==='create'?
                                            <Dropdown
                                                overlay={
                                                    <>
                                                        <div className="create-dropdown-link" onClick={()=>goRepositoryAdd("local")} >
                                                            本地库
                                                        </div>
                                                        <div className="create-dropdown-link" onClick={()=>goRepositoryAdd('remote')}>
                                                            远程库
                                                        </div>
                                                        <div className="create-dropdown-link" onClick={()=>goRepositoryAdd('group')}>
                                                            组合库
                                                        </div>
                                                    </>
                                                }
                                                trigger={['click']}
                                                open={triggerVisible}
                                                onOpenChange={visible=>setTriggerVisible(visible)}
                                                overlayClassName='create-dropdown'
                                            >
                                                <div>
                                                    <div>{item.icon}</div>
                                                    <div>{item.title}</div>
                                                </div>
                                            </Dropdown>:
                                            <div>
                                                <div>{item.icon}</div>
                                                <div>{item.title}</div>
                                            </div>
                                    }

                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={`${navPath==="setting"&&' fist-nav-tab-choice'} fist-nav-setting `} onClick={cutSetting} >
                    <div className='table-nav-place' >
                        <Tooltip title='设置' placement={"left"}>
                            <SettingOutlined style={{fontSize:20}}/>
                        </Tooltip >
                    </div>
                </div>
            </div>
            <div className='fist-data-tab' >
                {renderRoutes(props.route.routes)}
            </div>
        </div>
    )
}
export default FirstNav
