/**
 * @name: ProductDetails
 * @author: limingliang
 * @date: 2021-08-09 16:48
 * @description：产品详情
 * @update: 2021-08-09 16:48
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Button, Table, Space, Modal, Radio, Tooltip} from "antd";
const { confirm } = Modal;
import productService from "../../service/product.service";
import {getUser} from "../../utils";
import {withRouter} from "react-router";
import {
    DeleteOutlined,
    ExclamationCircleOutlined, FileTextOutlined,
    VerticalAlignBottomOutlined
} from "@ant-design/icons";
import UploadProduct from "./uploadProduct";
import './product.scss'
import VersionDetails from "./versionDetails";
const ProductDetails = props => {
    const {match:{params}} = props;
    const [productData,setProductData]=useState('')
    const [type,setType]=useState('saas')
    const [productVersionList,setProductVersionList]=useState()
    const [systemType,setSystemType]=useState('windows')

    const [visible, setVisible] = useState(false);  //上传弹窗状态
    const [productVersion,setProductVersion]=useState(null);

    const [versionVisible,setVersionVisible]=useState(false)   //版本详情的抽屉状态
    const [versionData,setVersionData]=useState()  //版本详情
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
            render:text => text? text+'mb':'',
            width:'10%',
        },
        {
            title: '操作',
            key: 'details',
            width:'15%',
            render: (text, record) => (
                <Space size="useState" className='flex  gap-x-4 '>
                    {
                        !record.productVersionId&&
                        <div className='flex gap-x-4'>
                            <Tooltip title='上传项目'>
                                <VerticalAlignBottomOutlined  className='cursor-pointer' onClick={()=>uploadProduct(record)}/>
                            </Tooltip>
                            <Tooltip title='详情'>
                                <FileTextOutlined  className='cursor-pointer' onClick={()=>openVersionDetails(record)}/>
                            </Tooltip>
                        </div>
                    }
                    <Tooltip title="删除">
                        <DeleteOutlined className='cursor-pointer' onClick={()=>openDeletePop(record)}/>
                    </Tooltip>
                </Space>
            ),
        },
    ];
    useEffect(async ()=>{
        setType(params.type)
      await  findProductById(params)
    },[])

    //通过id查询产品
    const findProductById =async (params) => {
        const param = new FormData()
        param.append('id',params.productId)
        const res = await productService.findProduct(param)
        if (res.code===0){
            setProductData(res.data)
            await findProductVersion(params.productId)
        }
    }


    //查询产品版本
    const findProductVersion=async (productId)=>{
        const param={
            productId:productId,
        }
        const res=await productService.findProductVersionList(param)
        if (res.code===0){
            setProductVersionList(res.data)
        }
    }
    //打开产品版本详情的抽屉
    const openVersionDetails =async (value) => {
        setVersionData(value)
      setVersionVisible(true)
    }
    //打开产品版本详情的抽屉
    const closeVersionDetails =async () => {
        setVersionVisible(false)
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
            pathname:"/index/product/compileVersion",
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
            //style: {top: 300},
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
            await findProductVersion(productData.id)
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
        await findProductVersion(productData.id)
    }
    return (
        <div className='product'>
            <Breadcrumb separator="/" className=' product-title '>
                <Breadcrumb.Item  href='#/index/productList'>产品管理</Breadcrumb.Item>
                <Breadcrumb.Item href="">{productData.name}</Breadcrumb.Item>
            </Breadcrumb>

            <div  className='product-data'>
                <div >产品名称: {productData.name}</div>
                <div>产品编码: {productData.code}</div>
                <div>产品价格: ¥{productData.price} /人/月</div>
                {
                    type==='saas'&&
                    <div>产品地址: {productData.productUrl}</div>
                }

            </div>
            <div >
                {
                    type!=='saas'&&
                    <>
                        <div className='flex mt-6 justify-between'>
                            <div className='text-base  font-medium'>产品版本</div>
                            <Button type="primary" onClick={() => addVersion()}>添加版本</Button>
                        </div>

                        <div className=' mt-2 '>

                            <Table
                                dataSource={productVersionList}
                                columns={columns}
                                rowKey={record => record.id}
                                pagination={false}
                            />
                        </div>
                    </>

                }
            </div>
            <VersionDetails visible={versionVisible} onCancel={closeVersionDetails} versionData={versionData}/>
            <UploadProduct visible={visible} onCancel={onCancel} editData={productVersion}/>
        </div>

    )
};

export default withRouter(ProductDetails)
