/**
 * @name: GuideDrawer
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：指引选择
 * @update: 2022-12-27 10:30
 */
import React,{useEffect,useState,Fragment} from "react";
import {Drawer} from 'antd'
import './GuideDrawer.scss'
import npm from "../../../assets/images/img/npm.png"
import docker from "../../../assets/images/img/docker.png"
import generic from "../../../assets/images/img/generic.png"
import pypi from "../../../assets/images/img/pypi.png"
import nuget from "../../../assets/images/img/nuget.png"
import go from "../../../assets/images/img/go.png"
import helm from "../../../assets/images/img/helm.png"
import Print from "../../../common/image/Print";
import Breadcrumb from "../../../common/breadcrumb/Breadcrumb";
import {CloseOutlined} from "@ant-design/icons";
import GuideTable from "./GuideTable";
const GuideDrawer = props => {
    const {visible, setDrawerVisible} = props;

    const [detailsType,setDetailsType]=useState("type")
    const [type,setType]=useState()


    /**
     * 切换制品库
     * @param type
     */
    const cuteType =async (type) => {
        setType(type)
        setDetailsType("content")
    }

    const goBack = () => {
        setDetailsType("type")
    }

    //关闭弹窗
    const close = () => {
        setDetailsType("type")
        setDrawerVisible(false)
    }


    return(
        <Drawer
            title={detailsType==='type'?<Breadcrumb  firstItem={"操作指引"}/>:<Breadcrumb  firstItem={"操作指引"}  goBack={goBack}/>}
            placement='right'
            closable={false}
            onClose={close}
            visible={visible}
            width  ={'60%'}
            className='locker-top'
            extra={
                <CloseOutlined style={{cursor:'pointer'}} onClick={close} />
            }
        >
            {
                detailsType==="type"?
                    <Fragment>
                        <div>类型</div>
                        <div className='guide-type'>
                            <div className={`border-style`} onClick={()=>cuteType("Maven")}>
                                <Print type={"maven"} width={40} height={40}/>
                                <div className='border-text'>Maven</div>
                            </div>
                            <div className={`border-style`} onClick={()=>cuteType("npm")}>
                                <Print type={"npm"} width={40} height={40}/>
                                <div className='border-text'>npm</div>
                            </div>
                            <div className={`border-style`} onClick={()=>cuteType("Docker")}>
                                <Print type={"docker"} width={40} height={40}/>
                                <div className='border-text'>Docker</div>
                            </div>
                            <div className={`border-style`} onClick={()=>cuteType("Generic")}>
                                <Print type={"generic"} width={40} height={40}/>
                                <div className='border-text'>Generic</div>
                            </div>
                            <div className={`border-style`} onClick={()=>cuteType("PyPI")}>
                                <Print type={"pypi"} width={40} height={40}/>
                                <div className='border-text'>PyPI</div>
                            </div>
                            <div className={`border-style`} onClick={()=>cuteType("HeIm")}>
                                <Print type={"helm"} width={40} height={40}/>
                                <div className='border-text'>HeIm</div>
                            </div>
                            <div className={`border-style`} onClick={()=>cuteType("NuGet")}>
                                <Print type={"nuget"} width={40} height={40}/>
                                <div className='border-text'>NuGet</div>
                            </div>
                            <div className={`border-style`} onClick={()=>cuteType("Go")}>
                                <Print type={"go"} width={40} height={40}/>
                                <div className='border-text'>Go</div>
                            </div>
                        </div>
                    </Fragment>:
                    <GuideTable type={type}/>
            }

        </Drawer>
    )

}

export default GuideDrawer
