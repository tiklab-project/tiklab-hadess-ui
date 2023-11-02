
/**
 * @name: BackupReLog
 * @author: limingliang
 * @date: 2023-06-06 14:30
 * @description：备份与恢复日志
 * @update: 2023-06-06 14:30
 */

import React, {useState,useEffect,Fragment} from "react";
import "./BackupReLog.scss"
import {LeftOutlined} from "@ant-design/icons";
const BackupReLog = (props) => {

    const {log,setDeType}=props
    // 日志滚动条
    const [isActiveSlide,setIsActiveSlide] = useState(true)


    //日志
    const renderPressLog = () => {
        const dataImport=document.getElementById("data-import")
        if(dataImport && isActiveSlide){
            dataImport.scrollTop = dataImport.scrollHeight
        }
        return log || '暂无日志'
    }



    return(
        <div className='backupReLog'>
            <div className='log-style'>
                <div className='log-icon'>
                    <LeftOutlined onClick={()=>setDeType(false)}/>
                </div>
                <div>日志</div>
            </div>

            <div className='progress-content-log' id='data-import' onWheel={()=>setIsActiveSlide(false)}>
                {renderPressLog()}
            </div>
        </div>
    )

}

export default BackupReLog
