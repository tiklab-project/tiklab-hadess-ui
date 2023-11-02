/**
 * @name: Backups
 * @author: limingliang
 * @date: 2023-06-06 14:30
 * @description：备份
 * @update: 2023-06-06 14:30
 */

import React, {useState,useEffect} from "react";
import {Button, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {getUser} from "tiklab-core-ui";
import './BackupRecovery.scss'
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import backupsStore from "../store/BackupsStore"
import {observer} from "mobx-react";
const Recover = (props) => {
    const {setLog,setDeType}=props
    const {recoveryData,gainBackupsRes}=backupsStore

    const[fileName,setFileName]=useState(null)
    // 进度条内容
    const [press,setPress] = useState(null)

    const [execState,setExecState]=useState(false)  //执行状态


    useEffect(async ()=>{
        gainBackupsRes("recover").then(res=>{
            if (res.code===0&&res.data){
                setLog(res.data.log)
                if (res.data.execState==='exec'){
                    setExecState(true)
                }
            }
        })
        setPress(null)
    },[])

    const fileUpload =  {
        accept:'.gz',
        name: 'uploadFile',
        data:{userId:getUser().userId},
        action: `${node_env? base_url:window.location.origin}/xpackBackups/uploadBackups`,
        headers:{
            ticket:getUser().ticket
        },

        onChange(info) {
            setFileName(null)
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            fileList = fileList.map(file => {
                const size=file.originFileObj.size
                if (file.response) {

                    setFileName(file.name)
                }
                return file;
            });
        },
    }

   //定时任务
    const timeTask = (type) => {
        let timer=setInterval(()=>{
            gainBackupsRes(type).then(res=>{
                if (res.code===0){
                    if (res.data){
                        setPress(res.data)
                        setLog(res.data.log)
                        if (res.data.execState==='end'){
                            if (res.data.log.includes("Recovery success end")){
                                message.success('恢复成功',0.5)
                            }
                            if (res.data.log.includes("Recovery fail end")){
                                message.error('恢复失败',0.5)
                            }
                            setExecState(false)
                            clearInterval(timer)
                        }
                    }
                }else {
                    clearInterval(timer)
                }
            })
        },2000)
    }

    //数据恢复
    const recovery =async () => {
        setDeType(true)

        setLog(null)
        setExecState(true)
        const res=await recoveryData(fileName)
        if (res.code===0&&res.data==="OK"){
            timeTask("recovery")
        }else {
            setExecState(false)
        }
    }


    return(
        <div className='backupRecovery-nave '>
            <div className='backupRecovery-desc backupRecovery-data'>请注意：数据恢复，如果有数据，会将你现在的所有数据恢复到备份的版本</div>
            <div className='backupRecovery-desc backupRecovery-data'>为防止误操作，导入需要恢复的压缩包,还需点击按钮才执行恢复操作,压缩包仅支持备份的tar.gz压缩文件</div>
            <div className='backupRecovery-nave-top'>
                {
                    fileName
                        ?<Upload {...fileUpload} >
                        </Upload>
                        :  <Upload {...fileUpload} >
                            <Button icon={<UploadOutlined />}>提交备份压缩文件</Button>
                        </Upload>
                }
            </div>
            <div className='backupRecovery-nave-top'>
                {
                    (execState||!fileName)?
                        <Button type="primary" className='backupRecovery-button'  disabled>恢复</Button>:
                        <Button type="primary" className='backupRecovery-button' onClick={recovery} >恢复</Button>
                }
            </div>

        </div>
    )
}
export default  observer(Recover)
