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
import {
    BarChartOutlined, BookOutlined,
    CaretDownOutlined, CaretLeftOutlined, CaretRightOutlined,
    CodeOutlined, DownOutlined, HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined,
    SettingOutlined
} from "@ant-design/icons";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {Dropdown, Layout, Tooltip} from "antd";
import ChangeRepository from "./ChangeRepository";
import ListIcon from "../../common/Repository/Listicon";
import {getUser, getVersionInfo, productWhiteImg} from "tiklab-core-ui";
import Sider from "antd/es/layout/Sider";
import ScanCodeFree from "../../common/upgrade/ScanCodeFree";
const RepositoryAside = (props) => {
    const {location,match:{params},repositoryStore,systemRoleStore,basicRouter,publicState}=props
    const {repositoryData,findRepository,findAllRepository,repositoryAllList,setNavLevel}=repositoryStore
    const {getInitProjectPermissions} = systemRoleStore

    const repositoryId = params.id;
    let path = location.pathname

    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "blue");
    const [navPath,setNavPath]=useState('')   //左侧导航览类型
    const [triggerVisible,setTriggerVisible] = useState(false)
    const [upgradeVisible,setUpgradeVisible]=useState(false)

    //导航折叠状态
    const [foldState] = useState(localStorage.getItem("collapsed") ? localStorage.getItem("collapsed") : "true");
    //导航折叠状态
    const [collapsed, setCollapsed] = useState(true);

    const [themeClass, setThemeClass] = useState("theme-gray")

    const [basicList,setBasicList]=useState([])

    let scrumRouter = [
        {
            key:'1',
            title: '操作指南',
            id:`/repository/${repositoryId}/guide`,
            icon:   <BookOutlined  className={`${collapsed?'close-iconfont':'open-iconfont'}`}/>
        },
        {
            key:'2',
            title: '制品',
            id:`/repository/${repositoryId}/library`,
            icon:   <CodeOutlined className={`${collapsed?'close-iconfont':'open-iconfont'}`}/>
        },
        /*{
            key:'3',
            title: '制品扫描',
            id:`/repository/${repositoryId}/scanPlay`,
            icon: <BarChartOutlined className={`${collapsed?'close-iconfont':'open-iconfont'}`}/>
        },*/
        {
            key: 'setting',
            id:`/repository/${repositoryId}/setting/info`,
            title:'设置',
            icon:  <SettingOutlined className={`${collapsed?'close-iconfont':'open-iconfont'}`}/>
        },
       ];

    let scrumRouter2 = [
        {
            key:'1',
            title: '操作指南',
            id:`/repository/${repositoryId}/guide`,
            icon:   <BookOutlined  className={`${collapsed?'close-iconfont':'open-iconfont'}`}/>
        },
        {
            key:'2',
            title: '制品',
            id:`/repository/${repositoryId}/library`,
            icon:   <CodeOutlined className={`${collapsed?'close-iconfont':'open-iconfont'}`}/>
        },
    ];


    useEffect(async () => {
        setNavLevel(2)
        findAllRepository()
        findRepository(repositoryId).then(res=>{
            if (res.code===0){
                if (!res.data){
                    props.history.push(`/repository`)
                }
            }
        })
        // 获取权限
        getInitProjectPermissions(getUser().userId,repositoryId,true)

        //查询主题
        getThemeClass(theme)

        if (basicRouter){
            setBasicList(basicRouter)
        }else {
            setBasicList(scrumRouter)
        }

    }, []);

    useEffect(async () => {
        if (path.includes("scan")){
            setNavPath(`/repository/${repositoryId}/scanPlay`)
        }else if(path.startsWith(`/repository/${repositoryId}/library`)){
            setNavPath(`/repository/${repositoryId}/library`)
        } else {
            setNavPath(path)
        }
    }, [path]);


/*    useEffect(()=> {
        switch (foldState){
            case "true":
                setCollapsed(true)
                break
            case "false":
                setCollapsed(false)
                break
            default:
                setCollapsed(true)
                break;
        }
        return null;
    }, [foldState])*/

    //切换类型
    const cuteType =async (value) => {
        if (value.id.endsWith("scanPlay")&&(getVersionInfo().expired&&getVersionInfo().release!==3)){
            setUpgradeVisible(true)
        }else {
            setNavPath(value.id)
            props.history.push(value.id)
        }
    }

    //跳转设置
    const goSetting =async () => {
        setNavPath(null)
        props.history.push(`/repository/${repositoryId}/setting/info`)
    }

    //跳转首页
    const backHome = () => {
        setNavLevel(1)
        props.history.push(`/repository`)
    }

    /**
     * 点击折叠或展开菜单
     */
    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
        localStorage.setItem("collapsed",!collapsed )
    }

    const getThemeClass = (theme) => {
        let name
        switch (theme) {
            case "black":
                name = "theme-black";
                break;
            case "gray":
                name = "theme-gray";
                break;
            case "blue":
                name = "theme-blue";
                break;
            default:
                name = "theme-gray";
                break;

        }

        setThemeClass(name)
        setTheme(theme)
        return name;
    }

    return (
        <Layout className='rpy-nav'>
            <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth="75" width="200" className={`${themeClass} rpy-nav-style`}>
                {
                    repositoryData&&
                    <div>
                        <div className={`${collapsed?"rpy-close-nav-repository":'rpy-open-nav-repository'}`}>
                            <Dropdown
                                overlay={<ChangeRepository
                                    {...props}
                                    repositoryAllList={repositoryAllList}
                                    setTriggerVisible={setTriggerVisible}
                                    repositoryId={repositoryId}
                                />}
                                trigger={['click']}
                                visible={triggerVisible}
                                onVisibleChange={visible=>setTriggerVisible(visible)}
                                overlayClassName={`aside-dropdown  ${collapsed?" aside-dropdown-close":" aside-dropdown-open"}`}
                            >
                                {
                                    collapsed?
                                        <div className='repository-nav repository-nav-close' data-title-right={repositoryData?.name}>
                                            <ListIcon text={repositoryData.name}
                                                      colors={repositoryData.color}
                                                      type={"closeNav"}/>
                                        </div>:
                                        <div className='repository-nav' >
                                            <div><ListIcon text={repositoryData.name}
                                                           colors={repositoryData.color}
                                                           type={"openNav"}
                                            /></div>
                                            <div className='repository-open-name'>{repositoryData.name}</div>
                                            <div>
                                                <DownOutlined className='repository-nav-icon'/>
                                              {/*  <CaretDownOutlined  className='repository-nav-icon'/>*/}
                                            </div>
                                        </div>
                                }
                            </Dropdown>
                        </div>

                        <div className='go-back-style'>
                            {
                                collapsed?
                                    <div className='nav-go-close-back tab-link' onClick={backHome} data-title-right={'返回首页'}>
                                        <HomeOutlined className='rpy-nav-close-icon'/>
                                    </div>:
                                    <div className='nav-go-open-back tab-link' onClick={backHome}>
                                        <div className='nav-go-back-left'>
                                            <div className='nav-go-back-icon'>
                                                <HomeOutlined className='rpy-nav-icon'/>
                                            </div>
                                            <div>返回首页</div>
                                        </div>
                                    </div>
                            }
                        </div>
                        {(!publicState?basicRouter:scrumRouter2)?.map(item=>{
                            return(
                                <div key={item.key} className={`${navPath===item.id&&' tab-link-active'} tab-link `} onClick={()=>cuteType(item)} >
                                    {
                                        collapsed?
                                            <div className='table-close-nav'>
                                                <div className='rpy-nav-icon'>{item.icon}</div>
                                                <div>{item.title}</div>
                                            </div>:
                                            <div className='table-open-nav'>
                                                {
                                                    item.key==="3"?
                                                        <div className='open-icon-style'>
                                                            <BarChartOutlined className='rpy-nav-icon'/>
                                                        </div> :
                                                        <div className='open-icon-style'>{item.icon}</div>
                                                }
                                                <div>{item.title}</div>

                                            </div>
                                    }
                                </div>
                            )
                        })
                        }
                    </div>
                }
                {
                    !publicState&&
                    <div className={`${themeClass} rpy-nav-setting `}  onClick={toggleCollapsed}>
                        {
                            collapsed?
                                <div className='tab-link nav-close-setting-place' data-title-right='展开'>
                                    <MenuUnfoldOutlined className='close-iconfont'/>
                                </div>:
                                <div className='tab-link nav-open-setting-place'>
                                    <div className='open-icon-setting-style'>
                                        <MenuFoldOutlined className='open-iconfont'/>
                                    </div>
                                    <div>折叠</div>
                                </div>
                        }

                    </div>
                }

               {/* <div className="menu-box-right-border" >
                    <div className={"menu-box-isexpanded"} onClick={toggleCollapsed}>
                        {
                            collapsed ?
                                <CaretRightOutlined  className='first-menu-expend-icon'/>
                                : <CaretLeftOutlined className='first-menu-expend-icon'/>
                        }
                    </div>
                </div>*/}
            </Sider>

            <Layout>
                <div className='rpy-nav-content'>
                    {renderRoutes(props.route.routes)}
                </div>
            </Layout>

            <ScanCodeFree visible={upgradeVisible}
                          setVisible={setUpgradeVisible}
            />
        </Layout>

    )
}

export default withRouter(inject('systemRoleStore','repositoryStore')(observer(RepositoryAside)))


