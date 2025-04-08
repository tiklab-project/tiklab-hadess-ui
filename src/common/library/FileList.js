/**
 * @name: FileList
 * @author: limingliang
 * @date: 2023-09-04 10:30
 * @description：制品文件
 * @update: 2023-09-04 10:30
 */
import React, {useState, useEffect,Fragment} from "react";
import {Space, Table, Tooltip} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import "./FileList.scss"
import libraryStore from "../../library/store/LibraryStore";
import {getUser} from "tiklab-core-ui";
import SearchInput from "../input/SearchInput";
const FileList = (props) => {
    const {versionData,openFileDetails}=props
    const {findLibraryNewFileList,findServerIp,findLibraryMaven}=libraryStore

    const [libraryFileList,setLibraryFileList]=useState([])
    const [searchName,setSearchName]=useState()

    useEffect( () => {
        findLibraryFileList()
        findServerIp()
    }, [versionData]);

    const columns = [
        {
            title: '名称',
            dataIndex: 'fileName',
            width:'52%',
            ellipsis:true,
            render: (text, record) => {
                return <div className='text-color' onClick={() => openDetails(record)}>{record.fileName}</div>
            }
        },
        {
            title: '版本',
            dataIndex: version,
            width:'20%',
            ellipsis:true,
            render:()=> <div>{versionData?.version}</div>
        },
        {
            title: '大小',
            dataIndex: 'fileSize',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '操作',
            key: 'activity',
            width:'8%',
            ellipsis:true,
            render: (text, record) => (
                <Space>
                    <Tooltip title='下载'>
                        <DownloadOutlined style={{fontSize:16}} onClick={()=>download(record)}/>
                    </Tooltip>
                </Space>
            )
        },
    ];


    //查询制品文件
    const findLibraryFileList = (searchName) => {
        findLibraryNewFileList({
            libraryVersionId:versionData.id,
            fileName:searchName
        }).then(item=>{
            item.code===0&&setLibraryFileList(item.data)
        })
    }

    /**
     * 打开制品文件详情抽屉
     * @param  value 制品文件详情
     */
    const openDetails =async (value) => {
        openFileDetails(value)
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

    //添加仓库名字
    const onInputName = (e) => {
        const value=e.target.value
        setSearchName(value)
        if (value===''){
            findLibraryFileList()
        }
    }
    //条件查询
    const onSearch = () => {
        findLibraryFileList(searchName)
    }

    return (
        <div className='file'>
            <SearchInput
                placeholder={'搜索文件'}
                onChange={onInputName}
                onPressEnter={onSearch}
            />
            <Table
                dataSource={libraryFileList}
                columns={columns}
                pagination={false}
                className={'file-table'}
            />
        </div>
    )
}
export default observer(FileList)
