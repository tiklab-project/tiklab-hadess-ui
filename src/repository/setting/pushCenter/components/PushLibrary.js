/**
 * @name: PushLibrary
 * @author: limingliang
 * @date: 2023-7-19 10:30
 * @description：推送中央仓库
 * @update: 2023-07-19 10:30
 */
import React, {useState, useEffect} from "react";
import {Col, Table, Tooltip, Input} from "antd";
import "./PushLibrary.scss"
import BreadcrumbContent from '../../../../common/breadcrumb/Breadcrumb';
import LibraryStore from "../../../../library/store/LibraryStore";
import PushCenterStore from "../store/PushCenterStore";
import {inject, observer} from "mobx-react";
import {
    DeleteOutlined,
    LoadingOutlined,
    PlayCircleOutlined,
    SearchOutlined, SyncOutlined
} from "@ant-design/icons";
import Btn from "../../../../common/btn/Btn";
import LibraryOption from "./LibraryOption";
import {withRouter} from "react-router";
import Page from "../../../../common/page/Page";
import success from "../../../../assets/images/img/success.png";
import fail from "../../../../assets/images/img/fail.png";
import DeleteExec from "../../../../common/delete/DeleteExec";
import pushGroupStore from "../store/PushGroupStore";
import PushOperationStore from "../store/PushOperationStore";
import {getUser} from "tiklab-core-ui";
import PushLogDrawer from "./PushLogDrawer";
const PushLibrary = (props) => {
    const {match:{params},repositoryStore} = props;
    const {libraryList,findNotPushLibraryList}=LibraryStore
    const {pushCentralWare,pushResult,findPushLibraryList,createPushLibrary,deletePushLibrary,refresh}=PushCenterStore
    const {findPushGroup,pushGroup}=pushGroupStore
    const {executePushLibrary,getPushResult}=PushOperationStore

    const [PushLibrary,setPushLibrary]=useState([])   //推送版本
    const [pushLibraryList,setPushLibraryList]=useState([])

    const [addVisible,setAddVisible]=useState(false)
    const [logVisible,setLogVisible]=useState(false)  //日志状态

    const [searchName,setSearchName]=useState('')

    //推送的制品ids
    const [pushLibraryIds,setPushLibraryIds]=useState([])
    //推送的结果
    const [pushOperation,setPushOperation]=useState()

    //单个推送按钮状态
    const [onePushState,setOnePushState]=useState(true)


    useEffect(  async () => {
        findPushGroup(params.pushGroupId)

        getPushLibraryList()
       //await findPushList(currentPage)

    }, [refresh]);

    const columns=[
        {
            title: '制品名称',
            dataIndex: ['library','name'],
            width:'30%',
        },
        {
            title: '版本',
            dataIndex: 'libraryVersion',
            width:'30%',
        },
        {
            title: '最近推送',
            dataIndex: 'lastPushTime',
            width:'30%',
            render: (text, record)=>{
                return(
                    <div>{text?
                        <div  className='push-library-new-desc'>
                            <div> {text}</div>
                            <div>{
                                    record?.lastPushResult==='success'&& <img  src={success}  style={{width:16,height:16}}/>||
                                    record?.lastPushResult==='fail'&&   <img  src={fail}  style={{width:16,height:16}}/>
                                }
                            </div>
                        </div>:
                        <div className='push-library-gray'>{"未推送"}</div>}
                    </div>
                )
            }
        },
        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => {
                const stateInfo = PushLibrary.filter(a=>a.id===record.id)
                return(
                    <div className='push-library-activity'>
                        <div className='push-operate push-operate-left'>
                            {
                                (stateInfo && stateInfo[0]?.state) ?
                                    <SyncOutlined spin/>:
                                    <Tooltip title='推送'>
                                        <PlayCircleOutlined className='remote-icon'
                                                            onClick={() => pushCenter(record.id)}/>
                                    </Tooltip>
                            }
                        </div>
                        <div>
                            <DeleteExec value={record} deleteData={deletePushLibrary} title={"是否移除该推送"}/>
                        </div>
                    </div>
                )}
        },
    ]

    //查询添加的推送制品
    const getPushLibraryList = () => {
        findPushLibraryList({repositoryId:params.id,pushGroupId:params.pushGroupId,libraryName:searchName}).then(res=>{
            if (res.code===0){
                setPushLibraryList(res.data)
            }
        })
    }


    //输入制品名称
    const onInputName = (e) => {
        setSearchName(e.target.value)
    }
    //搜索
    const onSearch = async () => {
        getPushLibraryList()
    }





    //推送中央仓库
    const pushCenter =async (pushLibraryId) => {
       // setPushLibrary(PushLibrary.concat({id:value.id,state:true}))

        const res=await pushCentralWare(pushLibraryId)
        if (res.code===0&&res.data==="ok"){
            await timeTask(value.repositoryId)
        }
    }

    //多个推送中央仓库
    const multiPushCenter = () => {
        executePushLibrary({pushLibraryIds:pushLibraryIds}).then(res=>{
            if (res.code===0&&res.data==='ok'){
                setLogVisible(true)
                timeTask(getUser().userId)
            }
        })
    }

    //定时任务
    const timeTask =async (value) => {

        let timer=setInterval(()=>{
            getPushResult(value).then(res=>{
                if (res.code===0){
                    setPushOperation(res.data)
                    if (res.data.pushResult==='success'){

                        clearInterval(timer)
                    }
                    if (res.data.pushResult==='fail'){

                        clearInterval(timer)
                    }
                } else {
                    clearInterval(timer)
                }
            })
        },1000)
    }

    //替换状态
    const updatePushVersion = (value) => {
        const newArray = PushLibrary.map(function(info) {
            if (info.id === value) {
                info.stat = false; // 替换状态
            }
            return info;
        });
         findPushLibraryList(params.id)
        setPushLibrary(newArray)
    }

    //选择制品
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setOnePushState(false)
            setPushLibraryIds(selectedRowKeys)

        }
    };

    //打开推送制品的弹窗
    const openPushLibrary = () => {
        findNotPushLibraryList({repositoryId:params.id})
      setAddVisible(true)
    }

    //回跳到上一个页面
    const goBack = () => {
        props.history.go(-1)
    }

    return(
        <div className=' push-library'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='push-library-up'>
                    <BreadcrumbContent firstItem={pushGroup?.groupName} goBack={goBack}/>
                    <Btn   type={'primary'}
                           title={'添加制品'}
                           onClick={openPushLibrary}/>
                </div>
                <div className='push-library-search'>
                    <Input placeholder={'名称'} value={searchName}  onChange={onInputName}
                           onPressEnter={onSearch}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>} />
                </div>

                <div className='push-library-table'>
                    {
                        pushLibraryIds.length>0&&
                        <div className='push-library-multi'>
                            <div className='push-num'>推送数：{pushLibraryIds.length}</div>
                            <div onClick={multiPushCenter}>
                                <Btn  type={'common'} title={'推送'} />
                            </div>
                        </div>
                    }
                    <Table
                        rowKey = {record => record.id}
                        rowSelection={{
                            type: 'checkbox',
                            ...rowSelection,
                        }}
                        dataSource={pushLibraryList}
                        columns={columns}
                        pagination={false}
                    />
                </div>
            </Col>


            <LibraryOption {...props} addVisible={addVisible}
                           setAddVisible={setAddVisible}
                           libraryList={libraryList}
                           findNotPushLibraryList={findNotPushLibraryList}
                           createPushLibrary={createPushLibrary}
                           pushGroupId={params.pushGroupId}/>

            <PushLogDrawer visible={logVisible}
                           setVisible={setLogVisible}
                           pushOperation={pushOperation}  />
        </div>

    )
}
export default  withRouter(inject('repositoryStore')(observer(PushLibrary)))
