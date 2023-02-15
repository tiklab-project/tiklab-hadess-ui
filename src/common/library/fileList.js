/**
 * @name: Librarys
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品列表
 * @update: 2022-12-30 10:30
 */
import React,{useEffect, useState}  from "react";
import LibraryTable from "../components/libraryTable";
import { Space, Table} from "antd";
import libraryService from "../../service/library.service";
const FileList = (props) => {
    const {versionId,type}=props
    const [fileList,setFileList]=useState([])   //文件列表
    const columns = [
        {
            title: '名称',
            dataIndex: 'fileName',
            width:'10%',
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

    return(
        <div>
            <LibraryTable type={type} classify={"file"} versionId={versionId} {...props} />
            <Table
                dataSource={fileList}
                columns={columns}
                pagination={false}
            />
        </div>
    )


}
export default FileList
