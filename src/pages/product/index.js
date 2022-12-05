/**
 * @name: index
 * @author: mahai
 * @date: 2021-08-09 16:48
 * @description：产品列表
 * @update: 2021-08-09 16:48
 */
import {withRouter} from "react-router";
import React, {useState, useEffect,useCallback} from "react";
import {Breadcrumb, Row, Col, Input, Button, Table, Space, Modal, Tooltip} from "antd";
import productService from "../../service/product.service";
import { DndProvider  } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
    ExclamationCircleOutlined,
    UpCircleOutlined,
    DownCircleOutlined,
    SearchOutlined, EditOutlined, DeleteOutlined
} from "@ant-design/icons";
const { confirm } = Modal;
import update from 'immutability-helper';
import DraggableBodyRow from "../../common/sort/DraggableBodyRow"
import AddProduct from "../product/addProduct";
import Paging from "../../common/components/paging";
import "./product.scss"
const Product = (props) => {
    const [name, setName] = useState(null);
    const [editData, setEditData] = useState(null);
    const [productList, setProductList] = useState([]);  //产品数据list

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPage,setTotalPage]=useState(0);  //总页数

    const [visible, setVisible] = useState(false);  //添加弹窗状态


    const [compileType,setCompileType]=useState(null)

    useEffect(async () => {
        await getProductionData(name,currentPage)
    }, []);

    const columns = [
        {
            title: '产品名称',
            dataIndex: 'name',
            render: (text, record) => {
                return <a className='text-blue-400' onClick={() => openProductDetails(record)}>{record.name}</a>
            },
            width:'20%'
        },
        {
            title: '产品编码',
            dataIndex: 'code',
            width:'10%'
        },
        {
            title: '产品类型',
            dataIndex: 'type',
            width:'20%',
            render:text => text==='saas'&&'公有云版'||text==='ce'&&'线下社区版'||text==='ee'&&'线下企业版'
        },
        {
            title: '产品价格',
            dataIndex: 'price',
            render: (text,record) => record.type==='ce'?'免费':'¥'+text,
            width:'10%'
        },
        {
            title: '当前版本',
            dataIndex: 'productVersion',
            ellipsis: true,
            width:'10%'
        },
        {
            title: '操作',
            key: 'action',
            width:'15%',
            render: (text, record) => (
                <Space size="useState" className='flex  gap-x-4 '>
                    <Tooltip title="编辑">
                        <EditOutlined className='cursor-pointer' onClick={()=>editProduct(record)}/>
                    </Tooltip>
                    <Tooltip title="删除">
                        <DeleteOutlined className='cursor-pointer' onClick={()=>deletePop(record.id)}/>
                    </Tooltip>

                   {/* {
                        record.type==='saas'?
                            <a disabled >添加版本</a>:
                            <a  onClick={() => addVersion(record)}>添加版本</a>
                    }*/}

                </Space>
            ),
        },
    ];
    //分页条件查询产品
    const getProductionData = async(name,currentPage)  => {
        const param = {
            name:name,
            pageParam: {
                pageSize: pageSize,
                currentPage: currentPage,
            }
        }
        const res = await productService.findProductPageService(param)
        if (res.code === 0) {
            setTotalPage(res.data.totalPage)
            setProductList(res.data.dataList)
        }
    }

    const onInputName = (e) => {
        const value = e.target.value
        setName(value)
    }
    const onSearch = async () => {
        await getProductionData(name,currentPage)
    }

    //打开产品详情
    const openProductDetails =async (value) => {
        props.history.push(`/index/product/detail/${value.id}/${value.type}`)
    }


    //打开产品添加弹窗
    const addProduct = () => {
        setCompileType("add")
        setVisible(true)
    }
    //关闭产品添加弹窗
    const onCancel = async () => {
        setVisible(false)
        setEditData(null)
        await getProductionData(name,currentPage)
    }
    const editProduct = (item) => {
        setEditData(item)
        setCompileType('update')
        setVisible(true)
    }
    //删除弹窗
    const deletePop=async (data)=>{
        confirm({
            title: '注意：删除该产品会删除相应的所有版本',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',

            onOk() {
                deleteProduct(data)
            },
            onCancel() {
            },
        });
    }
    //删除产品
    const deleteProduct = async (id) => {
        const formData = new FormData()
        formData.append('id', id);
        const response = await productService.deleteProductService(formData)
        if (response.code === 0) {
            setCurrentPage(1)
            await getProductionData(name,currentPage)
        }
    }

    //分页
    const handleTableChange = async (value) => {
        setCurrentPage(value)
        await getProductionData(name,value)

    }
    const components = {
        body: {
            row: DraggableBodyRow,
        },
    };
    //修改产品排序
    const updateProductSort=async(dragIndex,hoverIndex) =>{
        const param={
            dragIndex:dragIndex,
            hoverIndex:hoverIndex,
            pageParam: {
                pageSize: pageSize,
                currentPage: currentPage,
            }
        }
        await productService.updateSortService(param)
    }
    const moveRow = useCallback(
        (dragIndex, hoverIndex) => {
            const dragRow = productList[dragIndex];
            setProductList(
                update(productList, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragRow],
                    ],
                }),
            );
            updateProductSort(dragIndex,hoverIndex)
        },
        [productList],
    );
    return(
        <div className=' product'>
           <div className='product-head-style'>
               <div  className='product-title'> 产品列表</div>
               <Button type="primary" onClick={addProduct}>添加产品</Button>
           </div>
            <Row gutter={[16, 16]} className='product-data'>
                <Col span={6}>
                    <Input placeholder={'产品名称'} value={name} onChange={onInputName} onPressEnter={onSearch} prefix={<SearchOutlined/>} className='text-gray-400' />
                </Col>
            </Row>
            <Row gutter={[16, 16]} >
                <Col span={24}>
                    <DndProvider backend={HTML5Backend}>
                        <Table
                            size='60'
                            dataSource={productList}
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={false}
                             components={components}
                             onRow={(record, index) => ({
                                 index,
                                 moveRow,
                             })}
                        />
                    </DndProvider>
                </Col>
            </Row>
            <Paging totalPage={totalPage} currentPage={currentPage} handleTableChange={handleTableChange}/>
            <AddProduct visible={visible} onCancel={onCancel} editData={editData} compileType={compileType}/>
        </div>
    )
}

export default withRouter(Product)