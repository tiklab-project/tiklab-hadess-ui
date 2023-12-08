/**
 * @name: ScanPlayList
 * @author: limingliang
 * @date: 2023-11-1 10:13
 * @description：扫描计划列表
 * @update: 2023-11-1 10:13
 */
import React,{useState,useEffect} from 'react';
import "./ScanPlayList.scss"
import Breadcrumb from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import {Popconfirm, Table, Tooltip} from "antd";
import ScanPlayEditPop from "./ScanPlayEditPop"
import ScanPlayStore from "../store/ScanPlayStore";
import Page from "../../../common/page/Page";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
const ScanPlayList = (props) => {
    const {match:{params}} = props;
    const {findScanPlayPage,createScanPlay,updateScanPlay,deleteScanPlay,refresh}=ScanPlayStore

    const [scanPlayList,setScanPlayList]=useState([])
    const [scanPlay,setScanPlay]=useState('')
    const [editVisible,setEditVisible]=useState(false)

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(15)

    useEffect(async () => {
        await findScanPlay(currentPage)
    }, [refresh]);

    const columns = [
        {
            title: '计划名称',
            dataIndex: 'playName',
            key:"playName",
            width:'30%',
            render: (text,record) =><div className='text-color' onClick={()=>goScanList(record.id)}>{text}</div>
        },
        {
            title: '制品数',
            dataIndex: 'libraryNum',
            key:"libraryNum",
            width:'20%',
        },
        {
            title: '创建时间',
            dataIndex:'createTime',
            key:"createTime",
            width:'20%',
        },

        {
            title: '扫描时间',
            dataIndex: 'scanTime',
            width:'20%',
        },

        {
            title: '操作',
            key: 'activity',
            width:'20%',
            render: (text, record) => {
                return(
                    <div className='icon-style'>
                        <Tooltip title='编辑'>
                            <EditOutlined onClick={()=>openUpdatePop(record)} />
                        </Tooltip>
                        <Tooltip title='删除'>
                            <Popconfirm
                                title="你确定删除吗"
                                onConfirm={()=>deleteScanPlay(record.id)}
                                okText="确定"
                                cancelText="取消"
                                placement="topRight"
                            >
                                <DeleteOutlined />
                            </Popconfirm>
                        </Tooltip>
                    </div>
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
            }
        })
    }


    //跳转扫描列表
    const goScanList = (playId) => {
        props.history.push(`/index/repository/${params.id}/scanPlay/${playId}`)
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
    const changPage = () => {

    }
    return(
        <div className='scanPlay'>
            <div className='scanPlay-width'>
                <div className='scanPlay-head-style'>
                    <Breadcrumb firstItem={"扫描计划"}/>
                    <Btn   type={'common'} title={'添加计划'} onClick={openEditPop}/>
                </div>
                <div className='scanPlay-data-style'>
                    <Table
                        columns={columns}
                        dataSource={scanPlayList}
                        rowKey={record=>record.id}
                        pagination={false}
                    />
                    <Page pageCurrent={currentPage} changPage={changPage} totalPage={totalPage}/>
                </div>
            </div>
            <ScanPlayEditPop editVisible={editVisible} setEditVisible={setEditVisible} createScanPlay={createScanPlay}
                             updateScanPlay={updateScanPlay}  repositoryId={params.id} scanPlay={scanPlay}/>
        </div>
    )
}
export default observer(ScanPlayList)
