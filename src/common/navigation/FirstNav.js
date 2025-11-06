/**
 * @name: FirstNav
 * @author: limingliang
 * @date: 2024-07-10 10:53
 * @description：一级导航栏
 */

import React ,{useEffect,useState}from 'react';
import "./FirstNav.scss"
import {
    CaretDownOutlined, CaretLeftOutlined,
    CaretRightOutlined,
    SettingOutlined
} from "@ant-design/icons";
import {productImg, productWhiteImg,productTitle} from "tiklab-core-ui";

import Sider from "antd/es/layout/Sider";
import TopNav from "./TopNav";
import {observer} from "mobx-react";
import ProjectImage from "../image/NavigationImage";
import libraryStore from "../../library/store/LibraryStore";
const FirstNav = (props) => {
    const {location,AppLink,HelpLink,AvatarLink,customLogo}=props
    const {setSearchName}=libraryStore
    const [navPath,setNavPath]=useState('')   //选中的导航栏路径

    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "blue");

    //导航折叠状态
    const [foldState] = useState(localStorage.getItem("collapsed") ? localStorage.getItem("collapsed") : false);

    const [themeClass, setThemeClass] = useState("theme-gray")

    const [collapsed, setCollapsed] = useState(true)

    useEffect(()=> {
        getThemeClass(theme)
        return null;
    }, [theme])




    useEffect(async () => {

        if (location){
            if (location.pathname.startsWith("/library")){
                setNavPath("/library")
            }else if (location.pathname.startsWith("/repository")){
                setSearchName()
                setNavPath("/repository")
            } else {
                setSearchName()
                setNavPath(location.pathname)
            }
        }
    }, [location.pathname]);


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


    let navigation = [
        {
            key: 'library',
            id:`/library`,
            title:'搜索',
            icon: <ProjectImage theme={theme} icon={"library"} type={`${collapsed?'close':'open'}`}/>
        },
        {
            key: 'repository',
            id:`/repository`,
            title:'制品库',
            icon: <ProjectImage theme={theme} icon={"repository"} type={`${collapsed?'close':'open'}`}/>
        },
        {
            key: 'setting',
            id:`/setting/home`,
            title:'设置',
            icon:  <SettingOutlined className={`${collapsed?'close-iconfont':'open-iconfont'}`}/>
        },
    ];

    //切换nav
    const cuteNav = (value) => {
        setNavPath(value.id)
        props.history.push(value.id)
        /*if (value.key==='setting'){
            if (version==='cloud'){
                props.history.push('/setting/myLog')
            }else {
                props.history.push('/setting/version')
            }
        }else {
            props.history.push(value.id)
        }*/
    }

    /**
     * 点击折叠或展开菜单
     */
    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
        const a=localStorage.getItem("collapsed")
        localStorage.setItem("collapsed",!a )

    }


    //设置图标
    const logoHtml = () => {
        let image;
        if (theme==='default'||theme==='gray'){
            image=productImg.gitpuk
        }else {
            image=productWhiteImg.gitpuk;
        }
        return {
            image: customLogo?.image ? customLogo.image : image,
            name: customLogo?.name ? customLogo.name :  productTitle.hadess
        };
    };
    const logoData = logoHtml();


    return(
        <div className="fist-nav">
            <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth="75" width="200" className={`${themeClass} fist-nav-style `}>
                <div className='fist-tab-up'>
                    <div className='fist-nav-icon'>
                        {
                            collapsed?
                                <div className='fist-nav-close-icon'>
                                    <img  src={logoData.image }  className='icon-size'/>
                                </div>:
                                <div className='fist-nav-open-icon'>
                                    <img  src={logoData.image }  className='icon-size'/>
                                    <div className='icon-text'>{logoData.name}</div>
                                </div>
                        }
                    </div>

                    {navigation?.map(item=>{
                        return(
                            <div key={item.key} className={`${navPath===item.id&&' tab-link-active'} tab-link `} onClick={()=>cuteNav(item)} >
                                {
                                    collapsed?
                                        <div className='table-close-nav'>
                                            <div>
                                                <div className='user-icon'>{item.icon}</div>
                                                <div>{item.title}</div>
                                            </div>
                                        </div>:
                                        <div className='table-open-nav'>
                                            <div className='open-icon-style'>{item.icon}</div>
                                            <div>{item.title}</div>
                                        </div>
                                }
                            </div>
                        )
                    })}
                </div>

                <TopNav {...props} showType={"all"} collapsed={collapsed}
                        setTheme={setTheme}
                        theme={theme}
                        AppLink={AppLink}
                        HelpLink={HelpLink}
                        AvatarLink={AvatarLink}
                />

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
            <div className='fist-nav-style-border'></div>
        </div>
    )
}
export default observer(FirstNav)
