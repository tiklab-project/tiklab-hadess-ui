/**
 * @name: PushGroup
 * @author: limingliang
 * @date: 2024-01-24 10:30
 * @description：推送组
 * @update: 2024-01-24 10:30
 */
import React, {useState, useEffect} from "react";
import {observer} from "mobx-react";
import BreadcrumbContent from "../../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../../common/btn/Btn";
import "./PushGroup.scss"
import {Table, Tooltip, Col, Dropdown, Menu} from "antd";
import success from "../../../../assets/images/img/success.png";
import fail from "../../../../assets/images/img/fail.png";
import {EditOutlined} from "@ant-design/icons";
import DeleteExec from "../../../../common/delete/DeleteExec";
import PushGroupStore from "../store/PushGroupStore";
import PushGroupPop from "./PushGroupPop";
import pushOperationStore from "../store/PushOperationStore";
import PushLogDrawer from "./PushLogDrawer";
import {getUser} from "tiklab-core-ui";
const PushGroup = (props) => {
    const {match:{params},repositoryStore} = props;

    const {createPushGroup,updatePushGroup,findPushGroupList,deletePushGroup,refresh}=PushGroupStore
    const {executePushGroup,getPushResult}=pushOperationStore

    const [visible,setVisible]=useState(false)
    const [logVisible,setLogVisible]=useState(false)  //日志状态

    const [pushGroup,setPushGroup]=useState(null)  //推送组
    const [pushGroupList,setPushGroupList]=useState([])  //推送组list
    const [pushGroupIds,setPushGroupIds]=useState([])  //选中的推送组list

    const [pushState,setPushState]=useState(false)  //执行推送状态

    const [pushOperation,setPushOperation]=useState()  //推送的结果





    useEffect(  async () => {
        findPushGroupList({repositoryId:params.id}).then(res=>{
            if (res.code===0){
                setPushGroupList(res.data)
            }
        })

    }, [refresh]);


    //打开添加制品组弹窗
    const openPushGroupPop = () => {
        setVisible(true)
    }

    //打开编辑制品组弹窗
    const openPushGroupPopUp = (value) => {
        setPushGroup(value)
        openPushGroupPop()
    }


    const columns=[
        {
            title: '组名',
            dataIndex: 'groupName',
            width:'35%',
            render:(text,record)=><div className='push-group-name' onClick={()=>goPushLibrary(record)}>{text}</div>
        },
        {
            title: '最近推送',
            dataIndex: 'lastPushTime',
            width:'35%',
            render: (text, record)=>{
                return(
                    <div>{text?
                        <div  className='push-group-new-desc'>
                            <div> {text}</div>
                            <div>{
                                record?.lastPushResult==='success'&& <img  src={success}  style={{width:16,height:16}}/>||
                                record?.lastPushResult==='fail'&&   <img  src={fail}  style={{width:16,height:16}}/>
                            }
                            </div>
                        </div>:
                        <div className='push-group-gray'>{"未推送"}</div>}
                    </div>
                )
            }
        },
        {
            title: '制品数量',
            dataIndex: 'pushLibraryNum',
            width:'20%',
        },

        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => {
                return(
                    <div className='push-group-activity'>
                    {/*    <div className='push-operate push-operate-left'>
                            <Tooltip title='推送'>
                                <PlayCircleOutlined className='remote-icon'
                                                    onClick={() => pushCenter(record)}/>
                            </Tooltip>
                        </div>*/}
                        <div>
                            <Tooltip title='编辑'>
                                <EditOutlined onClick={()=>openPushGroupPopUp(record)}/>
                            </Tooltip>
                        </div>
                        <div>
                            <DeleteExec value={record} deleteData={deletePushGroup} title={"移除推送组，下面的推送制品也将全部移除"}/>
                        </div>

                    </div>
                )}
        },
    ]
    //选择制品
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setPushGroupIds(selectedRowKeys)
        }
    };

    //执行推送组-多个执行
    const multiPushCenter = (value) => {
        executePushGroup({
            pushGroupIds:pushGroupIds,
            pushType:value
        }).then(res=>{
            if (res.code===0&&res.data==='ok'){
                setLogVisible(true)
                setPushState(true)
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
                        setPushState(false)
                        clearInterval(timer)
                    }
                    if (res.data.pushResult==='fail'){
                        setPushState(false)
                        clearInterval(timer)
                    }
                } else {
                    setPushState(false)
                    clearInterval(timer)
                }
            })
        },1000)
    }

    //执行推送组
    const pushCenter = () => {

    }

    //跳转推送组下面的制品列表
    const goPushLibrary = (value) => {
        props.history.push(`/repository/${params.id}/setting/${value.id}/pushLibrary`)
    }


    const items = (
        <Menu>
            <Menu.Item>
                <div  onClick={()=>multiPushCenter("center")}>
                    推送中央仓库
                </div>
            </Menu.Item>
            <Menu.Item>
                <div  onClick={()=>multiPushCenter("hadess")}>
                   推送pubHadess
                </div>
            </Menu.Item>
        </Menu>
    );

    return(
        <div className=' push-group'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='push-group-up'>
                    <BreadcrumbContent firstItem={'制品推送'}/>
                    <Btn   type={'primary'}
                           title={'添加组'}
                           onClick={openPushGroupPop}/>
                </div>
                <div className='push-group-table'>
                    {
                        pushGroupIds.length>0&&
                        <div className='push-group-multi'>
                            <div className='push-num'>推送组数：{pushGroupIds.length}</div>
                            <div >
                                <Dropdown
                                    overlay={items}
                                    trigger={['click']}
                                    getPopupContainer={triggerNode => triggerNode.parentElement}
                                >
                                    <Btn type={'common'} title={'推送'}/>
                                </Dropdown>
                               {/* <Btn  type={'common'} title={'推送'}/>*/}
                            </div>
                        </div>
                    }
                    <Table
                        rowKey = {record => record.id}
                        rowSelection={{
                            type: 'checkbox',
                            ...rowSelection,
                        }}
                        dataSource={pushGroupList}
                        columns={columns}
                        pagination={false}
                    />
                </div>
            </Col>


            <PushGroupPop visible={visible}
                          setVisible={setVisible}
                          createPushGroup={createPushGroup}
                          updatePushGroup={updatePushGroup}
                          repositoryId={params.id}
                          pushGroup={pushGroup}
                          setPushGroup={setPushGroup}/>

            <PushLogDrawer visible={logVisible}
                           setVisible={setLogVisible}
                           pushOperation={pushOperation}  />
        </div>
    )
}
export default observer(PushGroup)
