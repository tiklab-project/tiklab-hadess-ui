/**
 * @name: LibraryFile
 * @author: limingliang
 * @date: 2023-09-04 10:30
 * @description：制品文件
 * @update: 2023-09-04 10:30
 */
import React, {useState, useEffect,Fragment} from "react";
import {Space, Table, Tooltip} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import "./LibraryFileList.scss"
import libraryStore from "../../library/store/LibraryStore";
import LibraryFileDetails from "./LibraryFileDetails";
import {getUser} from "thoughtware-core-ui";
const LibraryFileList = (props) => {
    const {versionData}=props
    const {findLibraryNewFileList,findServerIp,serverIp,findLibraryMaven,libraryMavenData}=libraryStore

    const [libraryFileList,setLibraryFileList]=useState([])
    //制品文件列表
    const [fileDetail,setFileDetail]=useState(null)
    const [detailsVisible,setDetailsVisible]=useState(false)

    useEffect( () => {
       findLibraryNewFileList({libraryVersionId:versionData.id}).then(item=>{
           item.code===0&&setLibraryFileList(item.data)
       })
        findServerIp()
    }, [versionData]);

    const columns = [
        {
            title: '名称',
            dataIndex: 'fileName',
            width:'52%',
            render: (text, record) => {
                return <div className='text-color' onClick={() => openDetails(record)}>{record.fileName}</div>
            }
        },
        {
            title: '版本',
            dataIndex: ["libraryVersion",'version'],
            width:'20%',
        },
        {
            title: '大小',
            dataIndex: 'fileSize',
            width:'20%',
        },
        {
            title: '操作',
            key: 'activity',
            width:'8%',
            render: (text, record) => (
                <Space>
                    <Tooltip title='下载'>
                        <DownloadOutlined style={{fontSize:16}} onClick={()=>download(record)}/>
                    </Tooltip>
                </Space>
            )
        },
    ];

    /**
     * 打开制品文件详情抽屉
     * @param  value 制品文件详情
     */
    const openDetails =async (value) => {
        setFileDetail(value)
        setDetailsVisible(true)
        if (value.library.libraryType==='maven'){
            findLibraryMaven(value.library.id)
        }
    }
    /**
     * 制品文件下载
     * @param  fileId 制品文件id
     */
    const download =async (fileDetail) => {
      //  window.open(`${node_env? base_url:window.location.origin}/fileHand/download/${getUser().tenant?getUser().tenant+"/":''}${fileDetail?.fileUrl}`)
        window.location.href=`${node_env? base_url:window.location.origin}/fileHand/download/${getUser().tenant?getUser().tenant+"/":''}${fileDetail?.fileUrl}`
    }

    const goBack = () => {
        setDetailsVisible(false)
    }

    return (
        <Fragment>
            {
                detailsVisible?
                    <LibraryFileDetails fileDetail={fileDetail} mavenData={libraryMavenData} serverIp={serverIp} goBack={goBack}/> :
                    <div className='library-file'>
                        <Table
                            dataSource={libraryFileList}
                            columns={columns}
                            pagination={false}
                        />
                    </div>
            }
        </Fragment>
    )
}
export default observer(LibraryFileList)
