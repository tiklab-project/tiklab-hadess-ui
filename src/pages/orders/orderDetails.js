/**
 * @name: OrderDetails
 * @author: limingliang
 * @date: 2021-08-09 16:48
 * @description：订单详情
 * @update: 2021-08-09 16:48
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb,Table} from "antd";
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
            <div className='w-full p-6 max-w-screen-xl m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item  href='#/setting/order'>订单管理</Breadcrumb.Item>
                    <Breadcrumb.Item href="">订单详情</Breadcrumb.Item>
                </Breadcrumb>
                {JSON.parse(sessionStorage.getItem("orders"))
                    &&<div className='grid gap-y-6 pt-6 pl-4'>
                        <div >订单编号：{orderData.id}</div>
                        <div >订单价格:{orderData.orderPrice}</div>
                        <div >支付人：{JSON.parse(sessionStorage.getItem("orders")).member.name}</div>
                        <div className=''>
                            <h4 className='text-lg'>订单产品:</h4>
                            <div >
                                <Table
                                    className='p-4'
                                    dataSource={tableData}
                                    columns={columns}
                                    rowKey={record => record.id}
                                    pagination={false}
                                />

                            </div>
                        </div>
                    </div>
                }

            </div>

        </section>
    )
};

export default withRouter(OrderDetails)
