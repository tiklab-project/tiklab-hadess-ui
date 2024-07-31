

/**
 * @name: LibraryTable
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品table
 * @update: 2022-12-30 10:30
 */
import {observer} from "mobx-react";
import React, {useState ,useEffect,Fragment} from "react";
import {Table} from "antd";
import LibraryDrawer from "../../common/library/LibraryDrawer";

import DeleteExecLibrary from "../../common/delete/DeleteExecLibrary";
import {PrivilegeProjectButton} from 'thoughtware-privilege-ui';
import EmptyText from "../../common/emptyText/EmptyText";
const LibraryTable = (props) => {

    const {libraryList,libraryType,onChange,repositoryId}=props

    const [columns,setColumns]=useState([])
    //制品文件详情弹窗
    const [visible,setVisible]=useState(false)
    const [versionId,setVersionId]=useState()  //打开制品的详情版本id


    useEffect(async () => {
        let list;
        switch (libraryType){
            case "maven":
                list=mavenColumns
                break;
            default :
                list= basColumns
                break
        }
        setColumns(list)
    }, [libraryType]);


    const mavenColumns = [
        {
            title: '名称',
            dataIndex: 'name',
            key:"name",
            ellipsis:true,
            width:'25%',
            render:(text,record)=><div className='text-color' onClick={()=>goLibraryDetails(record)}> {text}</div>
        },
        {
            title: '组名',
            dataIndex: 'groupId',
            ellipsis:true,
            key:"groupId",
            width:'25%',
        },
        {
            title:  "版本",
            dataIndex: 'showVersion',
            ellipsis:true,
            key:"showVersion",
            width:'20%',
        },
        {
            title: '大小',
            dataIndex: 'versionSize',
            key: 'versionSize',
            width:'8%',
            ellipsis:true,
            sorter: (a, b) => a.size - b.size,
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            ellipsis:true,
            width:'10%',
        },
        {
            title: '操作',
            key: 'activity',
            ellipsis:true,
            width:'5%',
            render: (text, record) => {
                return(
                    <PrivilegeProjectButton code={"library_delete"} domainId={repositoryId} >
                        <DeleteExecLibrary value={record} />
                    </PrivilegeProjectButton >

                )
            }
        },
    ];

    const basColumns=[
        {
            title: '名称',
            dataIndex: 'name',
            key:"name",
            ellipsis:true,
            width:'30%',
            render:(text,record)=><div className='text-color' onClick={()=>goLibraryDetails(record)}> {text}</div>
        },
        {
            title: '最新版本',
            dataIndex: 'showVersion',
            key:"showVersion",
            ellipsis:true,
            width:'20%',
        },

        {
            title: '更新时间',
            dataIndex: 'updateTime',
            ellipsis:true,
            width:'20%',
        },
        {
            title: '大小',
            dataIndex: 'versionSize',
            key: 'versionSize',
            width:'10%',
            ellipsis:true,
            sorter: (a, b) => a.size - b.size,
        },
        {
            title: '操作',
            key: 'activity',
            ellipsis:true,
            width: '5%',
            render: (text, record) => {
                return (
                    <DeleteExecLibrary value={record} />
                )
            }
        }
    ]
    /**
     * 跳转制品详情
     * @param  value 选择的制品数据
     */
    const goLibraryDetails =async (value) => {
        setVersionId(value.versionId)
        setVisible(true)
    }

    return(
        <Fragment>
            <Table
                columns={columns}
                dataSource={libraryList}
                pagination={false}
                onChange={onChange}
                locale={{emptyText: <EmptyText title={"暂无数据"}/>}}
            />
            <LibraryDrawer visible={visible} versionId={versionId}  setVisible={()=>setVisible(false)} />
        </Fragment>
    )
}

export default observer(LibraryTable)
