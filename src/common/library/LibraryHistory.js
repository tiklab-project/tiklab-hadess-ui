/**
 * @name: LibraryHistory
 * @author: limingliang
 * @date: 2023-09-04 10:30
 * @description：历史版本
 * @update: 2023-09-04 10:30
 */
import React, {useState, useEffect} from "react";
import {Table, Tooltip} from "antd";
import "./LibraryHistory.scss"
import {DeleteOutlined} from "@ant-design/icons";
import libraryStore from "../../library/store/LibraryStore";
import {observer} from "mobx-react";
import Page from "../page/Page";
const LibraryHistory = (props) => {
    const {versionData,setVersionId,setVersionName}=props

    const {findHistoryVersionPage}=libraryStore

    //制品版本列表
    const [historyList,setHistoryList]=useState([])
    //当前页
    const [currentPage, setCurrentPage] = useState(1);
    //每页条数
    const [pageSize] = useState(20);
    //总页数
    const [totalPage,setTotalPage]=useState(0);

    useEffect(async () => {
        await findHistoryVersion(currentPage)
    }, []);

    const columns = [
        {
            title: '版本',
            dataIndex: 'version',
            width:'20%',
            render:(text,record)=><div className='text-color' onClick={()=>openVersionDetail(record)}> {text}</div>
        },
        {
            title: '大小',
            dataIndex: 'size',
            width:'20%',

        },
        {
            title: '推送人',
            dataIndex: 'pusher',
            width:'20%',

        },
        {
            title: '推送时间',
            dataIndex: "updateTime",
            width:'30%',

        },
        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => (
                <Tooltip title="删除">
                    <DeleteOutlined className='history-cursor' onClick={()=>deletePop(record.id)}/>
                </Tooltip>
            )
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
            setTotalPage(res.data.totalPage)
            setHistoryList(res.data.dataList)
        }
    }

    //点击版本
    const openVersionDetail = (value) => {
        setVersionName(value.version)
        setVersionId(value.id)
    }

    const deletePop = () => {

    }

    /**
     * 分页查询制品版本
     * @param  value 页面数据
     */
    const handleTableChange = async (value) => {
        setCurrentPage(value)
        await findHistoryVersion(value)

    }
    return(
        <div className='library-history'>
            <Table
                dataSource={historyList}
                columns={columns}
                pagination={false}
            />
            {
                (totalPage>1)?
                    <Page totalPage={totalPage} pageCurrent={currentPage} changPage={handleTableChange}/>:null
            }
        </div>
    )
}
export default observer(LibraryHistory)
