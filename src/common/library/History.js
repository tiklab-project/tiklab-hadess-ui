/**
 * @name: History
 * @author: limingliang
 * @date: 2023-01-09 14:30
 * @description：制品详情-历史版本
 * @update: 2023-01-09 14:30
 */
import React, {useState, useEffect} from "react";
import {Table, Tooltip,Modal} from "antd";
import Page from "../../common/page/Page";
import {DeleteOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import LibraryTopNav from "./LibraryTopNav";
import './history.scss'
const { confirm } = Modal;
import libraryStore from "../../library/store/LibraryStore"
import {observer} from "mobx-react";
const History = (props) => {
    const {versionId,type,repositoryId,match:{params}}=props
    const {findLibraryVersion,findHistoryVersionPage,deleteVersionAndLibrary,deleteLibraryVersion}=libraryStore

    //制品版本列表
    const [versionList,setVersionList]=useState([])
    //当前页
    const [currentPage, setCurrentPage] = useState(1);
    //每页条数
    const [pageSize] = useState(15);
    //总页数
    const [totalPage,setTotalPage]=useState(0);

    const columns = [
        {
            title: '版本',
            dataIndex: 'version',
            width:'10%',
            render:(text,record)=><div className='history-name' onClick={()=>openVersionDetail(record)}> {text}</div>
        },
        {
            title: '大小',
            dataIndex: 'size',
            width:'10%',

        },
        {
            title: '推送人',
            dataIndex: 'pusher',
            width:'10%',

        },
        {
            title: '推送时间',
            dataIndex: "updateTime",
            width:'10%',

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

    useEffect(async () => {
        await findHistoryVersion(currentPage)
    }, []);

    /**
     * 查询制品版本列表
     * @param  currentPage 当前页
     */
    const findHistoryVersion = async (currentPage) => {
       const formRes=await findLibraryVersion(versionId)
        if (formRes.code===0){
            const param={
                libraryId:formRes.data.library.id,
                pageParam: {
                    pageSize: pageSize,
                    currentPage: currentPage,
                },
                currentVersionId:params.versionId
            }
            debugger
           const res=await  findHistoryVersionPage(param)
            if (res.code===0){
                setTotalPage(res.data.totalPage)
                setVersionList(res.data.dataList)
            }
        }
    }
    /**
     * 分页查询制品版本
     * @param  value 页面数据
     */
    const handleTableChange = async (value) => {
        setCurrentPage(value)
        await findHistoryVersion(value)

    }

    /**
     * 删除制品版本弹窗
     * @param  versionId 删除制品版本id
     */
    const deletePop =async (versionId) => {
        let message;
        if (versionList.length===1){
            message='注意，该版本为唯一版本 删除后制品将完全被删除, 请谨慎操作'
        }else {
            message='注意：删除版本后该版本不可恢复'
        }
        confirm({
            title:message,
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',

            onOk() {
                deleteHistoryVersion(versionId)
            },
            onCancel() {
            },
        });
    }
    /**
     * 删除制品版本
     * @param  versionId 删除制品版本id
     */
    const deleteHistoryVersion =async (versionId) => {
        if (versionList?.length===1){
           const res=await deleteVersionAndLibrary(versionId)
            if (res.code===0){
                props.history.push(`/index/library`)
            }
        }else {
            const res=await deleteLibraryVersion(versionId)
            if (res.code=== 0){
                 await findHistoryVersion(currentPage)
                onCancel()
            }
        }
    }

    /**
     * 打开制品版本详
     * @param  value 当前制品版本详情
     */
    const openVersionDetail =async (value) => {
        if (type==='repository'){
            props.history.push(`/index/repository/${repositoryId}/libraryList/survey/${value.id}/2`)
        }else {
            props.history.push(`/index/library/${value.libraryType}/survey/${value.id}/2`)
        }
    }

    return(
        <div>
            <LibraryTopNav type={type}  classify={"history"}  versionId={versionId} {...props} />
            <div className='library-history'>
                <Table
                    dataSource={versionList}
                    columns={columns}
                    pagination={false}
                />
            </div>

            {
                (totalPage>1)?
                    <Page totalPage={totalPage} pageCurrent={currentPage} changPage={handleTableChange}/>:null
            }
        </div>
    )
}
export default observer(History)
