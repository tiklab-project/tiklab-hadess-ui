/**
 * @name: PlugDetails
 * @author: limingliang
 * @date: 2022-10-20 14:48
 * @description：插件详情
 * @update: 2022-10-20 14:48
 */

import React from "react";
import {Drawer, Modal, Space, Table} from 'antd'
import {ExclamationCircleOutlined} from "@ant-design/icons";
import plugService from "../../service/plug.service";
const { confirm } = Modal;
const PlugDetails = (props) => {
    const {visible, onClose,plugData,plugVersionList} = props;

    const columns = [
        {
            title: '名字',
            dataIndex: 'plugIn',
        },
        {
            title: '版本号',
            dataIndex:'version',
        },
        {
            title: '大小',
            dataIndex:  'plugSize',
        },
        {
            title: '描述',
            dataIndex: 'des',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle" className='text-blue-500'>
                    <a onClick={()=> deletePop(record)}>删除</a>
                </Space>
            ),
        },
    ];

    //删除弹窗
    const deletePop=async (data)=>{
        confirm({
            title: '确认删除该版本',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            style:{left:240,top:200},
            cancelText: '取消',
            onOk() {
                deletePlugVersion(data)
            },
            onCancel() {
            },
        });
    }
    //删除插件版本
    const deletePlugVersion =async (data)=>{
        const param=new FormData();
        param.append('id',data.id)
        const res=await plugService.deleteArtifactVersion(param)
        if (res.code===0){
             plugVersionList.filter(item=>item.id!==data.id)
        }
    }
    return(
        <Drawer
            title="插件详情"
            placement='right'
            closable={false}
            onClose={onClose}
            visible={visible}
            width  ={'800'}
            className='locker-top'
        >
            {
                plugData&&
                <div className='space-y-3'>
                    <p>插件名称: {plugData.name}</p>
                    <p>插件类型: {plugData.type}</p>
                    <p>插件描述: {plugData.des}</p>
                    <div className='pt-4'>
                        <Table
                            dataSource={plugVersionList}
                            columns={columns}
                            pagination={false}
                        />
                    </div>
                </div>
            }

        </Drawer>
    )
}
export default PlugDetails