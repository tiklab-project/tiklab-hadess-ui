/**
 * @name: Details
 * @author: limingliang
 * @date: 2021-08-09 16:48
 * @description：产品详情
 * @update: 2021-08-09 16:48
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Input, Button, Table, Form,Upload,Modal } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import productService from "../../../service/product.service";
import {getUser} from "../../../utils";
import {withRouter} from "react-router";
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 },
};

const Details = props => {
    const products=props.history.location.params
    const [productData,setProductData]=useState('')
    const [tableData,setTableData]=useState()
    const columns = [
        {
            title: '版本号',
            dataIndex:'version',
        },
        {
            title: '地址',
            dataIndex: 'captureUrl',
        },
        {
            title: '大小',
            dataIndex: 'size',
        },
        {
            title: '描述',
            dataIndex: 'versionData',
        },

    ];

    useEffect(async ()=>{
        if(products){
            sessionStorage.setItem("products", JSON.stringify(products));
        }
        await findProductVersion()
    },[])
    //查询产品版本
    const findProductVersion=async ()=>{
        const productData=JSON.parse(sessionStorage.getItem("products"));
        setProductData(productData)
        const param={
            productId:productData.id
        }
       const res=await productService.findProductVersionList(param)
        if (res.code===0){
            setTableData(res.data)
        }
    }

    //添加产品版本
    const addVersion=async ()=>{
        const person={
            id:productData.id,
            name:productData.name
        }
        props.history.push({
            pathname:"/setting/product/addVersion",
            params:person
        });
    }
    return (
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-screen-xl m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item  href='#/setting/product'>产品管理</Breadcrumb.Item>
                    <Breadcrumb.Item href="">{productData.name}</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <Form
                        {...layout}
                        name="nest-messages"
                        className='mt-6'>
                        <Form.Item label="产品名称">
                            {productData.name}
                        </Form.Item>
                        <Form.Item label="产品编码">
                            {productData.code}
                        </Form.Item>
                        <Form.Item label="产品价格">
                            {productData.price}
                        </Form.Item>
                        <Form.Item label="产品地址">
                            {productData.productUrl}
                        </Form.Item>
                    </Form>
                </div>
                <div >
                    <Row gutter={[16, 16]} className='mt-6'>
                        <Col span={6}>
                            <h4 className='text-lg p-4'>产品版本</h4>
                        </Col>
                        <Col span={10} offset={8} className='flex justify-end'>
                            <Button type="primary" onClick={() => addVersion()}>添加版本</Button>
                        </Col>
                    </Row>
                    <Table
                        dataSource={tableData}
                        columns={columns}
                        rowKey={record => record.id}
                        pagination={false}
                    />
                </div>

            </div>

        </section>
    )
};

export default withRouter(Details)
