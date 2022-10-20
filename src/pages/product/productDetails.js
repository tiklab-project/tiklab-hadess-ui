/**
 * @name: ProductDetails
 * @author: limingliang
 * @date: 2021-08-09 16:48
 * @description：产品详情
 * @update: 2021-08-09 16:48
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Button, Table, Space, Modal, Radio} from "antd";
const { confirm } = Modal;
import productService from "../../service/product.service";
import {getUser} from "../../utils";
import {withRouter} from "react-router";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import UploadProduct from "./uploadProduct";
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 },
};

const ProductDetails = props => {
    const products=props.history.location.params
    const [productData,setProductData]=useState('')
    const [productVersionList,setProductVersionList]=useState()
    const [systemType,setSystemType]=useState('windows')

    const [visible, setVisible] = useState(false);  //上传弹窗状态
    const [productVersion,setProductVersion]=useState(null);
    const columns = [
        {
            title: '版本号',
            dataIndex:'version',
        },
        {
            title: '系统类型',
            dataIndex:'systemType',
        },
        {
            title: '下载地址',
            dataIndex: 'productUrl',
        },
        {
            title: '大小',
            dataIndex: 'size',
            render:text => text? text+'mb':''
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
                    {
                        !record.productVersionId&&
                        <div  className='border border-gray-200 px-2 cursor-pointer' onClick={()=>uploadProduct(record)} >
                            上传项目
                        </div>
                    }

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
            productId:productData.id,

        }
        const res=await productService.findProductVersionList(param)
        if (res.code===0){
            setProductVersionList(res.data)
        }
    }



    //添加产品版本
    const addVersion=async ()=>{
        const person={
            id:productData.id,
            name:productData.name,
            code:productData.code,
            type:productData.type
        }
        props.history.push({
            pathname:"/setting/product/compileVersion",
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
        debugger
        if (res.code===0){
            await findProductVersion()
        }
    }


    //打开上传弹窗
    const uploadProduct = (value) => {
        setProductVersion(value)
      setVisible(true)
    }
    //取消上传弹窗
    const onCancel = async () => {
        setVisible(false)
        setProductVersion(null)
        await findProductVersion()
    }
    return (
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item  href='#/setting/productList'>产品管理</Breadcrumb.Item>
                    <Breadcrumb.Item href="">{productData.name}</Breadcrumb.Item>
                </Breadcrumb>

                    <div  className='grid gap-y-6 pt-6 pl-4 pb-8'>
                        <div >产品名称:{productData.name}</div>
                        <div>产品编码: {productData.code}</div>
                        <div>产品价格:¥{productData.price}/人/月</div>
                        <div>产品地址: {productData.productUrl}</div>
                    </div>
                <div >
                    {
                        productData?.type!=='saas'&&
                            <div className='border border-gray-200  '>
                                <div className='flex justify-end py-4 pl-4 px-2' >
                                   {/* <div className='flex space-x-6 '>
                                        <Radio.Group defaultValue={systemType} buttonStyle="solid" onChange={cutType}>
                                            <Radio.Button value="windows">windows</Radio.Button>
                                            <Radio.Button value="macOs">macOs</Radio.Button>
                                            <Radio.Button value="linux">linux</Radio.Button>
                                        </Radio.Group>
                                    </div>*/}
                                    <Button type="primary" onClick={() => addVersion()}>添加版本</Button>
                                </div>
                                <Table
                                    dataSource={productVersionList}
                                    columns={columns}
                                    rowKey={record => record.id}
                                    pagination={false}
                                />
                            </div>
                    }
                </div>

            </div>
            <UploadProduct visible={visible} onCancel={onCancel} editData={productVersion}/>
        </section>
    )
};

export default withRouter(ProductDetails)
