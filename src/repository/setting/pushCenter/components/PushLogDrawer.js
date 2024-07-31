/**
 * @name: PushLogDrawer
 * @author: limingliang
 * @date: 2024-02-19 14:30
 * @description：推送日志的抽屉
 * @update: 2024-02-19 14:30
 */

import React, {useState, useEffect, useRef} from 'react';
import {Drawer, Space, Tooltip} from 'antd'
import DeleteExec from "../../../../common/delete/DeleteExec";
import BreadcrumbContent from "../../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../../common/btn/Btn";
import {CloseOutlined} from "@ant-design/icons";
import "./PushLogDrawer.scss"

const PushLogDrawer = (props) => {
    const {visible,setVisible,pushOperation}=props

    // 日志滚动条
    const [isActiveSlide,setIsActiveSlide] = useState(true);


    const goBack = () => {
        setVisible(false)
    }


    //日志
    const renderPressLog = () => {
        const dataImport=document.getElementById("data-import")
        if(dataImport && isActiveSlide){
            dataImport.scrollTop = dataImport.scrollHeight
        }
        return    pushOperation&&pushOperation.log || '暂无日志'
    }

    return(
        <Drawer
            width={"60%"}
            visible={visible}
            placement="right"
            closable={false}
            destroyOnClose={true}
            onClose={()=>setVisible(false)}
            contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
            bodyStyle={{padding:0,overflow:"hidden"}}
        >
            <div className='push-log'>
                <div className='push-log-bread'>
                    <BreadcrumbContent  firstItem={"推送日志"}>
                        <Btn
                            title={<CloseOutlined style={{fontSize:16}}/>}
                            type="text"
                            onClick={goBack}
                        />
                    </BreadcrumbContent>
                </div>
                <div className="push-log-bottom">
                    <div className='push-detail-log'
                         id='data-import'
                         onWheel={()=>setIsActiveSlide(false)}>
                        { renderPressLog() }
                    </div>

                </div>
            </div>
        </Drawer>
    )

}
export default PushLogDrawer
