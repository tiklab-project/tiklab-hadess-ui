

/**
 * @name: LibraryTable
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品table
 * @update: 2022-12-30 10:30
 */
import {observer} from "mobx-react";
import React, {useState ,Fragment} from "react";
import {Table} from "antd";
import LibraryDrawer from "../../common/library/LibraryDrawer";
import DeleteExecLibrary from "../../common/delete/DeleteExecLibrary";
import {PrivilegeButton} from 'thoughtware-privilege-ui';
import EmptyText from "../../common/emptyText/EmptyText";
const LibraryTable = (props) => {
    const {libraryList,libraryType,onChange}=props

    //制品文件详情弹窗
    const [visible,setVisible]=useState(false)
    const [versionId,setVersionId]=useState()  //打开制品的详情版本id



    const mavenColumns = [
        {
            title: '名称',
            dataIndex: 'name',
            key:"name",
            width:'23%',
            ellipsis:true,
            render:(text,record)=><div className={'text-color'}  onClick={()=>goLibraryDetails(record)}> {text}</div>
        },
        {
            title: '组名',
            dataIndex: 'groupId',
            key:"groupId",
            ellipsis:true,
            width:'23%',
        },
        {
            title: '最新版本',
            dataIndex: 'showVersion',
            key:"showVersion",
            ellipsis:true,
            width:'15%',
        },
        {
            title: '所属制品库',
            dataIndex: "repositoryName",
            key:"repositoryName",
            ellipsis:true,
            width:'16%',
        },
        {
            title: '大小',
            dataIndex: 'versionSize',
            key: 'versionSize',
            ellipsis:true,
            width:'8%',
            sorter: (a, b) => a.size - b.size,
        },
        {
            title: '操作',
            key: 'activity',
            width: '5%',
            ellipsis:true,
            render: (text, record) => {
                return (
                    <PrivilegeButton code={"hadess_library_delete"} key={'hadess_library_delete'} >
                        <DeleteExecLibrary value={record} />
                    </PrivilegeButton >
                )
            }
        }
    ];

    const npmColumns=[
        {
            title: '名称',
            dataIndex: 'name',
            key:"name",
            ellipsis:true,
            width:'30%',
            render:(text,record)=><div className={'text-color'} onClick={()=>goLibraryDetails(record)}> {text}</div>
        },
        {
            title: '版本',
            dataIndex: 'showVersion',
            key:"showVersion",
            ellipsis:true,
            width:'20%',
        },
        {
            title: '所属制品库',
            dataIndex: "repositoryName",
            key:"repositoryName",
            ellipsis:true,
            width:'25%',
        },
        {
            title: '大小',
            dataIndex: 'versionSize',
            key: 'versionSize',
            ellipsis:true,
            width:'10%',
            sorter: (a, b) => a.size - b.size,
        },
        {
            title: '操作',
            key: 'activity',
            width: '5%',
            ellipsis:true,
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
        setVisible(true)
        setVersionId(value.versionId)

    }

    return(
        <Fragment>
            <Table
                columns={libraryType==='maven'?mavenColumns:npmColumns}
                dataSource={libraryList}
                pagination={false}
                onChange={onChange}
                locale={{emptyText: <EmptyText title={"暂无数据"}/>}}
            />
            <LibraryDrawer {...props} visible={visible} versionId={versionId}  setVisible={()=>setVisible(false)} />
        </Fragment>
    )
}

export default observer(LibraryTable)
