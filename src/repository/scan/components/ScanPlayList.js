/**
 * @name: ScanPlayList
 * @author: limingliang
 * @date: 2023-11-1 10:13
 * @description：扫描计划列表
 * @update: 2023-11-1 10:13
 */
import React,{useState,useEffect,Fragment} from 'react';
import "./ScanPlayList.scss"
import Breadcrumb from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import {Col, Popconfirm, Table, Tooltip} from "antd";
import ScanPlayEditPop from "./ScanPlayEditPop"
import ScanPlayStore from "../store/ScanPlayStore";
import Page from "../../../common/page/Page";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import success from "../../../assets/images/img/success.png";
import fail from "../../../assets/images/img/fail.png";
import noExec from "../../../assets/images/img/noExec.png";
import {observer} from "mobx-react";
import DeleteExec from "../../../common/delete/DeleteExec";
import {PrivilegeProjectButton} from 'thoughtware-privilege-ui';
import EmptyText from "../../../common/emptyText/EmptyText";
const ScanPlayList = (props) => {
    const {match:{params}} = props;
    const {findScanPlayPage,createScanPlay,updateScanPlay,deleteScanPlay,refresh}=ScanPlayStore


    const [scanPlayList,setScanPlayList]=useState([])
    const [scanPlay,setScanPlay]=useState('')
    const [editVisible,setEditVisible]=useState(false)

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(15)
    const [totalRecord,setTotalRecord]=useState()

    useEffect(async () => {
        await findScanPlay(currentPage)
    }, [refresh]);

    const columns = [
        {
            title: '计划名称',
            dataIndex: 'playName',
            key:"playName",
            width:'20%',
            ellipsis:true,
            render: (text,record) =><div className='text-color' onClick={()=>goScanList(record.id)}>{text}</div>
        },
        {
            title: '制品数',
            dataIndex: 'libraryNum',
            key:"libraryNum",
            width:'15%',
            ellipsis:true,
        },
        {
            title: '最后一次扫描',
            dataIndex: 'scanTime',
            width:'35%',
            ellipsis:true,
            render:(text,record)=>{
                return(
                    <div >
                        {
                            record?.scanState==="true"?
                                <Fragment>
                                    <div className='last-scan'>
                                        <div>{record?.userName}</div>
                                        <div className='last-scan-text'>扫描{record.newScanTime}</div>
                                    </div>
                                    <div className='last-scan-style' onClick={()=>goDetails(record)}>
                                        {
                                            record?.result==='success'&& <img  src={success}  style={{width:16,height:16}}/>||
                                            record?.result==='fail'&&   <img  src={fail}  style={{width:16,height:16}}/>
                                        }
                                        <div className="">  {record?.scanGroup}</div>
                                    </div>
                                </Fragment>:
                                <div className='no-exec-style'>
                                    <img  src={noExec}  style={{width:16,height:16}}/>
                                    <div>未执行</div>
                                </div>
                        }
                    </div>
                )
            }
        },
        {
            title: '创建时间',
            dataIndex:'createTime',
            key:"createTime",
            width:'20%',
            ellipsis:true,
        },

        {
            title: '操作',
            key: 'activity',
            width:'10%',
            ellipsis:true,
            render: (text, record) => {
                return(
                    <PrivilegeProjectButton code={"rpy_scan_manage"} domainId={params.id}>
                        <div className='icon-style'>
                            <Tooltip title='编辑'>
                                <EditOutlined onClick={()=>openUpdatePop(record)} />
                            </Tooltip>
                            <DeleteExec value={record} deleteData={deleteScanPlay} title={"确认删除计划"}/>
                            {/*<Tooltip title='删除'>
                            <Popconfirm
                                title="你确定删除吗"
                                onConfirm={()=>deleteScanPlay(record.id)}
                                okText="确定"
                                cancelText="取消"
                                placement="topRight"
                            >
                                <DeleteOutlined />
                            </Popconfirm>
                        </Tooltip>*/}
                        </div>
                    </PrivilegeProjectButton>
                )
            }
        },
    ];

    //查询扫描记录
    const findScanPlay = (currentPage) => {
        findScanPlayPage({repositoryId:params.id,pageParam:{currentPage:currentPage, pageSize:pageSize}}).then(res=>{
            if (res.code===0){
                setScanPlayList(res.data.dataList)
                setTotalPage(res.data.totalPage)
                setTotalRecord(res.data.totalRecord)
            }
        })
    }


    //跳转扫描列表
    const goScanList = (playId) => {
        props.history.push(`/repository/${params.id}/scanPlay/${playId}`)
    }
    //打开编辑计划的弹窗
    const openUpdatePop = (value) => {
        setScanPlay(value)
        setEditVisible(true)
    }
    //打开添加计划的弹窗
    const openEditPop = () => {
        setEditVisible(true)
    }

    //分页查询
    const changPage = (value) => {
        setCurrentPage(value)
        findScanPlay(value)
    }
    //刷新查询
    const refreshFind = () => {
        findScanPlay(currentPage)
    }

    //跳转扫描记录详情
    const goDetails = (value) => {
        props.history.push(`/repository/${params.id}/scanDetails/${value.newScanRecordId}`)
    }

    return(
        <div className='scanPlay hadess-data-width'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='scanPlay-head-style'>
                    <Breadcrumb firstItem={"扫描计划"}/>
                    <PrivilegeProjectButton code={"rpy_scan_manage"} domainId={params.id}>
                        <Btn   type={'primary'} title={'添加计划'} onClick={openEditPop}/>
                    </PrivilegeProjectButton>
                </div>
                <div className='scanPlay-data-style'>
                    <Table
                        columns={columns}
                        dataSource={scanPlayList}
                        rowKey={record=>record.id}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={"暂无数据"}/>}}
                    />
                    <Page pageCurrent={currentPage}
                          changPage={changPage}
                          totalPage={totalPage}
                          totalRecord={totalRecord}
                          refresh={refreshFind}
                    />
                </div>
            </Col>

            <ScanPlayEditPop  editVisible={editVisible} setEditVisible={setEditVisible} createScanPlay={createScanPlay}
                             updateScanPlay={updateScanPlay}  repositoryId={params.id} scanPlay={scanPlay} setScanPlay={setScanPlay}/>
        </div>
    )
}
export default observer(ScanPlayList)
