/**
 * @name: index
 * @author: mahai
 * @date: 2021-08-09 14:07
 * @description：产品订阅
 * @update: 2021-08-09 14:07
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Input, Button, Table, Space, Switch} from "antd";
import subscribeService from "../../service/subscribe.service";

const Subscription = props => {
    const [visible, setVisible] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalRecord, setTotalRecord] = useState(props.total);
    const [name, setName] = useState('');
    const [tableData, setTableData] = useState(props.subscribeList);
    const columns = [
       /* {
            title: '订阅ID',
            dataIndex: 'id',
        },*/
        {
            title: '产品名称',
            dataIndex: ['product','name'],
            render: (text, record) => {
                return <a className='text-blue-500' onClick={() => findDetails(record)}>{record.product.name}</a>
            }
        },
        {
            title: '企业名称',
            dataIndex: ['tenant','name'],

        },
        {
            title: '用户',
            dataIndex: ['member','name'],
        },
        {
            title: '支付类型',
            dataIndex: 'subscribeType',
            render: text => {
                return text === 1 ? '试用' : "购买"
            }
        },
        {
            title: '订阅类型',
            dataIndex: 'type',
            render: text => {
                return text === 1 ? 'sass' : "企业"
            }
        },
        {
            title: '订阅状态',
            dataIndex: 'status',
            render: text => {
                return text === 1 ? '使用中' : "已过期"
            }
        },
        {
            title: '订阅时长',
            dataIndex: 'duration',
            render: text => {
                return text / 12 === 1 ? '1年' : `${text}月`
            }
        },
        {
            title: '订阅有效期',
            dataIndex: 'date',
            render:(text, record) => {
                if (record.endDate && record.fromDate) return record.fromDate + '~' + record.endDate
            }
        },
        {
            title: '启用状态',
            key: 'useState',
            render: (text, record) => (
                <Space size="useState">
                    {
                        record.useState===1
                            ?<Switch checkedChildren="释放" unCheckedChildren="停用" checked={true} onChange={()=>stopUse(record)} />
                            :<Switch checkedChildren="释放" unCheckedChildren="停用" checked={false} onChange={()=>openUse(record)} />
                    }
                </Space>
            ),
        },
        {
            title: '操作',
            key: 'activity',
            render: (text, record) => (
                <Space size="useState">
                    <a >编辑</a>
                </Space>
            ),
        },
    ];

    useEffect(async () => {
        const params = {
            pageParam: {
                pageSize: 10,
                currentPage: 1,
            }
        }
        await getSubscribeData(params)
    }, []);

    const findDetails=async (record)=>{
        props.history.push({
            pathname:"/setting/subscribe/details",
            params:record
        });
    }

    //停用
    const stopUse=async (record)=>{
        const param={
            ...record,
            useState:2,
        }
       await updateSubscribe(param)
    }
    //释放
    const openUse=async (record)=>{
        const param={
            ...record,
            useState:1,
        }
        await updateSubscribe(param)
    }
    //修改订阅
    const updateSubscribe=async params=>{
       const pre=await subscribeService.updateSubscribeService(params)
        if (pre.code===0){
           const param={
               pageParam: {
                   pageSize: 10,
                   currentPage: 1,
               }
           }
           await getSubscribeData(param)
        }
    }
    //分页条件查询订阅
    const getSubscribeData = async params => {
        const data = await subscribeService.findSubscribePageService(params)
        if (data.code === 0) {
            setTotalRecord(data.data.totalRecord)
            setTableData(data.data.dataList)
        }
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
        await getSubscribeData(params)
    }

    const addSubscription = () => {
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
        await getSubscribeData(newParams)
    }

    return(
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-screen-xl m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item>产品订阅管理</Breadcrumb.Item>
                    <Breadcrumb.Item href=""> 产品订阅列表</Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={[16, 16]} className='py-6'>
                    <Col span={6}>
                        <Input placeholder={'搜索名称'} value={name}  onChange={onInputName} onPressEnter={onSearch} />
                    </Col>
                    {/*<Col span={8} offset={8} className='flex justify-end' style={{display:'flex'}}>*/}
                    {/*    <Button type="primary" onClick={addSubscription}>+添加产品订阅</Button>*/}
                    {/*</Col>*/}
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
        </section>
    )
}

export default Subscription
