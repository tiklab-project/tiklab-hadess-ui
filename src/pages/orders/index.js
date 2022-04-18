/**
 * @name: index
 * @author: mahai
 * @date: 2021-08-09 14:30
 * @description：订单管理
 * @update: 2021-08-09 14:30
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Input, Button, Table,Space,Modal,Select} from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AddOrder from "./addOrder";
import orderService from "../../service/order.service"
const { Option } = Select;
const { confirm } = Modal;
const Orders = props => {
    const [name, setName] = useState(null);
    const [editData, setEditData] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalRecord, setTotalRecord] = useState(props.total);
    const [visible, setVisible] = useState(false);
    const [orderType,setOrderType]=useState('')
    const columns = [
        {
            title: '订单编号',
            dataIndex: 'orderCode',
            render: (text, record) => {
                return <a className='text-blue-500' onClick={() => findDetails(record)}>{record.orderCode}</a>
            }
        },
        {
            title: '企业名称',
            dataIndex: ['tenant','name'],
        },

        {
            title: '产品名称',
            dataIndex: 'productName',
        },
        {
            title: '订单价格',
            dataIndex: 'orderPrice',
        },
        {
            title: '用户',
            dataIndex: ['member','name'],
        },
        {
            title: '订单状态',
            dataIndex: 'paymentStatus',
            render:(text)=>text===1?'待支付':null||text===2?'已完成':null||text===3?'已取消':null
        },
        {
            title: '下单时间',
            dataIndex: 'createTime',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => editProduct(record)}>编辑</a>
                    <a onClick={() => deletePop(record.id)}>删除</a>
                </Space>
            ),
        },
    ];

    useEffect(()=>{
        getOrderData(1)
    }, [])


    const editProduct = (item) => {
        setEditData(item)
        addProduct()
    }

    const findDetails=async (record)=>{
        props.history.push({
            pathname:"/setting/order/details",
            params:record
        });
    }

    const deletePop=async (data)=>{
        confirm({
            title: '是否删除该订单',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteOrder(data)
            },
            onCancel() {
            },
        });

    }
    const deleteOrder = async (id) => {
        const formData = new FormData()
        formData.append('id', id);
        const response = await orderService.deleteOrder(formData)
        if (response.code === 0) {
            await getOrderData(page)
        }
    }

    //查询订单
    const getOrderData = async (currentPage,e) => {
        const params = {
            pageParam: {
                pageSize: pageSize,
                currentPage: currentPage,
            },
            orderType:e,
            orderCode:name,
            subscribetype:2
        }
        const data = await orderService.findOrderPage(params)
        if (data.code === 0) {
            setTotalRecord(data.data.totalRecord)
            setTableData(data.data.dataList)
        }
    }
    const onInputName = (e) => {
        const value = e.target.value
        if ( e.target.value){
            setName(value)
        }else {
            setName(null)
        }

    }
    const onSearch = async () =>    {
     await getOrderData()

    }
    const addProduct = () => {
        setVisible(true)
    }
    //取消修改订单的弹窗
    const onCancel = async () => {
        setVisible(false)
        setEditData(null)
        await getOrderData(1)
    }
    //分页
    const handleTableChange = async (pagination, filters, sorter) => {
        setPage(pagination.current)
        await getOrderData(pagination.current)
    }

    //通过订单类型查询
    const findOrderType =async (e)=>{
        setOrderType(e)
        await getOrderData(1,e)
    }
    return(
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-screen-xl m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item>订单管理</Breadcrumb.Item>
                    <Breadcrumb.Item href=""> 订单列表</Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={[16, 16]} className='py-6'>
                    <Col span={6}>
                        <Input placeholder={'搜索订单ID'} style={{ width: 240 }} value={name} onChange={onInputName} onPressEnter={onSearch}/>
                    </Col>
                    <div className='space-x-6 pt-2'>
                        <label>时间排序</label>
                        <Select defaultValue='' style={{ width: 240 }}  onChange={findOrderType} >
                            <Option value='' >全部</Option>
                            <Option value='1'>sass</Option>
                            <Option value='2'>企业</Option>
                        </Select>
                    </div>
                    <Col span={10}  className='flex justify-end pt-2' style={{display:'flex'}}>
                        <Button type="primary" >+导出</Button>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} >
                    <Col span={24}>
                        <Table
                            dataSource={tableData}
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={{
                                current:page,
                                pageSize: pageSize,
                                total: totalRecord,
                            }}
                            onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
                        />
                    </Col>
                </Row>
            </div>
            <AddOrder visible={visible} onCancel={onCancel} editData={editData}/>
        </section>
    )
}

export default Orders
