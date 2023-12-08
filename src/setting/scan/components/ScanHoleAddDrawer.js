
/**
 * @name: ScanSchemeDrawer
 * @author: limingliang
 * @date: 2023-11-08 14:30
 * @description：扫描方案详情抽屉
 * @update: 2023-11-08 14:30
 */
import React,{useState,useEffect,Fragment} from 'react';
import {Drawer, Space, Tooltip} from 'antd'
import {CloseOutlined} from "@ant-design/icons";
import "./ScanSchemeDrawer.scss"
const ScanSchemeDrawer = (props) => {
    const {visible,setVisible,scanScheme,scanSonar}=props
    debugger
    //取消弹窗
    const cancelDrawer = () => {
        setVisible(false)
    }
    return(
        <Drawer
            title={scanScheme.schemeName}
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
            <div className='scheme-drawer'>
                <div className='scheme-drawer-style'>
                    <div className='scheme-drawer-title'>方案名称</div>
                    <div>{scanScheme?.schemeName}</div>
                </div>
                <div className='scheme-drawer-style scheme-drawer-top'>
                    <div className='scheme-drawer-title'>扫描类型</div>
                    <div>{scanScheme?.scanWay}</div>
                </div>
                <div className='scheme-drawer-style scheme-drawer-top'>
                    <div className='scheme-drawer-title'>支持语言</div>
                    <div>{scanScheme?.language}</div>
                </div>
                {
                    scanScheme?.scanWay==='sonar'&&
                    <Fragment>
                        <div className='scheme-drawer-style scheme-drawer-top'>
                            <div className='scheme-drawer-title'>执行环境</div>
                            <div>{scanSonar?.deployEnv?.envAddress}</div>
                        </div>
                        <div className='scheme-drawer-style scheme-drawer-top'>
                            <div className='scheme-drawer-title'>sonar地址</div>
                            <div>{scanSonar?.deployServer?.serverAddress}</div>
                        </div>
                    </Fragment>
                }

            </div>

        </Drawer>
    )
}
export default ScanSchemeDrawer
