/**
 * @name: LibraryOption
 * @author: limingliang
 * @date: 2023-7-19 10:30
 * @description：推送中央仓库的制品选择
 * @update: 2023-07-19 10:30
 */
import React, {useState} from "react";
import Modals from "../../../../common/modal/Modal";
import Btn from "../../../../common/btn/Btn";
import {Input, Table} from "antd";
import { SearchOutlined} from "@ant-design/icons";
const LibraryOption = (props) => {
    const {match:{params}} = props;
    const {addVisible,setAddVisible,libraryList,createPushLibrary,findNotPushLibraryList,pushGroupId}=props
    const [libraryName,setLibraryName]=useState();
    const [libraryIds,setLibraryIds]=useState([])

    const columns=[
        {
            title: '制品名称',
            dataIndex: 'name',
            width:'70%',
        },

        {
            title: '创建时间',
            dataIndex: 'createTime',
            width:'30%',
        }
    ]


    const  cancel= () => {
        setAddVisible(false)
    }

    //添加制品到推送表中
    const onOk = () => {
       libraryIds?.map(item=>{
           createPushLibrary({repositoryId:params.id, library: {id:item}, pushGroupId: pushGroupId})
        })
        cancel()
    }

    const onInputName = (value) => {
        const name=value.target.value
        setLibraryName(name)
    }
    //搜索制品
    const onSearch =async () => {
        findNotPushLibraryList({repositoryId:params.id,name:libraryName})
    }

    //选择制品
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setLibraryIds(selectedRowKeys)
        }
    };

    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )
    return(
        <Modals
            visible={addVisible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={600}
            title={"添加推送制品"}
        >
            <div>
                <Input placeholder={'名称'} value={libraryName}  onChange={onInputName}
                       onPressEnter={onSearch}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>}/>

                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    dataSource={libraryList}
                    rowKey = {record => record.id}
                    columns={columns}
                    pagination={false}
                />
            </div>

        </Modals>
    )

}
export default LibraryOption
