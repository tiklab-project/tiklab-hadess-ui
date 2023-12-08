/**
 * @name: ScanHistory
 * @author: limingliang
 * @date: 20230-09-18 16:51
 * @description：扫描历史
 * @update: 2023-09-18 16:51
 */
import React,{useState,useEffect,Fragment} from 'react';
import "./ScanHistory.scss"
import Breadcrumb from "../../../common/breadcrumb/Breadcrumb";
import {Popconfirm, Table, Tooltip} from "antd";
import Page from "../../../common/page/Page";
import {
    DeleteOutlined,
} from "@ant-design/icons";
import {observer} from "mobx-react";
import scanRecordStore from "../store/ScanRecordStore";
const ScanHistory = (props) => {
    const {match:{params}} = props;
    const { findScanRecordPage,deleteScanRecord}=scanRecordStore

    const [scanLibraryList,setScanLibraryList]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()

    useEffect(async () => {
        findScanRecord(1)
    }, []);


    const columns = [
        {
            title: '制品名称',
            dataIndex: ['library','name'],
            key:"name",
            width:'30%',
            render: (text,record) =><div className='text-color' onClick={()=>goScanDetails(record)}>{text}</div>
        },
        {
            title: '制品版本',
            dataIndex: 'libraryVersion',
            key:"libraryVersion",
            width:'20%',
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
        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => {
                return(
                    <Popconfirm
                        title="你确定删除吗"
                        onConfirm={()=>deleteScan(record.id)}
                        okText="确定"
                        cancelText="取消"
                        placement="topRight"
                    >
                        <DeleteOutlined/>
                    </Popconfirm>
                )
            }
        },
    ];
    //删除
    const deleteScan = (scanRecordId) => {
        deleteScanRecord(scanRecordId).then(res=>{
            res.code===0&&findScanRecord(currentPage)
        })
    }

    //分页查询扫描制品
    const findScanRecord = (currentPage) => {
        findScanRecordPage({scanLibraryId:params.scanRecordId,pageParam:{currentPage:currentPage, pageSize:15}}).then(res=>{
            if (res.code===0){
                setScanLibraryList(res.data.dataList)
                setTotalPage(res.data.totalPage)
            }
        })
    }

    //跳转扫描详情
    const goScanDetails = (value) => {
        props.history.push(`/index/repository/${params.id}/scanDetails/${value.id}/one`)
    }

    //分页
    const changPage = (value) => {
         setCurrentPage(value)
        findScanRecord(value)
    }

    //跳转上页
    const goBack = () => {
        props.history.go(-1)
    }
    return(
        <div className='scanHistory'>
            <div className='scanHistory-width'>
                <Breadcrumb firstItem={"扫描历史"} goBack={goBack}/>
                <div className='scanHistory-data-style'>
                    <Table
                        columns={columns}
                        dataSource={scanLibraryList}
                        rowKey={record=>record.id}
                        pagination={false}
                    />

                    {
                        (totalPage>1)?
                            <Page pageCurrent={currentPage} changPage={changPage} totalPage={totalPage}/>:null
                    }
                </div>
            </div>
        </div>
    )
}
export default observer(ScanHistory)
