/**
 * @name: FileList
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品文件列表
 * @update: 2022-12-30 10:30
 */
import React,{useEffect, useState}  from "react";
import LibraryTable from "../../common/components/libraryTable";
import { Space, Table} from "antd";
import FileDetails from "./FileDetails"
import './fileList.scss'
import libraryStore from "../../library/store/LibraryStore"
const FileList = (props) => {
    const {versionId,type}=props
    const {findLibraryNewFileList,findLibraryMaven,libraryMavenData,findServerIp,serverIp}=libraryStore

    const [libraryFileList,setLibraryFileList]=useState([])
    //制品文件列表
    const [fileDetail,setFileDetail]=useState(null)

    //制品文件详情弹窗
    const [detailsVisible,setDetailsVisible]=useState(false)


    const columns = [
        {
            title: '名称',
            dataIndex: 'fileName',
            width:'10%',
            render: (text, record) => {
                return <a className='file-handle' onClick={() => openDetails(record)}>{record.fileName}</a>
            }
        },
        {
            title: '大小',
            dataIndex: 'fileSize',
            width:'10%',
        },
        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => (
                <Space>
                    <a className='file-handle'  onClick={()=>download(record)}>下载</a>
                </Space>
            )
        },
    ];

    useEffect(async () => {
        await findLibraryFile()
        await findServerIp()
    }, []);

    const findLibraryFile =async () => {
        const param={
            libraryVersionId:versionId
        }
        const res=await findLibraryNewFileList(param)
        debugger
        if (res.code===0){
            setLibraryFileList(res.data)
        }
    }

    /**
     * 制品文件下载
     * @param  fileId 制品文件id
     */
    const download =async (fileDetail) => {
        window.open(serverIp+"/libraryFile/downloadSingleFile"+fileDetail?.fileUrl)
    }

    /**
     * 打开制品文件详情抽屉
     * @param  value 制品文件详情
     */
    const openDetails =async (value) => {
        if (value.library.libraryType==='maven'){
            findLibraryMaven(value.library.id)
        }
        setFileDetail(value)
        setDetailsVisible(true)

    }
    /**
     * 关闭制品文件详情抽屉
     */
    const closeFileDetails =async () => {
        setDetailsVisible(false)
    }

    return(
        <div>
            <LibraryTable type={type} classify={"file"} versionId={versionId} {...props} />
            <Table
                dataSource={libraryFileList}
                columns={columns}
                pagination={false}
            />
            <FileDetails onClose={closeFileDetails} visible={detailsVisible} fileDetail={fileDetail} mavenData={libraryMavenData} serverIp={serverIp}/>
        </div>
    )


}
export default FileList
