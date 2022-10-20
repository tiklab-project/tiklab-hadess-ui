/**
 * @name: Tenant
 * @author: mahai
 * @date: 2021-08-09 14:30
 * @description：租户管理
 * @update: 2021-08-09 14:30
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Input, message, Table, Space, Modal, Switch, Tooltip,Tag,Spin} from "antd";
import tenantService from "../../service/tenant.service"
import {withRouter} from "react-router";

const { confirm } = Modal;
const Tenant = props => {
    const [name, setName] = useState('');
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalRecord, setTotalRecord] = useState(props.total);
    const [spinning, setSpinning] = useState(false)
    const columns = [
        {
            title: '租户名称',
            dataIndex: 'name',
            render: (text, record) => (
                record.isDelete===1?
                    <a className='text-blue-500' onClick={() => findDetails(record)}>{filedState(record.name)}</a>
                    :<div className='text-gray-300'>{filedState(record.name)}</div>
            )
        },
        {
            title: '访问地址',
            dataIndex: 'id',
            render: (text, record) => (
                <div className={(record.isDelete===1?'':' text-gray-300')}>{record.id}</div>
            )
        },
        {
            title: '用户',
            dataIndex: ['master','nickName'],
            render: (text, record) => (
                <div className={(record.isDelete===1?'':' text-gray-300')}>{filedState(record.master?.nickName)}</div>
            )
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            render:(text,record)=><div className={(record.isDelete===1?'':' text-gray-300')}>{text}</div>
        },
        {
            title: '启用状态',
            key: 'useState',
            render: (text, record) => (
                <Space size="useState">
                    {
                        record.useState===1?
                            <Switch checkedChildren="启用" unCheckedChildren="停用" checked={true} onChange={()=>stopUse(record)} />
                            :<Switch checkedChildren="启用" unCheckedChildren="停用" checked={false} onChange={()=>openUse(record)} />
                    }
                </Space>
            ),
        },
        {
            title: '删除状态',
            dataIndex: 'isDelete',
            render: (text, record) =>(
                <Space size="middle">
                    {
                        record.useState!==3?record.isDelete===1?
                            <Tag color={'green'} key={text}>
                                正常
                            </Tag>:
                            <div className='text-gray-300'>
                                已删除
                            </div>:
                            <div className='text-red-400'>数据恢复中...</div>
                    }
                </Space>
            )
        },
        {
            title: '操作',
            key: 'activity',
            render: (text, record) => (
                <Space size="useState">
                    {
                        record.useState!==3?record.isDelete===2?
                            <a onClick={()=>recoverData(record)}>恢复数据</a>:
                            <a onClick={() => findDetails(record)}>详情</a>:''
                    }
                </Space>
            ),
        },
    ];

    useEffect(async ()=>{

        await getFindMemberData(currentPage)
    },[])


    const filedState = (value) => {
        return(
            value?.length>25?
                <Tooltip placement="right" title={value}>
                    <div style={{
                        width: 150,
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
            pathname:"/setting/tenant/tenantDetails",
            params:record
        });
    }

    //启用
    const openUse=async (record)=> {
        if (record.isDelete===2){
             message.error('请先恢复数据');
        }else {
            const param = {
                ...record,
                useState: 1
            }
            await updateTenant(param)
        }


    }
    //停用
    const stopUse=async (record)=> {
        const param = {
            ...record,
            useState: 2
        }
        await updateTenant(param)
    }
    //修改租户
      const updateTenant=async param=>{
          //修改租户
          const pre=await tenantService.updateTenantService(param)

         await getFindMemberData(currentPage)
    }

    //分页条件查询租户
    const getFindMemberData=async (currentPage)=>{
        const param={
            pageParam: {
                pageSize: pageSize,
                currentPage: currentPage,
            },
            name:name
        }
        const pre = await  tenantService.findTenantListPage(param)
        if(pre.code===0){
            setTotalRecord(pre.data.totalRecord)
            setTableData(pre.data.dataList)
        }
    }

    //条件查询
    const onSearch = async () => {
       await  getFindMemberData(currentPage)
    }
    //查询输入的内容
    const onInputName = (e) => {
        const value = e.target.value
        setName(value)
    }

    //分页查询
    const handleTableChange = async (pagination, filters, sorter) => {
        setCurrentPage(pagination.current)
        await getFindMemberData(pagination.current)
    }

    //恢复数据
    const recoverData =async (tenant) => {
        setSpinning(true)
      const res=await tenantService.recoverData(tenant)
        setSpinning(false)
        await getFindMemberData(currentPage)
    }

    return(
        <Spin tip="Loading..." spinning={spinning}>
            <section className='w-full flex flex-row'>
                <div className='w-full p-6 max-w-full m-auto'>
                    <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                        <Breadcrumb.Item>租户管理</Breadcrumb.Item>
                        <Breadcrumb.Item href=""> 租户列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <Row gutter={[16, 16]} className='py-6'>
                        <Col span={6}>
                            <Input placeholder={'租户名称'} value={name} onChange={onInputName} onPressEnter={onSearch} />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} >
                        <Col span={24}>
                            <Table
                                dataSource={tableData}
                                columns={columns}
                                rowKey={record => record.id}
                                pagination={{
                                    current:currentPage,
                                    pageSize: pageSize,
                                    total: totalRecord,
                                }}
                                onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
                            />
                        </Col>
                    </Row>
                </div>
            </section>
        </Spin>
    )
}

export default  withRouter(Tenant)
