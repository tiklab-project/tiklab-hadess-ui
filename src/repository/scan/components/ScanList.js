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
import {Table, Tooltip, message, Popconfirm} from "antd";
import {observer} from "mobx-react";
import {DeleteOutlined, HistoryOutlined} from "@ant-design/icons";
import Page from "../../../common/page/Page";
import AddScanLibraryPop from "./AddScanLibraryPop";
import ScanLibraryStore from "../store/ScanLibraryStore";
import ScanPlayStore from "../store/ScanPlayStore";
import ScanRecordStore from "../store/ScanRecordStore";
import libraryStore from "../../../library/store/LibraryStore";
const ScanList = (props) => {
    const {match:{params}} = props;
    const {findScanLibraryPage, createScanLibrary,deleteScanLibrary, refresh,execScan,findExecResult}=ScanLibraryStore
    const {findNotScanLibraryList}=libraryStore
    const {findScanPlay,scanPlay}=ScanPlayStore
    const {findScanRecordByPlay,scanRecordList}=ScanRecordStore


    const [scanLibraryList,setScanLibraryList]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(15)

    const [addVisible,setAddVisible]=useState(false)

    const [notScanLibrary,setNotScanLibrary]=useState([])  //未添加到扫描的
    const [multiState,setMultiState]=useState(false)
    const [tableType,setTableType]=useState('library')

    useEffect(async () => {
        await findScanLibrarys(currentPage)
        await findScanPlay(params.playId)
    }, [refresh]);

    const columns = [
        {
            title: '制品名称',
            dataIndex: ['library','name'],
            key:"name",
            width:'40%',
         /*   render: (text,record) =>{
                return(
                    <div>
                        {record.scanRecord?
                            <div className='text-color' onClick={()=>goScanDetails(record.scanRecord.id,"one")}>{text}</div>:
                            <div>{text}</div>
                        }
                    </div>
                )
            }*/
        },
        {
            title: '制品版本',
            dataIndex:['library','newVersion'],
            key:"newVersion",
            width:'30%',
        },
       /* {
            title: '漏洞数',
            dataIndex: 'artifactId',
            key:"artifactId",
            width:'20%',
            render: (text, record) => {
                return(
                    <span>
                        {record.scanRecord?
                             <div className='scan-text'>
                                 <span className='scan-text-red'>{record.scanRecord.holeSeverity}</span>/
                                 <span className='scan-text-dired'>{record.scanRecord.holeHigh}</span>/
                                 <span className='scan-text-yellow'>{record.scanRecord.holeMiddle}</span>/
                                 <span className='scan-text-blue'>{record.scanRecord.holeLow}</span>
                             </div>
                            :
                            <div className='scan-text-gray'>{"未扫描"}</div>}

                    </span>
                )
            }
        },*/
        {
            title: '扫描时间',
            dataIndex: 'scanTime',
            width:'20%',
            render:(text,record)=><div>{record.scanRecord?record.scanRecord.createTime:<div className='scan-text-gray'>{"未扫描"}</div>}</div>
        },

        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => {
                return(
                    <div className='icon-style'>
                    {/*    {
                            record.scanRecord&&
                            <Tooltip title='历史' style={{marginBottom:10}}>
                                <HistoryOutlined   onClick={()=>goHistory(record)}/>
                            </Tooltip>
                        }*/}
                        <Popconfirm
                            title="你确定删除吗"
                            onConfirm={()=>deleteScan(record.id)}
                            okText="确定"
                            cancelText="取消"
                            placement="topRight"
                        >
                            <DeleteOutlined />
                        </Popconfirm>
                    </div>
                )
            }
        },
    ];

    const recordColumns =[
        {
            title: '扫描报告',
            dataIndex: 'scanGroup',
            key:"name",
            width:'30%',
            render: (text,record) =>{
                return(
                    <div className='text-color' onClick={()=>goScanDetails(text,"group")}>{text}</div>
                )
            }
        },
        {
            title: '漏洞数',
            dataIndex: 'artifactId',
            key:"artifactId",
            width:'20%',
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
        },

    ]


    //分页查询扫描制品
    const findScanLibrarys =async (currentPage) => {
            const res=await  findScanLibraryPage({repositoryId:params.id,scanPlayId:params.playId,
                pageParam:{currentPage:currentPage, pageSize:pageSize}})
            if (res.code === 0) {
                setScanLibraryList(res.data.dataList)
                setTotalPage(res.data.totalPage)
            }
    }

    //删除
    const deleteScan = (scanLibraryId) => {
        deleteScanLibrary(scanLibraryId).then(res=>{
            res.code===0&&findScanLibrarys(currentPage)
        })
    }

    //执行多个扫描制品
    const excMultiScan = () => {
        execScan(params.playId).then(res=>{
            if (res.code===0&&res.data==='OK'){
                setMultiState(true)
                scanLibraryTime()
            }
        })

    }
    //执行多个定时任务
    const scanLibraryTime =async()=>{
        let timer=setInterval(()=>{
            findExecResult(params.playId).then(res=>{
                if (res.code===0){
                    setScanLibraryList(res.data.scanLibraryList)
                    if (res.data.state==="end"){
                        message.info('扫描完成',1)
                        clearInterval(timer)
                        setMultiState(false)
                    }
                }else {
                    clearInterval(timer)
                    setMultiState(false)
                }
            })
        },2000)
    }


    //分页
    const changPage =async (value) => {
        setCurrentPage(value)
        await findScanLibrarys(value)
    }

    //跳转历史详情
    const goHistory = (value) => {
        props.history.push(`/index/repository/${params.id}/scanHistory/${value.id}`)
    }
    //跳转扫描详情
    const goScanDetails = (value,type) => {
        props.history.push(`/index/repository/${params.id}/scanDetails/${value}/${type}`)
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

    //选择制品
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
           const choiceItem= selectedRows.map(item=>(
                {
                    scanLibraryId:item.id,
                    libraryId:item.library.id,
                    version:item.library.newVersion
                }
            ))
           // setExcScanLibraryIds(choiceItem)
          //  setExcScanLibraryIds(selectedRowKeys)
        }
    };

    const goBack = () => {
        props.history.go(-1)
    }
    //切换tab
    const cuteTab = (value) => {
      setTableType(value)
        if (value==="report"){
            findScanRecordByPlay({scanPlayId:params.playId})
        }
    }

    return(
        <div className='scan'>
            <div className='scan-width'>
                <div className='scan-head-style'>
                    <Breadcrumb firstItem={"扫描列表"} goBack={goBack}/>
                </div>
                <div className='scan-play-style'>
                    <div className='scan-play-text'>
                        <div>{scanPlay?.playName}</div>
                    </div>
                    <div className='scan-but-style'>

                        {
                            multiState?
                                <Btn   type={'primary'} title={'加载中'} />:
                                <Btn   type={'primary'} title={'扫描'} onClick={excMultiScan}/>
                        }
                    </div>
                </div>
                <div className='scan-data-style'>
                    <div className='scan-tab-style'>
                        <div className={`${tableType==='library'&&' choose-scanDetails-type'}`} onClick={()=>cuteTab("library")}>制品</div>
                        <div className={`${tableType==='report'&&' choose-scanDetails-type'}`} onClick={()=>cuteTab("report")}>扫描报告</div>
                    </div>
                    <div style={{paddingTop:20}}>
                        <Btn   type={'primary'} title={'添加制品'} onClick={()=> openAddPop(true)}/>
                    </div>

                    {
                        tableType==='library'?
                            <Fragment>
                                <Table
                                    columns={columns}
                                    dataSource={scanLibraryList}
                                    rowKey={record=>record.id}
                                    pagination={false}
                                    className='scan-tab-top'
                                />
                                <Page pageCurrent={currentPage} changPage={changPage} totalPage={totalPage}/>
                            </Fragment>: <Table
                                columns={recordColumns}
                                dataSource={scanRecordList}
                                rowKey={record=>record.id}
                                pagination={false}
                                className='scan-tab-top'
                            />
                    }

                </div>
            </div>
            <AddScanLibraryPop  {...props} addVisible={addVisible}  setAddVisible={cancelAddPop} notScanLibrary={notScanLibrary}
                               findNotScanLibrary={findNotScanLibrary} createScanLibrary={createScanLibrary} />
        </div>
    )

}
export default observer(ScanList)
