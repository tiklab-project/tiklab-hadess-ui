/**
 * @name: OrderDetails
 * @author: limingliang
 * @date: 2021-08-09 16:48
 * @description：订单详情
 * @update: 2021-08-09 16:48
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Descriptions, Table} from "antd";
import orderService from "../../service/order.service"
import {withRouter} from "react-router";

const OrderDetails = props => {
    const orders=props.history.location.params
    const [orderData,setOrderData]=useState('')
    const [tableData,setTableData]=useState()

    const columns = [
        {
            title: '产品名称',
            dataIndex:['product','name'],
        },
        {
            title: '价格',
            dataIndex: 'orderProductPrice',
        },
        {
            title: '购买数量',
            dataIndex: 'math',
            render: (text, record)  => {
                return record.subscribeType===3?" N/A":(record.duration) / 12 === 1 ? '1年' : `${text}月`
            }
        },
        {
            title: '租户',
            dataIndex:['tenant','name'],
        },

    ];

    useEffect(async ()=>{
        if (orders){
            sessionStorage.setItem("orders", JSON.stringify(orders));
        }
        await findOrderProduct()
    },[])

    const findOrderProduct=async ()=>{
        const orderData=JSON.parse(sessionStorage.getItem("orders"));
        setOrderData(orderData)
        const param={
            orderId:orderData.id
        }
        const res=await  orderService.findOrderProductList(param)
        if (res.code===0){
            setTableData(res.data)
        }
    }

    return (
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item  href='#/setting/order'>订单管理</Breadcrumb.Item>
                    <Breadcrumb.Item href="">订单详情</Breadcrumb.Item>
                </Breadcrumb>
                {JSON.parse(sessionStorage.getItem("orders"))
                    &&  <div >

                        <Descriptions title="订单信息" className='pt-4'>
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
                            <Descriptions.Item label="优惠券">
                                {orderData.rollName}
                            </Descriptions.Item>
                            {
                                orderData.bGroup===1&&
                                <Descriptions.Item label="企业">
                                    {orderData.tenant.name}
                                </Descriptions.Item>
                            }
                        </Descriptions>
                        <div className='pt-12'>
                            <h4 className='text-lg'>订单产品:</h4>
                            <Table
                                className='pt-4'
                                dataSource={tableData}
                                columns={columns}
                                rowKey={record => record.id}
                                pagination={false}
                            />
                        </div>
                    </div>
                }

            </div>

        </section>
    )
};

export default withRouter(OrderDetails)
