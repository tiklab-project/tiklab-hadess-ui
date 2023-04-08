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
                        <div className='border-text'>Maven</div>
                    </div>
                    <div className={`border-style`} onClick={()=>cuteType("npm")}>
                        <div className='border-text'>npm</div>
                    </div>
                    <div className={`border-style`} onClick={()=>cuteType("Docker")}>
                        <div className='border-text'>Docker</div>
                    </div>
                    <div className={`border-style`} onClick={()=>cuteType("Generic")}>
                        <div className='border-text'>Generic</div>
                    </div>
                    <div className={`border-style`} onClick={()=>cuteType("PyPI")}>
                        <div className='border-text'>PyPI</div>
                    </div>
                    <div className={`border-style`} onClick={()=>cuteType("HeIm")}>
                        <div className='border-text'>HeIm</div>
                    </div>
                    <div className={`border-style`} onClick={()=>cuteType("NuGet")}>
                        <div className='border-text'>NuGet</div>
                    </div>
                    <div className={`border-style`} onClick={()=>cuteType("Rpm")}>
                        <div className='border-text'>Rpm</div>
                    </div>
                </div>
            </div>
        </Drawer>
    )

}

export default GuideType
