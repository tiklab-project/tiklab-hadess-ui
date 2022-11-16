/**
 * @name: ProductDetails
 * @author: limingliang
 * @date: 2021-08-09 16:48
 * @description：产品详情
 * @update: 2021-08-09 16:48
 */
import React,{useState} from "react";
import {Drawer, Modal, Space, Table} from 'antd'
const { confirm } = Modal;
import {ExclamationCircleOutlined} from "@ant-design/icons";
import productService from "../../../service/product.service";
import UploadProduct from "../uploadProduct";
const ProductDetails = props => {
    const {visible, onClose,productData,versionList,findProductVersion} = props;
    const [productVersion,setProductVersion]=useState(null);
    const [uploadVisible,setUploadVisible]=useState(false)
    const columns = [
        {
            title: '版本号',
            dataIndex:'version',
            width:'15%'
        },
        {
            title: '系统类型',
            dataIndex:'systemType',
            width:'20%'
        },
        {
            title: '下载地址',
            dataIndex: 'productUrl',
            width:'35%'
        },
        {
            title: '大小',
            dataIndex: 'size',
            width:'10%',
            render:text => text? text+'mb':''
        },
        {
            title: '操作',
            key: 'details',
            width:'15%',
            render: (text, record) => (
                <Space size="useState" className='flex  gap-x-2 text-blue-500'>
                    {
                        !record.productVersionId&&
                        <div  className='cursor-pointer' onClick={()=>openUploadProduct(record)} >
                            上传
                        </div>
                    }
                    <div  className='cursor-pointer' onClick={()=>openDeletePop(record)} >
                        删除
                    </div>
                </Space>
            ),
        },
    ];

    //打开上传弹窗
    const openUploadProduct = (value) => {
        setProductVersion(value)
        setUploadVisible(true)
    }

    //取消上传弹窗
    const closeUploadProduct = async () => {
        setUploadVisible(false)
        setProductVersion(null)
        await findProductVersion()
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
            style:{left:240,top:200},
            onOk() {
                deleteDb(record)
            },
            onCancel() {
            },
        })
    }
    const deleteDb = async (record) => {
        const param = new FormData()
        param.append('id', record.id)
        let res
        if (record.productVersionId){
            res = await productService.deleteProductUrl(param)
        }else {
            res= await productService.deleteProductVersion(param)
        }
        if (res.code===0){
            await findProductVersion(record)
        }
    }

    return(
        <div>
            <Drawer
                title="产品详情"
                placement='right'
                onClose={onClose}
                visible={visible}
                width  ={800}
                className='locker-top'
            >
                {
                    productData&&
                    <div className='space-y-3'>
                        <p>产品名称: {productData.name}</p>
                        <p>产品编码: {productData.code}</p>
                        <p>产品价格: ¥{productData.price}/人/月</p>
                        <p>产品地址: {productData.productUrl}</p>
                        {
                            productData?.type!=='saas'&&
                            <div>
                                <Table
                                    dataSource={versionList}
                                    columns={columns}
                                    rowKey={record => record.id}
                                    pagination={false}
                                />
                            </div>
                        }
                    </div>
                }
            </Drawer>
            <UploadProduct visible={uploadVisible} onCancel={closeUploadProduct} editData={productVersion}/>
        </div>
    )};

export default ProductDetails
