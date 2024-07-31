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
    BarChartOutlined,
    CaretDownOutlined,
    CodeOutlined,
    SettingOutlined
} from "@ant-design/icons";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {Dropdown, Tooltip} from "antd";
import ChangeRepository from "./ChangeRepository";
import ListIcon from "../../common/repositoryIcon/Listicon";
import {getUser,getVersionInfo} from "thoughtware-core-ui";
import UpgradePopup from "../../common/upgrade/UpgradePopup";
import member from "../../assets/images/img/member.png";
import goBack from "../../assets/images/img/goBack.png"
const RepositoryAside = (props) => {
    const {location,match:{params},repositoryStore,systemRoleStore}=props
    const {repositoryData,findRepository,findAllRepository,repositoryAllList,setNavLevel}=repositoryStore
    const {getInitProjectPermissions} = systemRoleStore

    const repositoryId = params.id;
    let path = location.pathname

    const [navPath,setNavPath]=useState('')   //左侧导航览类型
    const [triggerVisible,setTriggerVisible] = useState(false)
    const [upgradeVisible,setUpgradeVisible]=useState(false)
    let scrumRouter = [
        {
            key:'2',
            title: '制品',
            id:`/repository/${repositoryId}/libraryList`,
            icon:   <CodeOutlined className='icon-nav'/>
        },
        {
            key:'3',
            title: '制品扫描',
            id:`/repository/${repositoryId}/scanPlay`,
            icon: !getVersionInfo().expired||getVersionInfo().release===3?<BarChartOutlined className='icon-nav'/>:
                <img  src={member}  style={{width:18,height:18}}/>
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

    }, []);

    useEffect(async () => {
        if (path.includes("scan")){
            setNavPath(`/repository/${repositoryId}/scanPlay`)
        }else {
            setNavPath(path)
        }
    }, [path]);


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
        props.history.push(`/repository/${repositoryId}/setting/repositoryInfo`)
    }

    //跳转首页
    const backHome = () => {
        setNavLevel(1)
        props.history.push(`/repository`)
    }


    return (
        <div className='setting '>
            {
                repositoryData&&
                <div className={'left-nav left-nav-setting-width'}>
                    <div>
                        <div className='nav-repository'>
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
                                overlayClassName={`aside-dropdown-normal aside-dropdown`}
                            >
                                <div className='repository-nav' >
                                    <Tooltip placement="right" title={repositoryData?.name} >
                                        <div><ListIcon text={repositoryData.name} colors={repositoryData.color}/></div>
                                    </Tooltip >
                                    <CaretDownOutlined  className='repository-nav-icon'/>
                                </div>
                            </Dropdown>
                        </div>
                        <div className='go-back-style'>
                            <div className='nav-go-back' onClick={backHome}>
                                <img src={goBack} className='nav-go-back-icon'/>
                                <div>返回首页</div>
                            </div>
                        </div>
                        {scrumRouter?.map(item=>{
                            return(
                                <div key={item.key} className={`${navPath===item.id&&' choice-table-nav'} table-nav `} onClick={()=>cuteType(item)} >
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
            }


            <div  className={'setting_right_height'}>
                {renderRoutes(props.route.routes)}
            </div>

            <UpgradePopup visible={upgradeVisible} setVisible={setUpgradeVisible}/>
        </div>
    )
}

export default withRouter(inject('systemRoleStore','repositoryStore')(observer(RepositoryAside)))


