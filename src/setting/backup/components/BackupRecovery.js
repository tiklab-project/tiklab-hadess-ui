/**
 * @name: BackupRecovery
 * @author: limingliang
 * @date: 2023-06-06 14:30
 * @description：备份与恢复
 * @update: 2023-06-06 14:30
 */
import React, {useState,useEffect,Fragment} from "react";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import "./BackupRecovery.scss"
import {Button, Radio} from "antd";
import backupsStore from "../store/BackupsStore";
import Recover from "./Recover";
import {observer} from "mobx-react";
import BackupReLog from "./BackupReLog";
const BackupRecovery = (props) => {
    const {backupsExec,gainBackupsRes,findBackups,backupsData,updateBackups}=backupsStore

    const [value, setValue] = useState("false");

    // 进度条内容
    const [press,setPress] = useState(null)

    const [execState,setExecState]=useState(false)  //执行状态
    const [tableType,setTableType]=useState("backup")

    const [deType,setDeType]=useState(false)

    const [log,setLog]=useState()  //执行日志


    useEffect(async ()=>{
   /*     gainBackupsRes("backups").then(res=>{
            if (res.code===0&&res.data){
                setLog(res.data.log)
                if (res.data.execState==='exec'){
                    setExecState(true)
                }
            }
        })*/
        await findBackup()

        setPress(null)
    },[])

    //查询备份数据
    const findBackup = async () => {
        const res=await findBackups();
        if (res.code===0){
            setValue(res.data.taskState)
            setLog(res.data.log)
            if (res.data.execState){
                setExecState(false)
            }
        }
    }

    //修改备份数据
    const updateB = (backupsAddress,taskState) => {
        const param={
            ...backupsData,
            /*  backupsAddress:backupsAddress,*/
            taskState:taskState
        }
        updateBackups(param)
    }

    const onChange = (e) => {
        setValue(e.target.value);
        updateB(null,e.target.value)
    }



    //执行备份
    const backups =async () => {
        setDeType(true)
        setLog(null)
        setExecState(true)
        const res=await backupsExec(backupsData)
        if (res.code===0&&res.data==="OK"){
            timeTask("backups")
        }else {
            setExecState(false)
        }
    }

    //定时任务
    const timeTask =async (type) => {
        let timer=setInterval(()=>{
            gainBackupsRes(type).then(res=>{
                if (res.code===0){
                    if (res.data){
                        setLog(res.data.log)
                        if (res.data.execState==='end'){
                            setExecState(false)
                            clearInterval(timer)
                            findBackup()
                        }
                    }
                }else {
                    setExecState(false)
                    findBackup()
                    clearInterval(timer)
                }
            })
        },2000)
    }

    //打开日志详情
    const openDetails = () => {
        setDeType(true)
    }

    //切换tab
    const cutTab = (value) => {
        setDeType(false)
        setTableType(value)
    }



    return(
        <div className='backupRecovery'>
            <div className='xpack-home-limited-870'>
                <div className='backupRecovery-up'>
                    <BreadcrumbContent firstItem={'备份与恢复'}/>
                </div>
                <div className='tab-style'>
                    <div className={`${tableType==='backup'&& ' choose-tab-nav '}  tab-nav`} onClick={()=>cutTab("backup")}>备份</div>
                    <div className={`${tableType==='recovery'&& ' choose-tab-nav '}  tab-nav`} onClick={()=>cutTab("recovery")}>恢复</div>
                </div>
                {
                    !deType&&tableType==='backup'&&
                        <Fragment>
                            <div className='backupRecovery-nave'>
                                <div className='backupRecovery-data'>
                                    <div className='backupRecovery-nav-title'>备份路径：</div>
                                    <div  >{backupsData?.backupsAddress}</div>
                                    {/* <div className='backupRecovery-exec' onClick={edit}>修改</div>*/}
                                </div>
                                <div className=''>
                                    <div className='backupRecovery-data'>
                                        <div className='backupRecovery-nav-title'>定时备份：</div>
                                        <Radio.Group onChange={onChange}  value={value}>
                                            <Radio value={"true"}>开启</Radio>
                                            <Radio value={"false"}>关闭</Radio>
                                        </Radio.Group>
                                        <div className='backupRecovery-desc backupRecovery-desc-left'>(开启定时任务后每天晚上14:00定时备份)</div>
                                    </div>
                                </div>
                                <div className='backupRecovery-data'>
                                    <div className='backupRecovery-nav-title'>最近备份记录：</div>
                                    {
                                        backupsData?.execTime==='non'?<div style={{color:" #999999"}}>{'未执行'}</div>
                                            :   <div>{backupsData?.execTime}</div>
                                    }
                                    <div className='backupRecovery-data-text' onClick={()=>openDetails("backup")}>最近详情</div>
                                </div>
                                <div className='backupRecovery-data'>
                                    <div className='backupRecovery-nav-title'>最近备份结果：</div>
                                    <div>{backupsData?.execResult==='success'&&<div style={{color:" #55a532"}}>{'成功'}</div>
                                        ||backupsData?.execResult==='non'&&<div style={{color:" #999999"}}>{'未执行'}</div>
                                        ||backupsData?.execResult==='fail'&&<div style={{color:" #ff5500"}}>{'失败'}</div>
                                    }</div>
                                </div>
                                {
                                    execState?
                                        <Button type="primary" className='backupRecovery-button'  disabled>备份</Button>:
                                        <Button type="primary" className='backupRecovery-button' onClick={backups} >备份</Button>
                                }

                            </div>
                          {/*  <div className='log'>日志</div>*/}
                        </Fragment>

                }
                {
                    !deType&&tableType==='recovery'&&  <Recover setLog={setLog} setDeType={setDeType}/>
                }
                {
                    deType&&
                    <BackupReLog log={log} setDeType={setDeType}/>
                }

               {/* <div className='progress-content-log' id='data-import' onWheel={()=>setIsActiveSlide(false)}>
                    {renderPressLog()}
                </div>*/}

            </div>
        </div>
    )
}
export default observer(BackupRecovery)
