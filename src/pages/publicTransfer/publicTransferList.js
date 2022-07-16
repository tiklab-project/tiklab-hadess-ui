/**
 * @name: PublicTransferList
 * @author: limingliang
 * @date: 2022-06-21 10:48
 * @description：对公转账列表
 * @update: 2022-05-21 10:48
 */
import React, {useState, useEffect,useCallback} from "react";
import {Breadcrumb, Modal, Radio, Space, Table, Tag} from "antd";
import orderService, {verifyPublicTraApi} from "../../service/order.service";
import {ExclamationCircleOutlined} from "@ant-design/icons";
const { confirm } = Modal;
const typeList= [{code:1,name:'未处理'},{code: 2,name:'已处理'}]
const PublicTransferList = props => {

    const [orderData, setOrderData] = useState([]);   //对公转账订单数据
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalRecord, setTotalRecord] = useState();

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
                currentPage:page,
                pageSize:pageSize
            },
            payState:payState,
            payMethod:3
        }
      const res=await orderService.findPaymentPage(param)
        if (res.code===0){
            setOrderData(res.data.dataList)
            setTotalRecord(res.data.totalRecord)
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
    //切换卷类型
    const cutType =async (e) => {
        await findOrderPay(e.target.value)
    }

    const handleTableChange = async (pagination, filters, sorter) => {
        setPage(pagination.current)
        await findOrderPay(pagination.current)
    }
    return(
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item>对公转账 </Breadcrumb.Item>
                    <Breadcrumb.Item href="">对公转账订单</Breadcrumb.Item>
                </Breadcrumb>
                <div className='pt-6'>
                    <Radio.Group  defaultValue={1} buttonStyle="solid"  className='w-2/3' onChange={cutType}>
                        {typeList.map(item=>{
                            return(
                                <Radio.Button key={item.code} value={item.code}>{item.name}</Radio.Button>
                            )
                        })}
                    </Radio.Group>
                    <div className={'pt-6'}>
                        <Table
                            dataSource={orderData}
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={{
                                current:page,
                                pageSize: pageSize,
                                total: totalRecord,
                            }}
                            onChange={(pagination, filters,sorter) => handleTableChange(pagination, filters,sorter)}
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default PublicTransferList