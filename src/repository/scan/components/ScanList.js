/**
 * @name: ScanList
 * @author: limingliang
 * @date: 2023-09-18 16:51
 * @description：扫描列表
 * @update: 2023-09-18 16:51
 */
import React,{useState,useEffect,Fragment} from 'react';
import "./ScanList.scss"
import Breadcrumb from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import {Table, Tooltip, message, Col} from "antd";
import {observer} from "mobx-react";
import { FileTextOutlined} from "@ant-design/icons";
import Page from "../../../common/page/Page";
import AddScanLibraryPop from "./AddScanLibraryPop";
import ScanLibraryStore from "../store/ScanLibraryStore";
import ScanPlayStore from "../store/ScanPlayStore";
import ScanRecordStore from "../store/ScanRecordStore";
import ScanLogDrawer from "./ScanLogDrawer";
import success from "../../../assets/images/img/success.png";
import fail from "../../../assets/images/img/fail.png";
import ScanSetting from "./ScanSetting";
import DeleteExec from "../../../common/delete/DeleteExec";
import {PrivilegeProjectButton} from 'thoughtware-privilege-ui';
import EmptyText from "../../../common/emptyText/EmptyText";
const ScanList = (props) => {
    const {match:{params}} = props;
    const {findScanLibraryPage, createScanLibrary,deleteScanLibrary, refresh,execScan,findExecResult,findNotScanLibraryList}=ScanLibraryStore

    const {findScanPlay,scanPlay}=ScanPlayStore
    const {findScanRecordList,deleteScanRecordByGroup,tableType,setTableType}=ScanRecordStore


    const [scanLibraryList,setScanLibraryList]=useState([])
    const [scanRecordList,setScanRecordList]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalRecord,setTotalRecord]=useState()
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(15)

    const [addVisible,setAddVisible]=useState(false)

    const [notScanLibrary,setNotScanLibrary]=useState([])  //未添加到扫描的
    const [multiState,setMultiState]=useState(false)


    const [logVisible,setLogVisible]=useState(false)  //日志抽屉状态
    const [logScanRecord,setLogScanRecord]=useState()  //打开日志的扫描记录
    const [exeState,setExeState]=useState(false)


    useEffect(async () => {
        if (!tableType){
            setTableType('library')
        }
        findGeneralScanRecordList()
         findScanLibrarys(currentPage)
        await findScanPlay(params.playId)
    }, [refresh]);

    const columns = [
        {
            title: '制品名称',
            dataIndex: ['library','name'],
            key:"name",
            width:'40%',
            ellipsis:true,
        },
        {
            title: '制品版本',
            dataIndex:['library','newVersion'],
            key:"newVersion",
            width:'30%',
            ellipsis:true,
        },
        {
            title: '扫描时间',
            dataIndex: 'scanTime',
            width:'20%',
            ellipsis:true,
            render:(text,record)=><div>{record?.scanTime?record.scanTime:<div className='scan-text-gray'>{"未扫描"}</div>}</div>
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
                            {scanLibraryList.length>1?
                                <DeleteExec value={record} deleteData={deleteScan} title={"确认删除"}/>:
                                <DeleteExec value={record} deleteData={deleteScan} title={"确认删除"} type={"scanLibrary"} />
                            }
                        </div>
                    </PrivilegeProjectButton>

                )
            }
        },
    ];

    const recordColumns =[
        {
            title: '报告编号',
            dataIndex: 'scanGroup',
            key:"scanGroup",
            width:'20%',
            ellipsis:true,
            render: (text,record) =>{
                return(
                    <div className='text-color' onClick={()=>goScanDetails(record)}>{text}</div>
                )
            }
        },
        {
            title: '运行状态',
            dataIndex: 'scanResult',
            key:"scanResult",
            width:'20%',
            ellipsis:true,
            render:(text)=>{
                return(
                    <div>
                        {
                            text==='success'?
                                <div className='scan-text'>
                                    <img  src={success}  style={{width:16,height:16}}/>
                                    <span>成功</span>
                                </div>:
                                <div className='scan-text'>
                                    <img  src={fail}  style={{width:16,height:16}}/>
                                    <span>失败</span>
                                </div>
                        }
                    </div>
                )
            }

        },
        {
            title: '漏洞数',
            dataIndex: 'artifactId',
            key:"artifactId",
            width:'20%',
            ellipsis:true,
            render: (text, record) => {
                return(
                    <div className='scan-text'>
                        <span className='scan-text-red'>{record.holeSeverity}</span>/
                        <span className='scan-text-dired'>{record.holeHigh}</span>/
                        <span className='scan-text-yellow'>{record.holeMiddle}</span>/
                        <span className='scan-text-blue'>{record.holeLow}</span>
                    </div>
                )
            }
        },
        {
            title: '扫描时间',
            dataIndex: 'createTime',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '操作',
            key: 'activity',
            width:'5%',
            ellipsis:true,
            render: (text, record) => {
                return(
                    <div className='icon-style'>
                        <Tooltip title='日志'>
                            <span style={{cursor:"pointer" ,paddingLeft:10}} onClick={()=>openLog(record)}>
                                <FileTextOutlined />
                            </span>
                        </Tooltip>
                        <DeleteExec value={record} deleteData={deleteRecord} title={"确认删除"} type="scanRecord"/>
                    </div>
                )
            }
        },
    ]


    //分页查询扫描制品
    const findScanLibrarys =async (currentPage) => {

        const res=await  findScanLibraryPage({repositoryId:params.id,scanPlayId:params.playId,
            pageParam:{currentPage:currentPage, pageSize:pageSize}})
        if (res.code === 0) {
            setScanLibraryList(res.data.dataList)
            setTotalPage(res.data.totalPage)
            setTotalRecord(res.data.totalRecord)
        }
    }

    //查询总的扫描记录
    const findGeneralScanRecordList = () => {
        findScanRecordList({scanPlayId:params.playId,recordType:'general'}).then(res=>{
            res.code===0&&setScanRecordList(res.data)
        })
    }

    //删除
    const deleteRecord = (value) => {
        deleteScanRecordByGroup(value).then(res=>{
            if(res.code===0){
                findGeneralScanRecordList()
            }
        })
    }

    //打开扫描日志
    const openLog = (value) => {
        setLogVisible(true)
        setLogScanRecord(value)
    }

    //删除
    const deleteScan = (scanLibraryId) => {
        deleteScanLibrary(scanLibraryId).then(res=>{
            if (res.code===0){
                findScanLibrarys(currentPage)
            }
        })
    }

    //执行多个扫描制品
    const excMultiScan = () => {
        setLogScanRecord(null)
        setMultiState(true)
        execScan(params.playId).then(res=>{
            setLogVisible(true)
            if (res.code===0&&res.data==='OK'){

                scanLibraryTime()
            }
        })

    }
    //执行定时任务
    const scanLibraryTime =async()=>{
        let timer=setInterval(()=>{
            findExecResult(params.playId).then(res=>{
                if (res.code===0){
                    setLogScanRecord(res.data)
                    if (res.data.scanResult==='success'){
                        message.success('扫描成功',1)
                        findGeneralScanRecordList()
                        setExeState(true)
                        setMultiState(false)
                        clearInterval(timer)
                    }
                    if (res.data.scanResult==='fail'){
                        message.error('扫描失败',1)
                        findGeneralScanRecordList()
                        setExeState(true)
                        setMultiState(false)
                        clearInterval(timer)
                    }

                    //setScanLibraryList(res.data.scanLibraryList)
                    /*if (res.data.state==="end"){
                        message.info('扫描完成',1)
                        clearInterval(timer)
                        setMultiState(false)
                    }*/
                }else {
                    clearInterval(timer)
                    setMultiState(false)
                }
            })
        },1000)
    }


    //分页
    const changPage =async (value) => {
        setCurrentPage(value)
        await findScanLibrarys(value)
    }

    //刷新查询
    const refreshFind = () => {
        findScanLibrarys(currentPage)
    }

   /* //跳转历史详情
    const goHistory = (value) => {
        props.history.push(`/repository/${params.id}/scanHistory/${value.id}`)
    }*/
    //跳转扫描详情
    const goScanDetails = (value) => {
        props.history.push(`/repository/${params.id}/scanDetails/${value.id}`)
    }

    //打开添加弹窗
    const openAddPop = () => {
        findNotScanLibrary()
        setAddVisible(true)
    }
    //取消添加弹窗
    const cancelAddPop = async () => {
        setAddVisible(false)
    }

    const findNotScanLibrary = (name) => {
        findNotScanLibraryList({repositoryId:params.id,name:name}).then(res=>{
            res.code===0&&setNotScanLibrary(res.data)
        })
    }


    const goBack = () => {
        props.history.go(-1)
    }
    //切换tab
    const cuteTab = (value) => {
        setTableType(value)
        if (value==="report"){findGeneralScanRecordList()}
        if (value==="setting"){findGeneralScanRecordList()}
    }

    return(
        <div className='scan hadess-data-width'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='scan-head-style'>
                    <Breadcrumb firstItem={scanPlay?.playName} goBack={goBack}/>
                </div>
                <div className='scan-play-style'>
                    <div className='scan-play-text'>
                        <div>创建时间:{scanPlay.createTime}</div>
                        {
                            scanRecordList.length>0?
                                <div>最近扫描时间:{scanPlay.newScanTime}</div>:
                                <div >最近扫描时间:  未执行</div>
                        }

                    </div>

                    <PrivilegeProjectButton code={"rpy_scan_manage"} domainId={params.id}>
                        <div className='scan-but-style'>
                            {
                                multiState?
                                    <Btn   type={'primary'} title={'加载中'} />:
                                    scanLibraryList.length>0?
                                        <Btn   type={'primary'} title={'扫描'} onClick={excMultiScan}/>:
                                        <Btn type={'disabled'} title={'扫描'} />
                            }
                        </div>
                    </PrivilegeProjectButton>

                </div>
                <div className='scan-data-style'>
                    <div className='scan-tab-style'>
                        <div className={`${tableType==='library'&&' choose-scanDetails-type'}`} onClick={()=>cuteTab("library")}>制品列表</div>
                        <div className={`${tableType==='report'&&' choose-scanDetails-type'}`} onClick={()=>cuteTab("report")}>扫描报告</div>
                        <div className={`${tableType==='setting'&&' choose-scanDetails-type'}`} onClick={()=>cuteTab("setting")}>定时任务</div>
                    </div>
                    {
                        tableType==='library'&&
                        <Fragment>
                            <div className='scan-library-style' >
                                <div className='scan-library-num'>制品数：{totalRecord}</div>
                                <PrivilegeProjectButton code={"rpy_scan_manage"} domainId={params.id}>
                                    <Btn  title={'添加制品'} onClick={()=> openAddPop(true)}/>
                                </PrivilegeProjectButton>
                            </div>
                            <Table
                                columns={columns}
                                dataSource={scanLibraryList}
                                pagination={false}
                                className='scan-tab-top'
                            />
                            <Page pageCurrent={currentPage}
                                  changPage={changPage}
                                  totalPage={totalPage}
                                  totalRecord={totalRecord}
                                  refresh={refreshFind}
                            />
                        </Fragment>||
                        tableType==='report'&&
                        <Fragment>
                            <div className='scan-library-style' >
                                <div className='scan-library-num'>报告数：{scanRecordList?scanRecordList.length:0}</div>
                                <Btn type={'disabled'} title={'导出'} />
                            </div>
                            <Table
                                columns={recordColumns}
                                dataSource={scanRecordList}
                                pagination={false}
                                className='scan-tab-top'
                                locale={{emptyText: <EmptyText title={"暂无数据"}/>}}
                            />
                        </Fragment>||
                        tableType==='setting'&&
                        <ScanSetting repositoryId={params.id} scanPlayId={params.playId} scanLibraryList={scanLibraryList}/>
                    }

                </div>
            </Col>

            <AddScanLibraryPop  {...props} addVisible={addVisible}  setAddVisible={cancelAddPop} notScanLibrary={notScanLibrary}
                               findNotScanLibrary={findNotScanLibrary} createScanLibrary={createScanLibrary} />

            <ScanLogDrawer visible={logVisible} setVisible={setLogVisible} scanRecord={logScanRecord}/>

        </div>
    )

}
export default observer(ScanList)
