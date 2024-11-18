/**
 * @name: History
 * @author: limingliang
 * @date: 2023-09-04 10:30
 * @description：历史版本
 * @update: 2023-09-04 10:30
 */
import React, {useState, useEffect} from "react";
import {Input, Popconfirm, Table, Tooltip} from "antd";
import "./History.scss"
import {EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import libraryStore from "../../library/store/LibraryStore";
import {observer} from "mobx-react";
import Page from "../page/Page";
import SearchInput from "../input/SearchInput";
const History = (props) => {
    const {versionData,setVersionId,setSnapshotVersion,location:{pathname},publicState}=props
    const {findHistoryVersionPage,deleteLibraryVersion,deleteSnapshotFile,versionLoad,refresh,setRefresh}=libraryStore
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

    //删除唯一版本后、返回的路径
    const [returnPath,setReturnPath]=useState()
    //const [columns,setColumns]=useState([])


    const columns = [
        {
            title: '版本',
            dataIndex: 'version',
            width:'40%',
            ellipsis:true,
            render:(text,record)=>{
                return(
                    (record.type!=='child'&& !record.children)? <div className='text-color' onClick={()=>goVersion(record)}> {text}</div>:
                        record.type!=='child'?<div> {text}</div>:
                            <div className='text-color' onClick={()=>goSnapshotVersion(record)}> {text}</div>
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
                    (record.type!=='child'&& !record.children)? <div className='text-color' onClick={()=>goVersion(record)}> {text}</div>:
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
        if (pathname.endsWith('details')){
            setReturnPath("/library")
        }else {
           const path= pathname.substring(0,pathname.lastIndexOf("/"))
            setReturnPath(path)
        }
    }, []);


    useEffect(async () => {
        await findHistoryVersion(currentPage)
    }, [versionLoad]);

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

    //跳转历史
    const goVersion = (value) => {
        setVersionId(value.id)
    }

    //快照版本跳转
    const goSnapshotVersion = (value) => {
        setSnapshotVersion(value)
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

    //搜索版本
    const onInputName = (e) => {
        const value=e.target.value
        setSearchName(value)
        if (value===''){
            findHistoryVersion(1)
        }

    }
    //条件查询
    const onSearch = () => {
        findHistoryVersion(1,searchName)
    }

    //删除 type：child 时间戳版本
    const deleteVer = (data,type) => {
        //删除快照版本
        if (type==='child'){
            deleteSnapshotFile(data.versionId,data.version).then(res=>{
                res.code===0&& findHistoryVersionPage(insertData(currentPage,searchName)).then(res=>{
                    //删除成功后 切不存在版了 直接跳转制品列表界面
                    if (res.code===0&&res.data.totalRecord===0){
                        props.history.push(returnPath)
                    }
                    if (res.code===0&&res.data.totalRecord>0){
                        //删除显示详情版本的最后一个快照版本时 刷新详情
                        const versions=res.data.dataList.filter(a=>a.id===data.versionId)
                        if (versions.length===0){
                            setRefresh(!refresh)
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
                    props.history.push(returnPath)
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

    return(
        <div className='history'>
            <SearchInput
                placeholder={'搜索版本'}
                onChange={onInputName}
                onPressEnter={onSearch}
            />
            <Table
                dataSource={historyList}
                columns={publicState?publicColumns:columns}
                pagination={false}
                rowKey = {record => record.id}
                className={'history-table'}
            />

            <Page totalPage={totalPage}
                  pageCurrent={currentPage}
                  changPage={handleTableChange}
                  totalRecord={totalRecord}
                  refresh={refreshFind}
            />
        </div>
    )
}
export default observer(History)
