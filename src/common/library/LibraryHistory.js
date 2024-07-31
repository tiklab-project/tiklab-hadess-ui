/**
 * @name: LibraryHistory
 * @author: limingliang
 * @date: 2023-09-04 10:30
 * @description：历史版本
 * @update: 2023-09-04 10:30
 */
import React, {useState, useEffect} from "react";
import {Popconfirm, Table, Tooltip} from "antd";
import "./LibraryHistory.scss"
import {DeleteOutlined, EllipsisOutlined, StopOutlined} from "@ant-design/icons";
import libraryStore from "../../library/store/LibraryStore";
import {observer} from "mobx-react";
import Page from "../page/Page";
import DeleteExec from "../delete/DeleteExec";
const LibraryHistory = (props) => {
    const {versionData,setChangeVersionId,setVersionName,historyName}=props

    const {findHistoryVersionPage,deleteVersion,refresh}=libraryStore

    //制品版本列表
    const [historyList,setHistoryList]=useState([])
    //当前页
    const [currentPage, setCurrentPage] = useState(1);
    //每页条数
    const [pageSize] = useState(20);
    const [totalRecord,setTotalRecord]=useState()

    //总页数
    const [totalPage,setTotalPage]=useState(0);

    useEffect(async () => {
        await findHistoryVersion(currentPage)
    }, [refresh]);

    const columns = [
        {
            title: '版本',
            dataIndex: 'version',
            width:'35%',
            render:(text,record)=>{
                return(
                    record.type!=='child'?<div className='text-color' onClick={()=>openVersionDetail(record)}> {text}</div>:
                <div> {text}</div>
                )
            }
        },
        {
            title: '大小',
            dataIndex: 'showSize',
            width:'15%',
        },
        {
            title: '推送人',
            dataIndex: 'pusher',
            width:'20%',

        },
        {
            title: '推送时间',
            dataIndex: "updateTime",
            width:'20%',
        },
        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => {
                   /* if (record.type==='child'){
                        return(<StopOutlined />)
                    }else {
                        return(   historyName===record.version?<StopOutlined />:
                            <DeleteExec value={record} deleteData={deleteVersion} title={"确认删除该版本"}/> )
                    }*/
                return (
                    <Tooltip title='删除'>
                        <Popconfirm
                            title="你确定删除吗"
                            onConfirm={()=>deleteVersion(record.id)}
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



    /**
     * 查询制品版本列表
     * @param  currentPage 当前页
     */
    const findHistoryVersion = async (currentPage) => {
        const param={
            libraryId:versionData.library.id,
            pageParam: {
                pageSize: pageSize,
                currentPage: currentPage,
            },
            currentVersionId:versionData.id
        }
        const res=await  findHistoryVersionPage(param)

        if (res.code===0){
            setHistoryList(res.data.dataList)

            setTotalPage(res.data.totalPage)
            setTotalRecord(res.data.totalRecord)
        }
    }

    //点击版本
    const openVersionDetail = (value) => {
        setVersionName(value.version)
        setChangeVersionId(value.id)
    }



    /**
     * 分页查询制品版本
     * @param  value 页面数据
     */
    const handleTableChange = async (value) => {
        setCurrentPage(value)
        await findHistoryVersion(value)
    }

    //刷新查询
    const refreshFind = () => {
        findHistoryVersion(currentPage)
    }

    return(
        <div className='library-history'>
            <Table
                dataSource={historyList}
                columns={columns}
                pagination={false}
                rowKey = {record => record.id}
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
export default observer(LibraryHistory)
