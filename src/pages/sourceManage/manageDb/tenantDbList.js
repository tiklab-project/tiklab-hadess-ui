/**
 * @name: TenantDbList
 * @author: limingliang
 * @date: 2022-05-16 14:30
 * @description：租户的数据源列表管理
 * @update: 2022-05-16 14:30
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Space, Table, message, Button, Select, Input} from "antd";
import {withRouter} from "react-router";
import tenantService from "../../../service/tenant.service";
const { Option } = Select;
import TenantDbUpdate from "./tenantDbUpdate";
const TenantDbList = props => {
    const dbDatabase=props.history.location.params
    const [tenantDbList,setTenantDbList]=useState([])
    const [database,setDatabase]=useState()
    const [tenantDbVisible,setTenantDbVisible]=useState(false)  //修改租户的数据源弹窗
    const [oldDatabase,setOldDatabase]=useState()   //原db数据源
    const [allDatabase,setAllDatabase]=useState([])  //所有数据源
    const [name, setName] = useState('');   //搜索内容
    const [dataState,setDataState]=useState(true)

    const [tenantDbIds,setTenantDbIds]=useState([])  //需要切换数据源租户的IDs

    const columns = [
        {
            title: '租户名称',
            dataIndex: ['tenant','name'],
        },
        {
            title: '产品',
            dataIndex: 'app',
        },
        {
            title: 'db',
            dataIndex: 'url',
        },
        {
            title: '操作',
            key: 'activity',
            render: (text, record) => (
                <Space size="useState">
                    <div className='border border-gray-200 bg-blue-400 px-2 text-white cursor-pointer'onClick={()=>openUpdateVisible(record)} >
                        切换
                    </div>
                </Space>
            ),
        },
    ];

    useEffect(async ()=>{
        if (dbDatabase){
            sessionStorage.setItem("database", JSON.stringify(dbDatabase));
        }
        await findTenantDatabase(1)
        await findAllDatabase()
    },[])

    const findAllDatabase = async () => {
        const res=await tenantService.findAllTenantDbGroup()
        if (res.code===0){
            setAllDatabase(res.data)
        }
    }

    //查询改数据源下面的租户
    const findTenantDatabase = async (type,name) => {
        const database=JSON.parse(sessionStorage.getItem("database"));
        setDatabase(database)
        const param={
            dbGroupId:database.id,
            tenantName:name
        }
        const res=await tenantService.findTenantDatabaseByDb(param)
        if (res.code===0){
            if (!res.data.length&&type===1){
                setDataState(false)
            }
            setTenantDbList(res.data)
        }
    }

    //打开单个修改租户db数据弹窗
    const openUpdateVisible = (value) => {
        setOldDatabase(value)
        setTenantDbVisible(true)

    }
    //打开多个修改租户的弹窗
    const openUpdateVisibleS = async () => {
        if (tenantDbIds.length){
            const database=JSON.parse(sessionStorage.getItem("database"));
            await openUpdateVisible(database)
        }
    }
    const closeUpdateVisible =async () => {
        setTenantDbIds([])
        setName('')
        setTenantDbVisible(false)
        await findTenantDatabase(2)
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setTenantDbIds(selectedRowKeys)
        }
    };
    //通过名字搜索租户
    const onInputName = (e) => {

        const value = e.target.value
        setName(value)
    }
    const onSearch = async () => {
        if (tenantDbIds.length){
            return message.warn('请取消多选在搜索');
        }
        await findTenantDatabase(2,name)
    }
    return(
        <section className='flex-row p-6'>
            <div className='w-full  max-w-full m-auto '>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item href="#/setting/sourceManage/manageDb">db数据源列表</Breadcrumb.Item>
                    <Breadcrumb.Item >租户db数据源管理</Breadcrumb.Item>
                </Breadcrumb>
                {database&&
                    <div className='grid gap-y-6 pt-6 pl-4 pb-8'>
                        <div>用户名: {database.userName}</div>
                        <div>db路径: {database.url}</div>
                        <div>简介: {database.details}</div>
                    </div>
                }
                {
                    dataState?
                    <div className='border border-gray-200 '>
                        <div className='flex justify-between py-4 pl-4 px-2' >
                            <div className='flex space-x-6 '>
                                <div >
                                    <Input placeholder={'搜索租户'} style={{ width: 240 }} value={name} onChange={onInputName}  onPressEnter={onSearch}/>
                                </div>
                            </div>
                            <Button type="primary" onClick={openUpdateVisibleS}>+批量切换</Button>
                        </div>
                        <Table
                            rowSelection={{
                                type: 'checkbox',
                                ...rowSelection,
                            }}
                            columns={columns}
                            dataSource={tenantDbList}
                            rowKey = {record => record.id}
                            pagination={false}
                            scroll={{ y: 400 }}
                        />

                    </div>:
                    <div className='border border-gray-200 h-12 text-center py-3 bg-gray-50'>
                        该数据源下面没有租户
                    </div>
                }
            </div>
            <TenantDbUpdate  visible={tenantDbVisible} onCancel={closeUpdateVisible} oldDatabase={oldDatabase} allDatabase={allDatabase} tenantIds={tenantDbIds}/>
        </section>
    )
}
export default  withRouter(TenantDbList)
