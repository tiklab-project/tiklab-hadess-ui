/**
 * @name: index
 * @author: mahai
 * @date: 2021-08-09 16:48
 * @description：产品列表
 * @update: 2021-08-09 16:48
 */
import React, {useState, useEffect,useCallback} from "react";
import {Breadcrumb, Row, Col, Input, Button, Table, Space, Modal} from "antd";
import { DndProvider  } from 'react-dnd';
import update from 'immutability-helper';
import DraggableBodyRow from "../../common/sort/DraggableBodyRow"
import { HTML5Backend } from 'react-dnd-html5-backend';
import productService from "../../service/product.service";
import AddProduct from "./addProduct";
import {ExclamationCircleOutlined,UpCircleOutlined,DownCircleOutlined} from "@ant-design/icons";
const { confirm } = Modal;
import {withRouter} from "react-router";
const Product = props => {
    const [name, setName] = useState('');
    const [editData, setEditData] = useState(null);
    const [tableData, setTableData] = useState(props.productList);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalRecord, setTotalRecord] = useState(props.total);
    const [visible, setVisible] = useState(false);

    const [compileType,setCompileType]=useState('')   //编辑类型
    const columns = [
        {
            title: '产品名称',
            dataIndex: 'name',
            render: (text, record) => {
                return <a className='text-blue-400' onClick={() => findDetails(record)}>{record.name}</a>
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
            width:'10%'
        },
        {
            title: '产品价格',
            dataIndex: 'price',
            render: (text) => '$'+text,
            width:'10%'
        },
        {
            title: '当前版本',
            dataIndex: 'productVersion',
            ellipsis: true,
            width:'10%'
        },
        {
            title: '产品地址',
            dataIndex: 'productUrl',
            width:'20%'

        },
        {
            title: '操作',
            key: 'action',
            width:'20%',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => editProduct(record)}>编辑</a>
                    <a onClick={() => deletePop(record.id)}>删除</a>
                    <a onClick={() => addVersion(record)}>添加版本</a>
                </Space>
            ),
        },
    ];

    useEffect(async () => {
        const params = {
            pageParam: {
                pageSize: pageSize,
                currentPage: page,
            }
        }
        await getProductionData(params)
    }, []);

    const findDetails=async (record)=>{
        props.history.push({
            pathname:"/setting/product/detail",
            params:record
        });
    }
    //添加产品版本
    const addVersion=async (record)=>{
        const person={
            id:record.id,
            name:record.name
        }
        props.history.push({
            pathname:"/setting/product/addVersion",
            params:person
        });
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

    const editProduct = (item) => {
        setEditData(item)
        setCompileType('update')
        setVisible(true)
    }
    //删除产品
    const deleteProduct = async (id) => {
        const formData = new FormData()
        formData.append('id', id);
        const response = await productService.deleteProductService(formData)
        if (response.code === 0) {
            const params = {
                pageParam: {
                    pageSize: 10,
                    currentPage: 1,
                }
            }
            await getProductionData(params)
        }
    }
    //分页条件查询产品
    const getProductionData = async params => {
        const data = await productService.findProductPageService(params)
        if (data.code === 0) {
            setTotalRecord(data.data.totalRecord)
            setTableData(data.data.dataList)
        }
    }
    //修改产品排序
    const updateProductSort=async(dragIndex,hoverIndex) =>{
       const param={
           dragIndex:dragIndex,
           hoverIndex:hoverIndex,
           pageParam: {
               pageSize: pageSize,
               currentPage: page,
           }
       }
        await productService.updateSortService(param)
    }
    const onInputName = (e) => {
        const value = e.target.value
        setName(value)
    }
    const onSearch = async () => {
        const params = {
            name,
            pageParam: {
                pageSize: 10,
                currentPage: 1,
            }
        }
        await getProductionData(params)
    }
    const addProduct = () => {
        setCompileType("add")
        setVisible(true)
    }

    const handleTableChange = async (pagination, filters, sorter) => {
        setPage(pagination.current)
        const newParams = {
            name,
            pageParam: {
                pageSize: pageSize,
                currentPage: pagination.current
            }
        }
        await getProductionData(newParams)
    }

    const onCancel = async () => {
        setVisible(false)
        setEditData(null)
        const params = {
            name,
            pageParam: {
                pageSize: 10,
                currentPage: 1,
            }
        }
        await getProductionData(params)
    }
     const components = {
           body: {
               row: DraggableBodyRow,
           },
       };

       const moveRow = useCallback(
           (dragIndex, hoverIndex) => {
               const dragRow = tableData[dragIndex];
               setTableData(
                   update(tableData, {
                       $splice: [
                           [dragIndex, 1],
                           [hoverIndex, 0, dragRow],
                       ],
                   }),
               );
               updateProductSort(dragIndex,hoverIndex)
           },
           [tableData],
       );

    return (
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item>产品管理 </Breadcrumb.Item>
                    <Breadcrumb.Item href=""> 产品列表</Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={[16, 16]} className='py-6'>
                    <Col span={6}>
                        <Input placeholder={'搜索名称'} value={name} onChange={onInputName} onPressEnter={onSearch}/>
                    </Col>
                    <Col span={10} offset={8} className='flex justify-end'>
                        <Button type="primary" onClick={addProduct}>+添加产品</Button>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} >
                    <Col span={24}>
                        <DndProvider backend={HTML5Backend}>
                        <Table
                            size='60'
                            dataSource={tableData}
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={{
                                current:page,
                                pageSize: pageSize,
                                total: totalRecord,
                            }}
                            components={components}
                               onRow={(record, index) => ({
                                   index,
                                   moveRow,
                               })}
                            onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
                        />
                        </DndProvider>
                    </Col>
                </Row>
            </div>
            <AddProduct visible={visible} onCancel={onCancel} editData={editData} compileType={compileType}/>

        </section>
    )
};

export default withRouter(Product)
