/**
 * @name: ScanSetting
 * @author: limingliang
 * @date: 2024-01-03 10:13
 * @description：扫描设置
 * @update: 2024-01-03 10:13
 */

import React,{useState,useEffect,Fragment} from 'react';
import "./ScanList.scss"
import {Table, Tooltip, message, Popconfirm, Tag} from "antd";
import Btn from "../../../common/btn/Btn";
import TimeTaskStore from "../store/TimeTaskStore";
import TimeTaskPop from "../../../common/timetask/TimeTaskPop";
import DeleteExec from "../../../common/delete/DeleteExec";
import {PrivilegeProjectButton} from 'tiklab-privilege-ui';
import {observer} from "mobx-react";
import EmptyText from "../../../common/emptyText/EmptyText";
const ScanSetting = (props) => {

    const {repositoryId,scanPlayId,scanLibraryList}=props
    const {createTimeTask,findTimeTaskList,deleteTimeTask,refresh}=TimeTaskStore

    const [timeVisible,setTimeVisible]=useState(false)
    const [timedTaskList,setTimedTaskList]=useState([])  //定时任务列表

    useEffect(async () => {
        findTimeTaskList({scanPlayId:scanPlayId}).then(res=>{
            if (res.code===0){
                setTimedTaskList(res.data)
            }
        })
    }, [refresh]);

    const columns = [
        {
            title: '执行周',
            dataIndex:"execWeek",
            key:"execWeek",
            width:'30%',
        },
        {
            title: '执行时间',
            dataIndex:"execTime",
            key:"execTime",
            width:'20%',
        },
        {
            title: '执行方式',
            dataIndex:"taskWay",
            key:"taskWay",
            width:'20%',
            render:(text)=>text===1?<div>单次触发</div>:<div>循环触发</div>
        },
        {
            title: '执行状态',
            dataIndex: 'execState',
            width:'20%',
            render:text => text===1 &&
                <Tag color="gray">未执行</Tag>||
                text===2 &&<Tag color="green">已执行</Tag>||
                text===3 &&<Tag color="red">执行中</Tag>
        },
        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => {
                return(
                    <DeleteExec value={record} deleteData={deleteTimeTask} title={"确认删除"}/>
                )
            }
        },
    ];



    return(
        <Fragment>
            <div className='scan-library-style' >
                <div className='scan-library-num'>定时任务：{timedTaskList.length}</div>
                <PrivilegeProjectButton code={"rpy_scan_manage"} domainId={repositoryId}>
                    {
                        scanLibraryList.length>0? <Btn  title={'添加任务'} onClick={()=> setTimeVisible(true)}/>:
                            <Btn type={'disabled'} title={'添加任务'} />
                    }
                </PrivilegeProjectButton>
            </div>
            <Table
                columns={columns}
                dataSource={timedTaskList}
                pagination={false}
                className='scan-tab-top'
                locale={{emptyText: <EmptyText title={"暂无数据"}/>}}
            />

         <TimeTaskPop visible={timeVisible} setVisible={setTimeVisible}  createTimeTask={createTimeTask} scanPlayId={scanPlayId}
                      taskType={"scan"}
         />
        </Fragment>
    )
}
export default observer(ScanSetting)
