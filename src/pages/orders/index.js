/**
 * @name: index
 * @author: mahai
 * @date: 2021-08-09 14:30
 * @description：订单管理
 * @update: 2021-08-09 14:30
 */
import React, {useState, useEffect} from "react";
import {
    Breadcrumb,
    Row,
    Col,
    Input,
    Button,
    Table,
    Space,
    Modal,
    Select,
    Tag,
    Tooltip,
    Pagination
} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import UpdateOrder from "./updateOrder";
import orderService from "../../service/order.service"
const { Option } = Select;
const { confirm } = Modal;
import './order.scss'
import OrderDetails from "./orderDetails";
import Paging from "../../common/components/paging";
const Orders = props => {
    const [name, setName] = useState(null);
    const [editData, setEditData] = useState(null);
    const [orderList, setOrderList] = useState([]);  //订单数据list
    const [order, setOrder] = useState(null);    //订单数据

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPage,setTotalPage]=useState(0);  //总页数

    const [visible, setVisible] = useState(false);
    const [orderType,setOrderType]=useState('')
    
    const [detailsVisible,setDetailsVisible]=useState(false)  //详情抽屉打开状态
    const columns = [
        {
            title: '订单编号',
            dataIndex: 'orderCode',
            render: (text, record) => {
                return <a className='text-blue-500' onClick={() => openOrderDetails(record)}>{record.orderCode}</a>
            }
        },
        {
            title: '订单类型',
            dataIndex: 'bGroup',
            render: (text, record) => {
                return record.bGroup===1?'saas版':'线下企业版'
            }
        },
        {
            title: '企业名称',
            dataIndex: ['tenant','name'],
            render: (text, record) => (
                <>
                    {record.tenant&&filedState(record.tenant.name)}
                </>
            )
        },
        {
            title: '产品名称',
            dataIndex: 'productName',

        },
        {
            title: '订单原价',
            dataIndex: 'originalPrice',
        },
        {
            title: '订单优惠价',
            dataIndex: 'orderPrice',
        },
        {
            title: '用户',
            dataIndex: ['member','name'],
            render: (text, record) => (
                <>
                    {filedState(record.member?.name)}
                </>
            )
        },
        {
            title: '订单状态',
            dataIndex: 'paymentStatus',
            sorter: (a, b) => a.paymentStatus - b.paymentStatus,
            render:(text)=>(
                <Space size="middle">
                    {
                        text===1&& <Tag color={'volcano'} key={text}>待支付</Tag>||
                        text===2&&<Tag color={'green'} key={text}>已完成</Tag>||
                        text===3&&<Tag color={'gray'} key={text}>已取消</Tag>
                    }
                </Space>
            )
        },
        {
            title: '下单时间',
            dataIndex: 'createTime',
            sorter: (a, b) => a.createTime - b.createTime,
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="useState" className='flex  gap-x-4 '>
                    <Tooltip title="删除">
                        <DeleteOutlined className='cursor-pointer' />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    useEffect(async ()=>{
     await   getOrderData(1)
    }, [])


    const filedState = (value) => {
        return(
            value&&value.length>20?
                <Tooltip placement="right" title={value}>
                    <div style={{
                        width: 100,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>
                        {value}
                    </div>
                </Tooltip>
                :
                <div>{value}</div>
        )
    }

    const editProduct = (item) => {
        setEditData(item)
        addProduct()
    }

    //打开详情抽屉
    const openOrderDetails = (value) => {
        setOrder(value)
        setDetailsVisible(true)
    }
    //关闭详情抽屉
    const closeOrderDetails = () => {
        setDetailsVisible(false)
    }

    //删除弹窗
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
            await getOrderData(currentPage)
        }
    }

    //查询订单
    const getOrderData = async (currentPage,e,sorter) => {
        const params = {
            pageParam: {
                pageSize: pageSize,
                currentPage: currentPage,
            },
            bGroup:e,
            orderCode:name,
            subscribeType:2,
            orderParams:sorter&&sorter?.field?[{name:sorter.field,orderType:sorter.order==='ascend'?'asc':'desc'}]:[{name:'paymentStatus',orderType:'asc'}]
        }
        const res = await orderService.findOrderPage(params)
        if (res.code === 0) {
            setTotalPage(res.data.totalPage)
            setOrderList(res.data.dataList)
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
    //分页 排序查询
    const handleTableChange = async (pagination) => {
        setCurrentPage(pagination)
        await getOrderData(pagination)
    }

    //通过订单类型查询
    const findOrderType =async (e)=>{
        setOrderType(e)
        await getOrderData(1,e)
    }
    return(
        <div className='order'>
            <div className='order-head-style'>
                <div className='order-title'>订单列表</div>
                <Button type="primary" >导出</Button>
            </div>
            <Row gutter={[16, 16]} className='order-data space-x-4'>
                <Select defaultValue='null' style={{ width: 200 }}  onChange={findOrderType} >
                    <Option value='null' >全部类型</Option>
                    <Option value='1'>sass</Option>
                    <Option value='2'>企业</Option>
                </Select>
                <Col span={6}>
                    <Input placeholder={'搜索订单ID'} style={{ width: 240 }} value={name} onChange={onInputName} onPressEnter={onSearch}/>
                </Col>
            </Row>
            <Row gutter={[16, 16]} >
                <Col span={24}>
                    <Table
                        dataSource={orderList}
                        columns={columns}
                        rowKey={record => record.id}
                        pagination={false}
                        //onChange={(pagination, filters,sorter) => handleTableChange(pagination, filters,sorter)}
                    />
                </Col>
            </Row>
            <Paging totalPage={totalPage} currentPage={currentPage} handleTableChange={handleTableChange}/>
            <UpdateOrder visible={visible} onCancel={onCancel} editData={editData}/>
            <OrderDetails onClose={closeOrderDetails} visible={detailsVisible} orderData={order}/>
        </div>

    )
}

export default Orders
