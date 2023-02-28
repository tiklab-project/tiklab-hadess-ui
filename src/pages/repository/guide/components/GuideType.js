/**
 * @name: GuideType
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：指引选择
 * @update: 2022-12-27 10:30
 */
import React, {useState, useEffect} from "react";
import {Drawer} from 'antd'
const GuideType = props => {
    const {visible, onClose,goDetails} = props;

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
                <div className='flex grid grid-cols-4 gap-x-2 gap-y-4 mt-5'>
                    <div className={`border w-24 py-6 rounded-md cursor-pointer`} onClick={()=>cuteType("Maven")}>
                        <div className='flex-row text-center '>Maven</div>
                    </div>
                    <div className={`border w-24 py-6 rounded-md cursor-pointer `} onClick={()=>cuteType("npm")}>
                        <div className='text-center'>npm</div>
                    </div>
                    <div className={`border w-24 py-6 rounded-md cursor-pointer `} onClick={()=>cuteType("Docker")}>
                        <div className='text-center'>Docker</div>
                    </div>
                    <div className={`border w-24 py-6 rounded-md cursor-pointer `} onClick={()=>cuteType("Generic")}>
                        <div className='text-center'>Generic</div>
                    </div>
                    <div className={`border w-24 py-5 rounded-md cursor-pointer `} onClick={()=>cuteType("PyPI")}>
                        <div className='text-center'>PyPI</div>
                    </div>
                    <div className={`border w-24 py-5 rounded-md cursor-pointer`} onClick={()=>cuteType("HeIm")}>
                        <div className='text-center'>HeIm</div>
                    </div>
                    <div className={`border w-24 py-6 rounded-md cursor-pointer `} onClick={()=>cuteType("NuGet")}>
                        <div className='text-center'>NuGet</div>
                    </div>
                    <div className={`border w-24 py-6 rounded-md cursor-pointer`} onClick={()=>cuteType("Rpm")}>
                        <div className='text-center'>Rpm</div>
                    </div>
                </div>
            </div>
        </Drawer>
    )

}

export default GuideType