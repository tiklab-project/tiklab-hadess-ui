/**
 * @name: RelyOnDrawer
 * @author: limingliang
 * @date: 2023-11-1 10:13
 * @description：扫描依赖的抽屉
 * @update: 2023-11-1 10:13
 */
import React,{useState,useEffect} from 'react';
import {Drawer, Table} from 'antd'
import {CloseOutlined} from "@ant-design/icons";
import scanRelyStore from "../store/ScanRelyStore";
import {observer} from "mobx-react";
const RelyOnDrawer = (props) => {
    const {visible,setVisible,scanRecordId,scanLibrary}=props
    const {findScanRelyList}=scanRelyStore

    const [relyOnList,setRelyOnList]=useState([])


    useEffect(async () => {
        getScanRelyList()
    }, [scanLibrary]);

    const columns = [
        {
            title: '制品名称',
            dataIndex: 'relyName',
            key:"relyName",
            width:'20%',
        },
        {
            title: '版本',
            dataIndex: 'relyVersion',
            key:"relyVersion",
            width:'20%',

        },
        {
            title: '依赖方式',
            dataIndex: 'relyType',
            key:"relyType",
            width:'10%',
            render:(text,record)=><div>{text==='direct'?"直接依赖":"间接依赖"}</div>
        },
    ];

    //查询依赖列表
   const getScanRelyList = () => {
       findScanRelyList({scanRecordId:scanLibrary.scanRecordId,scanLibraryId:scanLibrary.id}).then(res=>{
           if (res.code===0){
               setRelyOnList(res.data)

           }
       })
   }

    //取消弹窗
    const cancelDrawer = () => {
        setVisible(false)

    }

    return(
        <Drawer
            title={`依赖列表 / ${scanLibrary?.library?.name}`}
            placement='right'
            closable={false}
            width={"60%"}
            className='library-drawer'
            onClose={cancelDrawer}
            visible={visible}
            extra={
                <CloseOutlined style={{cursor:'pointer'}} onClick={cancelDrawer} />
            }
        >
            <div className='margin-top'>
                <Table
                    columns={columns}
                    dataSource={relyOnList}
                    rowKey={record=>record.id}
                    pagination={false}
                />
            </div>
        </Drawer>
    )
}
export default observer(RelyOnDrawer)
