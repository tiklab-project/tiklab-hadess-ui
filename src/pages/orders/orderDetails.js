/**
 * @name: OrderDetails
 * @author: limingliang
 * @date: 2021-08-09 16:48
 * @description：订单详情
 * @update: 2021-08-09 16:48
 */
import React from "react";
import {Descriptions, Drawer, Space, Table} from 'antd'
const OrderDetails = (props) => {
    const {visible, onClose,orderData} = props;
    const   columns = [
        {
            title: '产品名称',
            dataIndex: ['product','name'],
            key: 'name',
        },
        {
            title: '产品编码',
            dataIndex: ['product','code'],
            key: 'type',
        },
        {
            title: '单价',
            dataIndex: 'orderProductPrice',
            key: 'orderProductPrice',
            render: (text,record) => (
                <Space size="middle">
                    <div>￥{record.product.price} /人/月</div>
                </Space>
            )
        },
        {
            title: '订阅时长',
            dataIndex: 'subMath',
            key: 'subMah',
            render: (text) => (
                <Space size="middle">
                    <div>{text}月</div>
                </Space>
            )
        },
        {
            title: '订阅账号数量',
            dataIndex: 'subNum',
            key: 'subNum',
            render: (text) => (
                <Space size="middle">
                    <div>{text}人</div>
                </Space>
            )
        }
    ];
    return(
        <Drawer
            title="订单详情"
            placement='right'
            closable={false}
            onClose={onClose}
            visible={visible}
            width  ={'700'}
            className='locker-top'
        >
            {orderData&&
                <div className='space-y-2'>
                    <Descriptions  className='order-data'>
                        <Descriptions.Item label="订单编号">{orderData?.orderCode}</Descriptions.Item>
                        <Descriptions.Item label="订单类型">{orderData.bGroup===1?'saas':'企业'}</Descriptions.Item>
                        <Descriptions.Item  label="状态">
                            {
                                orderData.paymentStatus==1&&<p className='text-red-500'>待支付</p>||
                                orderData.paymentStatus==2&&<p className='text-green-500'>已完成</p>||
                                orderData.paymentStatus==3&&<p className='text-gray-400'>取消</p>
                            }
                        </Descriptions.Item>
                        <Descriptions.Item label="订单原价">￥{orderData.originalPrice}</Descriptions.Item>
                        <Descriptions.Item label="订单优惠价">￥{orderData.orderPrice}</Descriptions.Item>
                        <Descriptions.Item label="创建时间">
                            {orderData.createTime}
                        </Descriptions.Item>
                        {
                            orderData.bGroup===1&&
                            <Descriptions.Item label="企业">
                                {orderData.tenant.name}
                            </Descriptions.Item>
                        }
                        <Descriptions.Item label="优惠券">
                            {orderData.discountsName}
                        </Descriptions.Item>
                    </Descriptions>
                    <div  className='pt-4'>
                      {/*  <h4 className='text-sm font-medium'>订单产品:</h4>*/}
                        <Table
                            dataSource={orderData?.orderDetailsList}
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
export default OrderDetails
