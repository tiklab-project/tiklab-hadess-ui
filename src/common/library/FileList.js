/**
 * @name: FileList
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品文件列表
 * @update: 2022-12-30 10:30
 */
import React,{useEffect, useState}  from "react";
import LibraryTopNav from "./LibraryTopNav";
import {Space, Table, Tooltip} from "antd";
import FileDetails from "./FileDetails"
import './fileList.scss'
import libraryStore from "../../library/store/LibraryStore"
import {observer} from "mobx-react";
import {DownloadOutlined} from "@ant-design/icons";
const FileList = (props) => {
    const {versionId,type}=props
    const {findLibraryNewFileList,findLibraryMaven,libraryMavenData,findServerIp,serverIp}=libraryStore

    //制品文件列表
    const [fileDetail,setFileDetail]=useState(null)
    const [libraryFileList,setLibraryFileList]=useState([]);
    //制品文件详情弹窗
    const [detailsVisible,setDetailsVisible]=useState(false)


    const columns = [
        {
            title: '名称',
            dataIndex: 'fileName',
            width:'50%',
            render: (text, record) => {
                return <a className='file-handle' onClick={() => openDetails(record)}>{record.fileName}</a>
            }
        },
        {
            title: '版本',
            dataIndex: ["libraryVersion",'version'],
            width:'30%',
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
                    <Tooltip title='下载'>
                        <DownloadOutlined style={{fontSize:16}} onClick={()=>download(record)}/>
                    </Tooltip>
                </Space>
            )
        },
    ];

    useEffect(async () => {
        const param={
            libraryVersionId:versionId
        }
      const res=await  findLibraryNewFileList(param)
        if (res.code===0){
            setLibraryFileList(res.data)
        }

        await findServerIp()
    }, []);


    /**
     * 制品文件下载
     * @param  fileId 制品文件id
     */
    const download =async (fileDetail) => {
        window.open(serverIp+"/libraryFile/download/"+fileDetail?.fileUrl)
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
            <LibraryTopNav type={type} classify={"file"} versionId={versionId}   {...props} />
            <div className='library-file'>
                <Table
                    dataSource={libraryFileList}
                    columns={columns}
                    pagination={false}
                />
            </div>
            <FileDetails onClose={closeFileDetails} visible={detailsVisible} fileDetail={fileDetail} mavenData={libraryMavenData} serverIp={serverIp}/>
        </div>
    )


}
export default observer(FileList)
