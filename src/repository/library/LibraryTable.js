

/**
 * @name: LibraryTable
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品table
 * @update: 2022-12-30 10:30
 */
import {observer} from "mobx-react";
import React, {useState ,useEffect} from "react";
import {Popconfirm, Table, Tooltip} from "antd";
import libraryStore from "../../library/store/LibraryStore";
import {DeleteOutlined} from "@ant-design/icons";
const LibraryTable = (props) => {

    const {libraryList,libraryType,repositoryId}=props
    const {findLibraryNewVersion,deleteLibrary,setLibraryVersion}=libraryStore

    const [columns,setColumns]=useState([])

    useEffect(async () => {
        let list;
        switch (libraryType){
            case "maven":
                list=mavenColumns
                break;
            case 'npm':
                list= npmColumns
                break
        }
        setColumns(list)
    }, [libraryType]);


    const mavenColumns = [
        {
            title: '名称',
            dataIndex: 'name',
            key:"name",
            width:'20%',
            render:(text,record)=><div style={{color:'#1890ff',cursor:'pointer'}} onClick={()=>goLibraryDetails(record)}> {text}</div>
        },
        {
            title: '类型',
            dataIndex: 'libraryType',
            key:"libraryType",
            width:'10%',

        },
        {
            title: '最新版本',
            dataIndex: 'newVersion',
            key:"newVersion",
            width:'20%',
        },
        {
            title: 'Group',
            dataIndex: 'groupId',
            key:"groupId",
            width:'15%',
        },
        {
            title: 'Artifact',
            dataIndex: 'artifactId',
            key:"artifactId",
            width:'15%',
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            width:'10%',
        },
        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => deleteExec(record)
        },
    ];

    const npmColumns=[
        {
            title: '名称',
            dataIndex: 'name',
            key:"name",
            width:'30%',
            render:(text,record)=><div className='library-name' onClick={()=>goLibraryDetails(record)}> {text}</div>
        },
        {
            title: '类型',
            dataIndex: 'libraryType',
            key:"libraryType",
            width:'20%',

        },
        {
            title: '版本',
            dataIndex: 'newVersion',
            key:"newVersion",
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
            width:'10%',
            render: (text, record) => deleteExec(record)

        }
    ]
    /**
     * 跳转制品详情
     * @param  value 选择的制品数据
     */
    const goLibraryDetails =async (value) => {
        const res=await findLibraryNewVersion(value.id)
        if (res.code===0){
            setLibraryVersion(res.data)
            props.history.push(`/index/repository/${repositoryId}/libraryList/survey/${res.data.id}`)
        }
    }

    //
    const columnList = (list,index) => {
        const columns = list.filter(item=>item.key!=='repositoryName')
        columns.splice(index, 0,   {
            title: '更新时间',
            dataIndex: 'updateTime',
            width:'10%',
        });
        return columns
    }




   //删除操作
    const deleteExec= (record) => {
        return(
            <Tooltip title='删除'>
                <Popconfirm
                    title="你确定删除吗"
                    onConfirm={()=>deleteLibrary(record.id)}
                    okText="确定"
                    cancelText="取消"
                    placement="topRight"
                >
                 <DeleteOutlined/>
                </Popconfirm>
            </Tooltip>
        )
    }

    return(
        <Table
            columns={columns}
            dataSource={libraryList}
            rowKey={record=>record.id}
            pagination={false}
        />
    )
}

export default observer(LibraryTable)
