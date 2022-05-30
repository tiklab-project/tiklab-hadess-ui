/**
 * @name: Tenant
 * @author: mahai
 * @date: 2021-08-09 14:30
 * @description：租户管理
 * @update: 2021-08-09 14:30
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Input, Button, Table, Space, Modal, Switch, Tooltip} from "antd";
import tenantService from "../../service/tenant.service"
import {withRouter} from "react-router";

const { confirm } = Modal;
const Tenant = props => {
    const [name, setName] = useState('');
    const [tableData, setTableData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalRecord, setTotalRecord] = useState(props.total);
    const [visible, setVisible] = useState(false);

    const columns = [
        {
            title: '租户名称',
            dataIndex: 'name',
            render: (text, record) => {
                return <a className='text-blue-500' onClick={() => findDetails(record)}>{record.name}</a>
            }
        },
        {
            title: '访问地址',
            dataIndex: 'id',
            render: (text, record) => (
                <>
                    {filedState(record.id)}
                </>
            )
        },
        {
            title: '用户',
            dataIndex: ['master','name'],
            render: (text, record) => (
                <>
                    {filedState(record.master.name)}
                </>
            )
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '启用状态',
            key: 'useState',
            render: (text, record) => (
                <Space size="useState">
                    {
                        record.useState===1
                            ?<Switch checkedChildren="启用" unCheckedChildren="停用" checked={true} onChange={()=>stopUse(record)} />
                            :<Switch checkedChildren="启用" unCheckedChildren="停用" checked={false} onChange={()=>openUse(record)} />
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

    useEffect(async ()=>{
        const param={
            pageParam: {
                pageSize: 10,
                currentPage: 1,
            },
        }
        await getFindMemberData(param)
    },[])


    const filedState = (value) => {
        return(
            value.length>25?
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
        const param = {
            ...record,
            useState: 1
        }
        await updateTenant(param)
    }
    //停用
    const stopUse=async (record)=> {
        const param = {
            ...record,
            useState: 2
        }
        await updateTenant(param)
    }

      const updateTenant=async param=>{
          //修改租户
          const pre=await tenantService.updateTenantService(param)
          if (pre.code===0){
              const params={
                  pageParam: {
                      pageSize: 10,
                      currentPage: 1,
                  },
              }
              await getFindMemberData(params)
          }
        }

    //分页条件查询租户
    const getFindMemberData=async (param)=>{
        const pre = await  tenantService.findTenantListPage(param)
        if(pre.code===0){
            setTotalRecord(pre.data.totalRecord)
            setTableData(pre.data.dataList)
        }
    }

    const onSearch = async () => {
       const param={
           name:name,
           pageParam: {
               pageSize: 10,
               currentPage: 1,
           },
       }
       await  getFindMemberData(param)
    }
    const onInputName = (e) => {
        const value = e.target.value
        setName(value)
    }


    const handleTableChange = async (pagination, filters, sorter) => {
        setPage(pagination.current)
        const newParams = {
            name:name,
            pageParam: {
                pageSize: pageSize,
                currentPage: pagination.current
            }
        }
        await getFindMemberData(newParams)
    }
    //跳转数据源管理
    const goManageDb =async () => {
        await props.history.push('/setting/tenant/manageDb')
    }

    return(
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-screen-xl m-auto'>
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

export default  withRouter(Tenant)
