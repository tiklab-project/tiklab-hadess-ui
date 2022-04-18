/**
 * @name: Details
 * @author: limingliang
 * @date: 2021-08-09 16:48
 * @description：订单详情
 * @update: 2021-08-09 16:48
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Input, Button, Table, Form,Upload,Descriptions } from "antd";
import orderService from "../../../service/order.service"
import {withRouter} from "react-router";
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 },
};

const Details = props => {
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
                    <Breadcrumb.Item href="">{orderData.id}</Breadcrumb.Item>
                </Breadcrumb>
                {JSON.parse(sessionStorage.getItem("orders"))
                &&<Form
                        {...layout}
                        name="nest-messages"
                        className='mt-6'>
                        <Form.Item label="订单编号">
                            {orderData.id}
                        </Form.Item>
                        <Form.Item label="订单价格">
                            {orderData.orderPrice}
                        </Form.Item>
                        <Form.Item label="支付人">
                            {JSON.parse(sessionStorage.getItem("orders")).member.name}
                        </Form.Item>
                        <div className='p-9'>
                            <h4 className='text-lg p-4'>订单产品:</h4>
                            <Form.Item >
                                <Table
                                    className='p-4'
                                    dataSource={tableData}
                                    columns={columns}
                                    rowKey={record => record.id}
                                    pagination={false}
                                />

                            </Form.Item>
                        </div>
                    </Form>
                }

            </div>

        </section>
    )
};

export default withRouter(Details)
