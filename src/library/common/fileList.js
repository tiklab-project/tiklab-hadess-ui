/**
 * @name: Librarys
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品列表
 * @update: 2022-12-30 10:30
 */
import React,{useEffect, useState}  from "react";
import LibraryTable from "../../common/components/libraryTable";
import { Space, Table} from "antd";
import libraryService from "../api/LibraryApi";
import FileDetails from "./fileDetails";
const FileList = (props) => {
    const {versionId,type}=props
    const [fileList,setFileList]=useState([])   //文件列表
    const [fileDetail,setFileDetail]=useState(null)   //文件详情
    const [libraryMavenData,setLibraryMavenData]=useState(null)  //maven
    const [detailsVisible,setDetailsVisible]=useState(false)  //详情抽屉打开状态
    const columns = [
        {
            title: '名称',
            dataIndex: 'fileName',
            width:'10%',
            render: (text, record) => {
                return <a className='hover:text-blue-500' onClick={() => openDetails(record)}>{record.fileName}</a>
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
                <Space size="useState" className='space-x-4 text-blue-500 cursor-pointer'>
                    <div  onClick={()=>download(record.id)}>下载</div>
                </Space>
            )
        },
    ];


    useEffect(async () => {
        await findFileList()
    }, []);

    //查询最新版本的制品文件
    const findFileList = async () => {
        const param={
            libraryVersionId:versionId
        }
        const res = await libraryService.findLibraryFileList(param)
        if (res.code===0){
            setFileList(res.data)
        }
    }

    //下载
    const download =async (fileId) => {
         const param = new FormData();
         param.append("libraryFileId",fileId)
         const res = await libraryService.downloadSingleFile(param)
        if (res.code===0){
            await findFileList()
        }
    }

    //打开详情抽屉
    const openDetails =async (value) => {
        if (value.library.libraryType==='maven'){
            await findMaven(value.library.id)
        }
        setFileDetail(value)
        setDetailsVisible(true)

    }
    //关闭详情抽屉
    const closeFileDetails =async () => {
        setDetailsVisible(false)
    }

    const findMaven = async (libraryId) => {
       const param={
           libraryId:libraryId
       }
       const res = await libraryService.findLibraryMavenList(param)
        if (res.code===0){
            setLibraryMavenData(res.data[0])
        }

    }

    return(
        <div>
            <LibraryTable type={type} classify={"file"} versionId={versionId} {...props} />
            <Table
                dataSource={fileList}
                columns={columns}
                pagination={false}
            />
            <FileDetails onClose={closeFileDetails} visible={detailsVisible} fileDetail={fileDetail} mavenData={libraryMavenData}/>
        </div>
    )


}
export default FileList
