/**
 * @name: LibraryHistoryDetails
 * @author: limingliang
 * @date: 2023-01-10 10:30
 * @description：制品详情-历史版本详情
 * @update: 2023-01-10 10:30
 */
import React from "react";
import { Descriptions, Drawer,  Space, Table} from 'antd'
import './LibraryHistoryDetail.scss'
const LibraryHistoryDetail = (props) => {
    const {visible, onClose,fileList,versionDetails} = props;
    const columns = [
        {
            title: '名称',
            dataIndex: 'fileName',
            width:'30%',
        },
        {
            title: '大小',
            dataIndex: 'fileSize',
            width:'10%',

        },
        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => (
                <Space size="useState" className='space-x-4 text-blue-500 cursor-pointer'>
                    <div>下载</div>
                </Space>
            )
        },
    ];

    return(
        <Drawer
            title="版本详情"
            placement='right'
            closable={false}
            onClose={onClose}
            visible={visible}
            width  ={'800'}
            className='locker-top'
        >
            <div className='historyDetails'>
                <div className='details-title'>基本信息</div>
                <Descriptions  className=' text-sm' >
                    <Descriptions.Item label="名称">{versionDetails?.library.name}</Descriptions.Item>
                    <Descriptions.Item label="仓库">{versionDetails?.repository.name}</Descriptions.Item>
                    <Descriptions.Item label="版本">{versionDetails?.version}</Descriptions.Item>
                    <Descriptions.Item  label="GroupID">{"asdasd"}</Descriptions.Item>
                    <Descriptions.Item label="ArtifactID">{'132123'}</Descriptions.Item>
                    <Descriptions.Item label="大小">{versionDetails?.size}</Descriptions.Item>
                    <Descriptions.Item label="hash">{versionDetails?.hash}</Descriptions.Item>
                </Descriptions>

                <div className='details-title mt-5'>文件列表</div>
                <Table
                    dataSource={fileList}
                    columns={columns}
                    pagination={false}
                />
            </div>
        </Drawer>
    )
}
export default LibraryHistoryDetail
