import {observer} from "mobx-react";
import "./LibraryHistory.scss"
import SearchInput from "../input/SearchInput";
import {Modal, Popconfirm, Switch, Table, Tooltip} from "antd";
import Page from "../page/Page";
import React, {useEffect, useState} from "react";
import batchClose from "../../assets/images/img/batch-close.png";
import batchOpen from "../../assets/images/img/batch-open.png";
import libraryStore from "../../library/store/LibraryStore";
import {AlignLeftOutlined, EllipsisOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
const { confirm } = Modal;
const LibraryHistory = (props) => {
    const {crumbsType,versionData,publicState,setVisible,cuteVersion}=props

    const {findHistoryVersionPage,deleteLibraryVersion,deleteSnapshotFile,versionLoad
        ,deleteVersion,deleteBatchesVersion}=libraryStore

    //制品版本列表
    const [historyList,setHistoryList]=useState([])
    //当前页
    const [currentPage, setCurrentPage] = useState(1);
    //每页条数
    const [pageSize] = useState(20);
    const [totalRecord,setTotalRecord]=useState()
    //总页数
    const [totalPage,setTotalPage]=useState(0);

    //搜索信息
    const [searchName,setSearchName]=useState()

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    //批量删除状态
    const [enableRowSelection, setEnableRowSelection] = useState(false);



    // 定义 rowSelection
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };
    const columns = [
        {
            title: '版本',
            dataIndex: 'version',
            width:'40%',
            ellipsis:true,
            render:(text,record)=>{
                return(
                    (record.type!=='child'&& !record.children)? <div className='text-color' onClick={()=>cuteVersion(record)}> {text}</div>:
                        record.type!=='child'?<div> {text}</div>:
                            <div className='text-color'> {text}</div>

                )
            }
        },
        {
            title: '大小',
            dataIndex: 'showSize',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '推送时间',
            dataIndex: "updateTime",
            width:'30%',
            ellipsis:true,
        }, {
            title: '操作',   key: 'activity',
            width:'10%',
            ellipsis:true,
            render: (text, record) => {
                return (
                    <Tooltip title='删除'>
                        <Popconfirm
                            title="你确定删除吗"
                            onConfirm={record.type==='child'?()=>deleteVer(record,"child"):()=>deleteVer(record)}
                            okText="确定"
                            cancelText="取消"
                            placement="topRight"
                        >
                            <EllipsisOutlined style={{fontSize:18}} />
                        </Popconfirm>
                    </Tooltip>
                )
            }
        }
    ];

    const publicColumns = [
        {
            title: '版本',
            dataIndex: 'version',
            width:'40%',
            ellipsis:true,
            render:(text,record)=>{
                return(
                    (record.type!=='child'&& !record.children)? <div className='text-color' onClick={()=>cuteVersion(record)}> {text}</div>:
                        record.type!=='child'?<div> {text}</div>:
                            <div className='text-color' onClick={()=>goSnapshotVersion(record)}> {text}</div>
                )
            }
        },
        {
            title: '大小',
            dataIndex: 'showSize',
            width:'30%',
            ellipsis:true,
        },
        {
            title: '推送时间',
            dataIndex: "updateTime",
            width:'30%',
            ellipsis:true,
        }
    ];

    useEffect(async () => {
        if (crumbsType==='history'){
            await findHistoryVersion(currentPage)
        }

    }, [versionLoad,versionData,crumbsType]);


    /**
     * 查询制品版本列表
     * @param  currentPage 当前页
     */
    const findHistoryVersion = async (currentPage,searchName) => {
        findHistoryVersionPage(insertData(currentPage,searchName)).then(res=>{
            if (res.code===0){
                setHistoryList(res.data.dataList)
                setTotalPage(res.data.totalPage)
                setTotalRecord(res.data.totalRecord)
            }
        })}

    //整合查询条件
    const insertData = (currentPage,searchName) => {
        return  {
            libraryId:versionData.library.id,
            version:searchName,
            pageParam: {
                pageSize: pageSize,
                currentPage: currentPage,
            },
            currentVersionId:versionData.id,
        }
    }

    //条件查询
    const onSearch = () => {
        if (searchName===''){
            findHistoryVersion(1)
        }else {
            findHistoryVersion(1,searchName)
        }
    }


    //搜索版本
    const onInputName = (e) => {
        const value=e.target.value
        setSearchName(value)
        if (value===''){
            findHistoryVersion(1)
        }
    }
    /**
     * 分页查询制品版本
     * @param  value 页面数据
     */
    const handleTableChange = async (value) => {
        setCurrentPage(value)
        await findHistoryVersion(value,searchName)
    }

    //刷新查询
    const refreshFind = () => {
        findHistoryVersion(currentPage,searchName)
    }

    //删除 type：child 时间戳版本
    const deleteVer = (data,type) => {
        //删除快照版本
        if (type==='child'){
            deleteSnapshotFile(data.versionId,data.version).then(res=>{
                res.code===0&& findHistoryVersionPage(insertData(currentPage,searchName)).then(res=>{
                    //删除成功后 且不存在版了 直接跳转制品列表界面
                    if (res.code===0&&res.data.totalRecord===0){
                        setVisible(false)
                    }
                    if (res.code===0&&res.data.totalRecord>0){
                        //删除显示详情版本的最后一个快照版本时 刷新详情
                        const versions=res.data.dataList.filter(a=>a.id===data.versionId)
                        if (versions.length===0){
                            setVisible(false)
                        }else {
                            setHistoryList(res.data.dataList)
                            setTotalPage(res.data.totalPage)
                            setTotalRecord(res.data.totalRecord)
                        }
                    }
                })
            })
        }else {
            //删除版本
            if (versionData.version===data.version){
                if (totalRecord===1){
                    deleteLibraryVersion(data.id,data.library.id)
                    setVisible(false)

                }else {
                    // type：library 删除后刷新查询制品详情想数据
                    deleteVersion(data.id,"library")
                }
            } else {
                // type：version 删除后只刷新下查询版本列表数据
                deleteVersion(data.id,"version")
            }
        }
    }


    //批量删除状态
    const setDeleteInState = (enable) => {
        setEnableRowSelection(enable);
    };

    //批量删除状态
    const deleteIn = () => {
        if (totalRecord===selectedRowKeys.length){
            deleteBatchesVersion({versionList:selectedRowKeys},"library")
            setVisible(false)
        }else {
            deleteBatchesVersion({versionList:selectedRowKeys},"version")
            setEnableRowSelection(false)
            setSelectedRowKeys([])
        }

    };


    return(
        <div className='history'>
            <div className='history-header-nav'>
                <SearchInput
                    placeholder={'搜索版本'}
                    onChange={onInputName}
                    onPressEnter={onSearch}
                />
                {
                    !publicState&&
                    <div className='history-header-icon' >
                        {

                            enableRowSelection&&selectedRowKeys.length>0?
                                <Popconfirm
                                    title="确定批量删除"
                                    onConfirm={deleteIn}
                                    okText="确定"
                                    cancelText="取消"
                                    placement="bottomLeft"
                                >
                                    <div className='header-icon-test'>批量删除</div>
                                </Popconfirm>:

                                <div>
                                    {
                                        enableRowSelection?
                                            <div className='header-icon-test' onClick={()=>setDeleteInState(false)}>取消批量操作</div>:
                                            <Tooltip title='打开批量操作'>
                                                <img  src={batchOpen}  style={{width:22,height:22}} onClick={()=>setDeleteInState(true)}/>
                                            </Tooltip>
                                    }
                                </div>


                            /* <Switch checkedChildren="开启" unCheckedChildren="关闭"  onChange={setDeleteInState} />*/
                        }
                    </div>
                }

            </div>

            <Table
                rowSelection={enableRowSelection ? rowSelection : undefined}
                dataSource={historyList}
                columns={publicState?publicColumns:columns}
                pagination={false}
                rowKey = {record => record.id}
                className={'history-table'}
            />
            {  totalPage>1&&
                <Page totalPage={totalPage}
                      pageCurrent={currentPage}
                      changPage={handleTableChange}
                      totalRecord={totalRecord}
                      refresh={refreshFind}
                />
            }

        </div>
    )
}
export default observer(LibraryHistory)
