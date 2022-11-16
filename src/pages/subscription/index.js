/**
 * @name: index
 * @author: mahai
 * @date: 2021-08-09 14:07
 * @description：产品订阅
 * @update: 2021-08-09 14:07
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Input, Table, Space, Switch, Tooltip, Tag, Pagination} from "antd";
import subscribeService from "../../service/subscribe.service";
import SubscribeDetails from './subscribeDetails'
import './subscribe.scss'
import {DeleteOutlined, EditOutlined, SearchOutlined} from "@ant-design/icons";
import Paging from "../../common/components/paging";
const Subscription = props => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPage,setTotalPage]=useState(0);  //总页数

    const [name, setName] = useState('');
    const [subRecordList,setSubRecordList]=useState([])   //订阅记录List
    const [subscribeLIst, setSubscribeList] = useState([]);   //订阅数据list
    const [subscribe,setSubscribe]=useState()  //订阅数据
    const [visible, setVisible] = useState(false);  //会员详情 弹窗状态

    const columns = [

        {
            title: '产品名称',
            dataIndex: ['product','name'],
            render: (text, record) => {
                return <a className='text-blue-500' onClick={() => openMemberDetails(record)}>{record.product.name}</a>
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
                        text===1&&<Tag color={'green'} key={text}>订阅</Tag>||
                        text===2&&<Tag color={'volcano'} key={text}>过期</Tag>||
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
            title: '操作',
            key: 'activity',
            width:'5%',
            render: (text, record) => (
                <Space size="useState" className='flex  gap-x-4 '>
                    <Tooltip title="编辑">
                        <EditOutlined className='cursor-pointer' />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    useEffect(async () => {
        await getSubscribeData(currentPage)
    }, []);

    const filedState = (value) => {
        return(
            value&&value.length>5?
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

    //打开订阅详情抽屉
    const openMemberDetails =async (value) => {
        setSubscribe(value)
        await findSubRecord(value.id)
        setVisible(true)
    }
    //关闭订阅详情抽屉
    const closeMemberDetails = () => {
        setVisible(false);
    };


    //查询订阅记录
    const findSubRecord =async (subId) => {
        const param={
            subscribeId:subId
        }
        const res = await subscribeService.findSubscribeRecordList(param)
        if (res.code===0){
            setSubRecordList(res.data)
        }
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
           await getSubscribeData(currentPage)
        }
    }

    //分页条件查询订阅
    const getSubscribeData = async(currentPage) => {
        const param={
            name: name,
            pageParam: {
                pageSize: pageSize,
                currentPage: currentPage,
            }
        }
        const res = await subscribeService.findSubscribePageService(param)
        if (res.code === 0) {
            setTotalPage(res.data.totalPage)
            setSubscribeList(res.data.dataList)
        }
    }

    const onInputName = (e) => {
        const value = e.target.value
        setName(value)
    }

    const onSearch = async () => {
        await getSubscribeData(1)
    }


    const handleTableChange = async (value) => {
        setCurrentPage(value)
        await getSubscribeData(value)

    }

    return(
        <div className='subscribe'>
            <div className='subscribe-title'>订阅列表</div>
            <Row gutter={[16, 16]} className='subscribe-data'>
                <Col span={6}>
                    <Input placeholder={'搜索名称'} value={name}  onChange={onInputName} onPressEnter={onSearch} prefix={<SearchOutlined/>} className='text-gray-400' />
                </Col>
            </Row>
            <Row gutter={[16, 16]} >
                <Col span={24}>
                    <Table
                        dataSource={subscribeLIst}
                        columns={columns}
                        rowKey={record => record.id}
                        pagination={false}
                    />
                </Col>
            </Row>
            <Paging totalPage={totalPage} currentPage={currentPage} handleTableChange={handleTableChange}/>
            <SubscribeDetails onClose={closeMemberDetails} visible={visible} subscribeData={subscribe} subRecordList={subRecordList}/>
        </div>
    )
}

export default Subscription
