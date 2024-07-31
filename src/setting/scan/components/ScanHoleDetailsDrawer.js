/**
 * @name: ScanHoleDetailsDrawer
 * @author: limingliang
 * @date: 2023-11-08 14:30
 * @description：漏洞详情抽屉
 * @update: 2023-11-08 14:30
 */

import React from 'react';
import {Drawer} from 'antd'
import {CloseOutlined} from "@ant-design/icons";
import "./ScanHoleDetailsDrawer.scss"
const ScanHoleDetailsDrawer = (props) => {
    const {visible,setVisible,hole}=props


    //取消弹窗
    const cancelDrawer = () => {
        setVisible(false)
    }

    return(
        <Drawer
            title={hole?.holeName}
            placement='right'
            closable={false}
            width={"60%"}
            className='library-drawer'
            onClose={cancelDrawer}
            visible={visible}
            extra={
                <CloseOutlined style={{cursor:'pointer'}} onClick={cancelDrawer} />
            }
        >
            <div className='hole-details'>
                <div className='hole-details-style'>
                    <div className='hole-details-title'>漏洞等级</div>
                    {
                        hole?.holeLevel===1&&<div className='text-red'>严重漏洞</div>||
                        hole?.holeLevel===2&&<div className='text-dired'>高危漏洞</div>||
                        hole?.holeLevel===3&&<div className='text-yellow'>中危漏洞</div>||
                        hole?.holeLevel===4&&<div className='text-blue'>低危漏洞</div>
                    }
                </div>
                <div className='hole-details-style hole-details-top'>
                    <div className='hole-details-title'>漏洞编号</div>
                    <div className='hole-details-text'>{hole?.holeNumber}</div>
                </div>
                <div className='hole-details-style hole-details-top'>
                    <div className='hole-details-title'>产品</div>
                    <div className='hole-details-text'>{hole?.product}</div>
                </div>
                <div className='hole-details-style hole-details-top'>
                    <div className='hole-details-title'>vendor</div>
                    <div className='hole-details-text'>{hole?.vendor}</div>
                </div>
                <div className='hole-details-style hole-details-top'>
                    <div className='hole-details-title'>语言</div>
                    <div className='hole-details-text'>{hole?.language}</div>
                </div>
                <div className='hole-details-style hole-details-top'>
                    <div className='hole-details-title'>漏洞描述</div>
                    <div className='hole-details-text'>{hole?.describe}</div>
                </div>
                <div className='hole-details-style hole-details-top'>
                    <div className='hole-details-title'>修复建议</div>
                    <div className='hole-details-text'>{hole?.suggestion}</div>
                </div>
            </div>
        </Drawer>
    )

}
export default ScanHoleDetailsDrawer
