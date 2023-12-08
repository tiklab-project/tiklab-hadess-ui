/**
 * @name: HoleEdit
 * @author: limingliang
 * @date: 2023-11-08 14:30
 * @description：添加漏洞信息
 * @update: 2023-11-08 14:30
 */
import React,{useState,useEffect} from 'react';
import {observer} from "mobx-react";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
const HoleEdit = (props) => {

    /**
     * 跳转到上一级路由
     */
    const goBack = () => {
        props.history.go(-1)
    }
    return(
        <div className='hole'>
            <div className='xpack-home-limited'>
                <div className='hole-up'>
                    <BreadcrumbContent firstItem={'漏洞添加'} goBack={goBack}/>
                </div>
             </div>
        </div>
    )
}
export default observer(HoleEdit)
