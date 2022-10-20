/**
 * @name: index
 * @author: mahai
 * @date: 2021-08-09 14:07
 * @description：产品订阅
 * @update: 2021-08-09 14:07
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Input,Table, Space, Switch, Tooltip, Tag} from "antd";
import subscribeService from "../../service/subscribe.service";

const Subscription = props => {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalRecord, setTotalRecord] = useState();
    const [name, setName] = useState('');
    const [tableData, setTableData] = useState([]);
    const columns = [

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
            render: (text, record) => (
                <>
                    {record.tenant&&filedState(record.tenant.name)}
                </>
            )

        },
        {
            title: '用户',
            dataIndex: ['member','nickName'],
            render: (text, record) => (
                <>
                    {filedState(record.member.nickName)}
                </>
            )
        },
        {
            title: '支付类型',
            dataIndex: 'subType',
            render: text => {
                return text === 1 && '免费'||text === 2&& "购买"||text === 3&& "免费"
            }
        },
        {
            title: '订阅类型',
            dataIndex: 'bGroup',
            render: text => {
                return text === 1 ? 'sass' : "企业"
            }
        },
        {
            title: '订阅状态',
            dataIndex: 'status',
            render:(text)=>(
                <Space size="middle">
                    {
                        text===1&&<Tag color={'green'} key={text}>使用中</Tag>||
                        text===2&&<Tag color={'volcano'} key={text}>已过期</Tag>||
                        text===3&&<Tag color={'default'} key={text}>试用</Tag>
                    }
                </Space>
            )
        },
        {
            title: '订阅人数',
            dataIndex: 'subAllNum',
            render: (text,record)  => <div>{record.productCode==='eas'?'max':`${text}人`}</div>
        },
        {
            title: '订阅时长',
            dataIndex: 'subAllMath',
            render: (text, record)  => {
                return record.subType!==2&&record.bGroup!==2?"N/A":(record.duration) / 12 === 1 ? '1年' : `${text}月`
            }
        },
        {

            title: '订阅有效期',
            dataIndex: 'date',
            render:(text, record) =>(
                record.subType===2?
                    <div>{record.fromDate + '~' + record.endDate}</div>:
                    <div>max</div>
            )
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

        await getSubscribeData(page)
    }, []);

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
    const findDetails=async (record)=>{
        props.history.push({
            pathname:"/setting/subscribe/details",
            params:record.id
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
           await getSubscribeData(page)
        }
    }

    //分页条件查询订阅
    const getSubscribeData = async(page) => {
        const param={
            name: name,
            pageParam: {
                pageSize: pageSize,
                currentPage: page,
            }
        }
        const data = await subscribeService.findSubscribePageService(param)
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

        await getSubscribeData(1)
    }


    const handleTableChange = async (pagination) => {
        setPage(pagination.current)

        await getSubscribeData(pagination.current)
    }

    return(
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item>产品订阅管理</Breadcrumb.Item>
                    <Breadcrumb.Item href="">订阅列表</Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={[16, 16]} className='py-6'>
                    <Col span={6}>
                        <Input placeholder={'搜索名称'} value={name}  onChange={onInputName} onPressEnter={onSearch} />
                    </Col>
                </Row>
                <Row gutter={[16, 16]} >
                    <Col span={24}>
                        <Table
                            dataSource={tableData}
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={{
                                pageSize: pageSize,
                                current:page,
                                total: totalRecord,
                            }}
                            onChange={(pagination, filters,sorter) => handleTableChange(pagination, filters,sorter)}
                        />
                    </Col>
                </Row>
            </div>
        </section>
    )
}

export default Subscription
