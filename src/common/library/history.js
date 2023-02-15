/**
 * @name: LibraryHistory
 * @author: limingliang
 * @date: 2023-01-09 14:30
 * @description：制品详情-历史版本
 * @update: 2023-01-09 14:30
 */
import React, {useState, useEffect} from "react";
import {Table, Tooltip,Modal} from "antd";
import Paging from "../components/paging";
import {DeleteOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import LibraryTable from "../components/libraryTable";
import libraryService from "../../service/library.service";
const { confirm } = Modal;
const History = (props) => {
    const {versionId,type,repositoryId}=props
    const [versionList,setVersionList]=useState([])  //版本列表
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPage,setTotalPage]=useState(0);  //总页数
    const columns = [
        {
            title: '版本',
            dataIndex: 'version',
            width:'10%',
            render:(text,record)=><div className='text-blue-500 cursor-pointer' onClick={()=>openVersionDetail(record)}> {text}</div>
        },
        {
            title: '大小',
            dataIndex: 'size',
            width:'10%',

        },
        {
            title: '推送人',
            dataIndex: ['user','name'],
            width:'10%',

        },
        {
            title: '创建时间',
            dataIndex: "createTime",
            width:'10%',

        },
        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => (
                <Tooltip title="删除">
                    <DeleteOutlined className='cursor-pointer' onClick={()=>deletePop(record.id)}/>
                </Tooltip>
            )
        }
    ];

    useEffect(async () => {
        await findHistoryVersion(currentPage)

    }, []);

    const findHistoryVersion = async (currentPage) => {
        const formParam=new FormData()
        formParam.append('id',versionId)
        const formRes = await libraryService.findLibraryVersion(formParam)
        if (formRes.code===0){
            const param={
                libraryId:formRes.data.library.id,
                pageParam: {
                    pageSize: pageSize,
                    currentPage: currentPage,
                }
            }
            const res = await libraryService.findLibraryVersionPage(param)
            if (res.code===0){
                setTotalPage(res.data.totalPage)
                setVersionList(res.data.dataList)
            }
        }
    }
    //删除弹窗
    const deletePop =async (versionId) => {
        let message;
        if (versionList.length===1){
            message='注意，该版本为唯一版本 删除后制品将完全被删除'
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
    //删除版本
    const deleteHistoryVersion =async (versionId) => {

    }


    const openVersionDetail =async (value) => {
        if (type==='repository'){
            props.history.push(`/index/repository/${repositoryId}/libraryList/survey/${value.id}`)
        }else {
            props.history.push(`/index/library/librarySurvey/${value.id}`)
        }
    }
    //分页
    const handleTableChange = async (value) => {
        setCurrentPage(value)
        await findHistoryVersion(value)

    }
    return(
        <div>
            <LibraryTable type={type}  classify={"history"}  versionId={versionId} {...props} />
            <Table
                dataSource={versionList}
                columns={columns}
                pagination={false}
            />
            <Paging totalPage={totalPage} currentPage={currentPage} handleTableChange={handleTableChange}/>
        </div>
    )
}
export default History
