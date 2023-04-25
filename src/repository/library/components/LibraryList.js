/**
 * @name: LibraryList
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：制品列表
 * @update: 2022-12-27 10:30
 */
import React, {useState, useEffect} from "react";
import './Library.scss'
import {Input, Modal, Space, Table, Tag, Tooltip} from "antd";
import {DeleteOutlined, ExclamationCircleOutlined, SearchOutlined} from "@ant-design/icons";
import libraryService, {findLibraryListByCondition} from "../api/LibraryApi";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
const { confirm } = Modal;
const LibraryList = (props) => {
    const {repositoryStore,match:{params}} = props;
    const {findRepository,repositoryData}=repositoryStore
    const [name,setName]=useState(null)   //搜索的名称
    const [groupId,setGroupId]=useState(null)  //搜索的groupId
    const [artifactId,setArtifactId]=useState(null)    //搜索的ArtifactId
    const [version,setVersion]=useState(null)    //搜索的版本
    const [libraryList,setLibraryList]=useState([])  //制品list

    const MavenColumns = [
        {
            title: '名称',
            dataIndex: 'name',
            width:'20%',
            render:(text,record)=><div className='library-blue-color library-pointer' onClick={()=>goLibraryDetails(record)}> {text}</div>
        },
        {
            title: '类型',
            dataIndex: 'libraryType',
            width:'10%',

        },
        {
            title: 'groupId',
            dataIndex: 'groupId',
            width:'20%',

        },
        {
            title: '最新版本',
            dataIndex: 'newVersion',
            width:'10%',

        },

        {
            title: '更新时间',
            dataIndex: 'updateTime',
            width:'10%',
        },

        {
            title: '操作',
            key: 'activity',
            width:'5%',
            render: (text, record) => (
                <Tooltip title="删除">
                    <DeleteOutlined className='library-pointer' onClick={()=>deletePop(record.id)}/>
                </Tooltip>
            )
        },
    ];
    const otherColumns = [
        {
            title: '名称',
            dataIndex: 'name',
            width:'20%',
            render:(text,record)=><div className='library-blue-color library-pointer' onClick={()=>goLibraryDetails(record)}> {text}</div>
        },
        {
            title: '类型',
            dataIndex: 'libraryType',
            width:'10%',

        },
        {
            title: '最新版本',
            dataIndex: 'newVersion',
            width:'20%',

        },

        {
            title: '更新时间',
            dataIndex: 'updateTime',
            width:'20%',
        },

        {
            title: '操作',
            key: 'activity',
            width:'5%',
            render: (text, record) => (
                <Tooltip title="删除">
                    <DeleteOutlined className='library-pointer' onClick={()=>deletePop(record.id)}/>
                </Tooltip>
            )
        },
    ];

    useEffect(async () => {
        await findLibraryList()
        await findRepository(params.id)
    }, [params.id]);


    //通过条件查询制品
    const findLibraryList =async () => {
        const param={
            repositoryId:params.id,
            name:name,
            newVersion:version,
            groupId:groupId,
            artifactId:artifactId,
        }
        const res = await libraryService.findLibraryListByCondition(param)
        if (res.code===0){
            setLibraryList(res.data)
        }
    }

    //删除弹窗
    const deletePop =async (libraryId) => {
        confirm({
            title:'注意：是否确认删除该制品',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteLibrary(libraryId)
            },
            onCancel() {
            },
        });
    }
    const deleteLibrary =async (libraryId) => {
     const param = new FormData();
     param.append("id",libraryId)
     const res = await libraryService.deleteLibrary(param)
      if (res.code===0){
        await  findLibraryList()
      }
    }

    const onInputName =async (e) => {
        const value = e.target.value
        setName(value)
    }
    const onInputGroupId =async (e) => {
        setGroupId(e.target.value)
    }
    const onInputArtifactId =async (e) => {
      setArtifactId(e.target.value)
    }
    const onInputVersion =async (e) => {
      setVersion(e.target.value)
    }
    const onSearch = async () => {
        await  findLibraryList()
    }
    const goLibraryDetails =async (value) => {
        const param={
            libraryId: value.id
        }
        //通过制品库的id查询最新版本
        const res= await libraryService.findLibraryNewVersion(param)
        if (res.code===0){
            props.history.push(`/index/repository/${params.id}/libraryList/survey/${res.data.id}`)
        }

    }
    return(
        <div className='repositoryLibrary'>
            <div className='repository-library-width'>
                <div className=' repository-library-title'>制品列表</div>
                <div className='library-mt'>
                    <div className={'library-flex'}>

                        <Input placeholder={'名称'} value={name}  onChange={onInputName}
                               onPressEnter={onSearch}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>} className='library-border library-mr'/>
                        {repositoryData?.type==="maven"&&
                            <div >
                                <Input placeholder={'Group Id'} value={groupId}  onChange={onInputGroupId}
                                       onPressEnter={onSearch}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>} className='library-border library-mr'/>
                                <Input placeholder={'Artifact Id'} value={artifactId}  onChange={onInputArtifactId}
                                       onPressEnter={onSearch}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>} className='library-border library-mr'/>

                            </div>
                           }
                        <Input placeholder={'Version'} value={version}  onChange={onInputVersion}
                               onPressEnter={onSearch}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>} className='library-border library-mr'/>
                    </div>
                    <div className='library-mt'>
                        <Table
                            dataSource={libraryList}
                            columns={repositoryData?.type==="maven"?MavenColumns:otherColumns}
                            pagination={false}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
export default withRouter(inject('repositoryStore')(observer(LibraryList)))
