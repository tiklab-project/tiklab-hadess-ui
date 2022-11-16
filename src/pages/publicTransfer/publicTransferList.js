/**
 * @name: PublicTransferList
 * @author: limingliang
 * @date: 2022-06-21 10:48
 * @description：对公转账列表
 * @update: 2022-05-21 10:48
 */
import React, {useState, useEffect,useCallback} from "react";
import {Breadcrumb, Modal, Radio, Space, Table, Tabs} from "antd";
import orderService, {verifyPublicTraApi} from "../../service/order.service";
import {ExclamationCircleOutlined} from "@ant-design/icons";
const { confirm } = Modal;
const { TabPane } = Tabs;
import './public.scss'
import Paging from "../../common/components/paging";
const typeList= [{code:1,name:'未处理'},{code: 2,name:'已处理'}]
const PublicTransferList = props => {

    const [orderData, setOrderData] = useState([]);   //对公转账订单数据
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPage,setTotalPage]=useState(0);  //总页数
    const [type,setType]=useState('1')

    const columns = [
        {
            title: '订单编号',
            dataIndex: ['order','orderCode'],

        },
        {
            title: '会员',
            dataIndex: ['member','name'],
        },
        {
            title: '订单类型',
            dataIndex: 'bGroup',
            render: (text, record) => {
                return record.bGroup===1?'saas版':'线下企业版'
            }
        },
        {
            title: '订单支付价',
            dataIndex: ['order','orderPrice'],
        },
        {
            title: '支付流水',
            dataIndex: 'serialNumber',
        },

        {
            title: '支付状态',
            dataIndex: 'payState',
            render:(text)=>text===1&&'待支付'||text===2&&'已支付'
        },
        {
            title: '提交时间',
            dataIndex: 'createTime',
        },

        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                record.payState===1?  <Space size="middle">
                    <a onClick={() => verify(record)}>确认收到货款</a>
                </Space>:null

            ),
        },
    ];

    useEffect(async ()=>{
       await findOrderPay(1)
    },[])

    //查询对公转账的支付和订单信息
    const findOrderPay=async (payState)=>{
        const param={
            pageParam:{
                currentPage:currentPage,
                pageSize:pageSize
            },
            payState:payState,
            payMethod:3
        }
      const res=await orderService.findPaymentPage(param)
        if (res.code===0){
            setOrderData(res.data.dataList)
            setTotalPage(res.data.totalPage)
        }
    }

    //确认收到货款
    const verify=async (data)=>{
        confirm({
            title: '注意：请确认对账正确后在选择此操作',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            style:{top: 200} ,
            onOk() {
                verifyPublicTraApi(data)
            },
            onCancel() {
            },
        });
    }

    //确认对公转账
    const verifyPublicTraApi = async (data) => {
      const param={
          ...data,
          payState:2
      }
     const res=await orderService.verifyPublicTra(param)
        if (res.code===0){
           await findOrderPay(1)
        }
    }


    const handleTableChange = async (value) => {
        setCurrentPage(value)
        await findOrderPay(value)
    }

    //切换已处理和未处理
    const haveOpened=async (event)=>{
        setType(event)
       await findOrderPay(event)
    }

    return(
        <div className='public-tran'>
            <Breadcrumb separator="/" className=' public-tran-title'>
                <Breadcrumb.Item href="">对公转账订单</Breadcrumb.Item>
            </Breadcrumb>
            <div className='public-tran-data'>
                <Tabs  activeKey={type}  onTabClick={haveOpened}>
                    <TabPane  tab="未处理" key='1'/>
                    <TabPane tab="已处理" key='2'/>
                </Tabs>
                <Table
                    dataSource={orderData}
                    columns={columns}
                    rowKey={record => record.id}
                    pagination={false}
                    onChange={(pagination, filters,sorter) => handleTableChange(pagination, filters,sorter)}
                />
            </div>
            <Paging totalPage={totalPage} currentPage={currentPage} handleTableChange={handleTableChange}/>
        </div>
    )
}

export default PublicTransferList