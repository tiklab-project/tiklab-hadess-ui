/**
 * @name: Details
 * @author: limingliang
 * @date: 2021-08-09 16:48
 * @description：订阅详情
 * @update: 2021-08-09 16:48
 */

import React from "react";
import {Drawer, Table} from 'antd'
const SubscribeDetails = (props) => {
    const {visible, onClose,subscribeData,subRecordList} = props;

    const columns = [
        {
            title: '订阅类型',
            dataIndex: 'buyType',
            render: (text)  => <div>{text=='try'&&'试用'||text=='sub'&&'订阅'||text=='renMath'&&'按时间续订'||text=='renNum'&&'按人数续订'}</div>
        },
        {
            title: '订阅人数',
            dataIndex: 'subNum',
            render: (text)  => <div>{text}人</div>
        },
        {
            title: '订阅时长',
            dataIndex: 'subMath',
            render: (text, record)  => {
                return record.buyType==="try"?"N/A":(record.duration) / 12 === 1 ? '1年' : `${text}月`
            }
        },
        {

            title: '订阅有效期',
            dataIndex: 'date',
            render:(text, record) =>(
                record.subType===2?
                    <div>{record.fromDate + '~' + record.endDate}</div>:
                    <div>max</div>
            )
        }
    ];
    return(
        <Drawer
            title="订阅详情"
            placement='right'
            closable={false}
            onClose={onClose}
            visible={visible}
            width  ={'700'}
            className='locker-top'
        >
            {subscribeData&&
                <div className='space-y-2'>
                    <div >订阅产品: {subscribeData?.product.name}</div>
                    <div>{subscribeData?.bGroup===1?`企业名称: ${subscribeData?.tenant?.name}`:`会员名称: ${subscribeData?.member?.nickName}`}</div>
                    <div>订阅类型: {subscribeData?.bGroup===1?'公有云':'企业订阅'}</div>
                    <div className='pt-6'>
                        <Table
                            dataSource={subRecordList}
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={false}
                        />
                    </div>
                </div>
            }
        </Drawer>
    )

}
export default SubscribeDetails
