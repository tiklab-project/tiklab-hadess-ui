

/**
 * @name: LibraryTable
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品table
 * @update: 2022-12-30 10:30
 */
import {observer} from "mobx-react";
import React, {useState ,useEffect} from "react";
import {Table} from "antd";
import libraryStore from "../store/LibraryStore";
const LibraryTable = (props) => {

    const {libraryList,libraryType}=props
    const {findLibraryNewVersion,setLibraryVersion}=libraryStore

    const [columns,setColumns]=useState([])

    useEffect(async () => {
        let list;
        switch (libraryType){
            case "maven":
                list=mavenColumns
                break
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
            width:'10%',
            render:(text,record)=><div style={{color:'#1890ff',cursor:'pointer'}} onClick={()=>goLibraryDetails(record)}> {text}</div>
        },
        {
            title: '类型',
            dataIndex: 'libraryType',
            key:"libraryType",
            width:'10%',

        },
        {
            title: '所属制品库',
            dataIndex: ["repository",'name'],
            key:"repositoryName",
            width:'10%',
        },
        {
            title: '版本',
            dataIndex: 'newVersion',
            key:"newVersion",
            width:'10%',
        },
        {
            title: 'Group',
            dataIndex: 'groupId',
            key:"groupId",
            width:'10%',
        },
        {
            title: 'Artifact',
            dataIndex: 'artifactId',
            key:"artifactId",
            width:'10%',
        },
    ];

    const npmColumns=[
        {
            title: '名称',
            dataIndex: 'name',
            key:"name",
            width:'35%',
            render:(text,record)=><div className='library-name' onClick={()=>goLibraryDetails(record)}> {text}</div>
        },
        {
            title: '类型',
            dataIndex: 'libraryType',
            key:"libraryType",
            width:'20%',
        },
        {
            title: '所属制品库',
            dataIndex: ["repository",'name'],
            key:"repositoryName",
            width:'30%',

        },
        {
            title: '版本',
            dataIndex: 'newVersion',
            key:"newVersion",
            width:'25%',
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
            props.history.push(`/index/library/${libraryType}/survey/${res.data.id}`)
        }
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
