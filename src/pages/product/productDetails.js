/**
 * @name: ProductDetails
 * @author: limingliang
 * @date: 2021-08-09 16:48
 * @description：产品详情
 * @update: 2021-08-09 16:48
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Button, Table, Space,Modal} from "antd";
const { confirm } = Modal;
import productService from "../../service/product.service";
import {getUser} from "../../utils";
import {withRouter} from "react-router";
import {ExclamationCircleOutlined} from "@ant-design/icons";
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 },
};

const ProductDetails = props => {
    const products=props.history.location.params
    const [productData,setProductData]=useState('')
    const [tableData,setTableData]=useState()

    const columns = [
        {
            title: '版本号',
            dataIndex:'version',
        },
        {
            title: '下载地址',
            dataIndex: 'productUrl',
        },
        {
            title: '大小',
            dataIndex: 'size',
        },
        {
            title: '描述',
            dataIndex: 'versionData',
        },
        {
            title: '操作',
            key: 'details',
            render: (text, record) => (
                <Space size="useState" className='flex  gap-x-2'>

                    <div  className='border border-gray-200 px-2 cursor-pointer' onClick={()=>openDeletePop(record)} >
                        删除
                    </div>
                </Space>
            ),
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


    //打开删除数据源弹窗
    const openDeletePop =async (record) => {
        confirm({
            title: '是否确认删除',
            icon: <ExclamationCircleOutlined/>,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            style: {top: 300},
            onOk() {
                deleteDb(record.id)
            },
            onCancel() {
            },
        })
    }
    const deleteDb = async (id) => {
        const param = new FormData()
        param.append('id', id)
       const res=productService.deleteProductVersion(param)
        if (res.code===0){
            await findProductVersion()
        }
    }

    return (
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item  href='#/setting/product'>产品管理</Breadcrumb.Item>
                    <Breadcrumb.Item href="">{productData.name}</Breadcrumb.Item>
                </Breadcrumb>

                    <div  className='grid gap-y-6 pt-6 pl-4'>
                        <div >产品名称:{productData.name}</div>
                        <div>产品编码: {productData.code}</div>
                        <div>产品价格:{productData.price}</div>
                        <div >产品地址: {productData.productUrl}</div>
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

export default withRouter(ProductDetails)
