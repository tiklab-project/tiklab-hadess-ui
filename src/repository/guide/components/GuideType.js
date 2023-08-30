/**
 * @name: GuideType
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：指引选择
 * @update: 2022-12-27 10:30
 */
import React from "react";
import {Drawer} from 'antd'
import './GuideType.scss'
import mvn from "../../../assets/images/img/mvn.png"
import npm from "../../../assets/images/img/npm.png"
import docker from "../../../assets/images/img/docker.png"
import generic from "../../../assets/images/img/generic.png"
import pypi from "../../../assets/images/img/pypi.png"
import nuget from "../../../assets/images/img/nuget.png"
import go from "../../../assets/images/img/go.png"
import helm from "../../../assets/images/img/helm.png"
import Print from "../../../common/image/Print";
const GuideType = props => {
    const {visible, onClose,goDetails} = props;

    /**
     * 切换制品库
     * @param type
     */
    const cuteType =async (type) => {
        goDetails(type)
    }
    return(
        <Drawer
            title="操作指引"
            placement='right'
            onClose={onClose}
            visible={visible}
            width  ={'700'}
            className='locker-top'
        >
            <div>
                <div>请选择类型</div>
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
            </div>
        </Drawer>
    )

}

export default GuideType
