/**
 * @name: AddScanLibraryPop
 * @author: limingliang
 * @date: 20230-09-18 16:51
 * @description：添加扫描制品弹窗
 * @update: 2023-09-18 16:51
 */

import React,{useState,useEffect,Fragment} from 'react';
import Modals from "../../../common/modal/Modal";
import Btn from "../../../common/btn/Btn";
import {Input, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
const AddScanLibraryPop = (props) => {
    const {match:{params}} = props;
    const {addVisible,setAddVisible,notScanLibrary,findNotScanLibrary,createScanLibrary}=props


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

    //添加扫描制品
    const onOk = () => {
        libraryIds.map(item=>{
            createScanLibrary({repositoryId:params.id,scanPlayId: params.playId,library: {id:item}})
        })
        cancel()
    }
    const  cancel= () => {
        setAddVisible(false)
    }


    //添加名称
    const onInputName = (e) => {
        const name=e.target.value
        setLibraryName(name)
    }

    const onSearch = () => {
        findNotScanLibrary(libraryName)
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
            open={addVisible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={700}
            title={"添加扫描制品"}
        >
            <Fragment>
                <Input placeholder={'名称'} value={libraryName}  onChange={onInputName}
                       onPressEnter={onSearch}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>}/>
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    dataSource={notScanLibrary}
                    rowKey = {record => record.id}
                    columns={columns}
                    pagination={false}
                />
            </Fragment>
        </Modals>
    )
}
export default AddScanLibraryPop
