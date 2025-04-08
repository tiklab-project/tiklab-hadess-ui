import {observer} from "mobx-react";
import SearchInput from "../input/SearchInput";
import {Drawer, Space, Table, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import "./LibraryFile.scss"
import libraryStore from "../../library/store/LibraryStore";
import {CloseOutlined, DownloadOutlined, LeftOutlined} from "@ant-design/icons";
import {getUser} from "tiklab-core-ui";
import Breadcrumb from "../breadcrumb/Breadcrumb";
const LibraryFile = (props) => {
    const {crumbsType,versionData}=props
    const {findLibraryNewFileList,findServerIp,findLibraryMaven,libraryMavenData}=libraryStore

    const [libraryFileList,setLibraryFileList]=useState([])
    const [searchName,setSearchName]=useState()

    //文件弹出框
    const [fileVisible,setFileVisible]=useState(false)
    const [fileDetail,setFileDetail]=useState()


    useEffect( () => {
        if (crumbsType==='file'){
            findLibraryFileList()
            findServerIp()
        }
    }, [versionData,crumbsType]);

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
        setFileVisible(true)
        setFileDetail(value)
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

    const goContent = () => {
        const a=getUser().tenant
        window.open(`${node_env? base_url:window.location.origin}/fileHand/read/${a?getUser().tenant+"/":""}${fileDetail?.fileUrl}`)
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

    /**
     * 省略过长路径
     * @param  value
     */
    const omitFiled=(value)=>{
        return(
            value?.length>50?
                <Tooltip placement="right" title={value}>
                    <div style={{
                        display:"flex",
                        overflow: "hidden",
                        maxWidth:"500px",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }} >{value}</div>
                </Tooltip>
                :
                <div  >{value}</div>
        )
    }



    return(
        <div className='file'>
            <div>
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

            <Drawer
                placement='right'
                closable={false}
                width={"50%"}
                onClose={()=>setFileVisible(false)}
                destroyOnClose={true}
                bodyStyle={{overflow:"hidden"}}
                visible={fileVisible}

            >
                <div className='file-details'>
                    <div className='file-details-title'>
                        <div className='file-details-text' >
                            {fileDetail?.fileName}
                        </div>
                        <CloseOutlined style={{fontSize:16,cursor:"pointer"}} onClick={()=>setFileVisible(false)}/>
                    </div>

                    <div className='file-details-body'>
                        <div className='file-details-basic'>
                            <div className='basic-body-left'>
                                <div className='basic-body-item'>
                                    <div className='basic-body-item-title'>制品库</div>
                                    <span>{versionData?.repository.name}</span>
                                </div>
                                <div className='basic-body-item'>
                                    <div className='basic-body-item-title'>版本</div>
                                    <span>{versionData?.version}</span>
                                </div>
                                {
                                    fileDetail?.repository.type==="maven"&&
                                    <div className='basic-body-item'>
                                        <div className='basic-body-item-title'>groupId</div>
                                        <span>{libraryMavenData?.groupId}</span>
                                    </div>
                                }
                                <div className='basic-body-item'>
                                    <div className='basic-body-item-title'>提交人</div>
                                    <span>{"admin"}</span>
                                </div>
                            </div>
                            <div className='basic-body-right'>
                                <div className='basic-body-item'>
                                    <div className='basic-body-item-title'>类型</div>
                                    <span>{versionData?.repository.type}</span>
                                </div>
                                <div className='basic-body-item'>
                                    <div className='basic-body-item-title'>大小</div>
                                    <span>{fileDetail?.fileSize}</span>
                                </div>
                                {
                                    fileDetail?.repository.type==="maven"&&
                                    <div className='basic-body-item'>
                                        <div className='basic-body-item-title'>artifactId</div>
                                        <span>{libraryMavenData?.artifactId}</span>
                                    </div>
                                }
                                <div className='basic-body-item'>
                                    <div className='basic-body-item-title'>更新时间</div>
                                    <span>{versionData.updateTime}</span>
                                </div>
                            </div>
                        </div>
                        <div className='basic-body-item'>
                            <div className='basic-body-item-title'>路径</div>
                            <span className='basic-path-cursor basic-path-color' onClick={goContent}>{omitFiled(fileDetail?.relativePath)}</span>
                        </div>
                    </div>
                </div>:
            </Drawer>
        </div>
    )

}
export default observer(LibraryFile)
