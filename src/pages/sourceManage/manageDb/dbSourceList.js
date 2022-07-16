/**
 * @name: DbSourceList
 * @author: limingliang
 * @date: 2022-05-16 14:30
 * @description：数据源列表管理
 * @update: 2022-05-16 14:30
 */

import React, {useState, useEffect} from "react";
import {Breadcrumb, Space, Table, Modal, Button,Tag} from "antd";
const { confirm } = Modal;
import tenantService from "../../../service/tenant.service";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import DbAddOrUpdate from "./dbAddOrUpdate";
const DbSourceList = props => {
    const [DbDataList,setDbDataList]=useState([])  //db数据
    const [visible, setVisible] = useState(false);  //修改删除弹窗
    const [updateDbDate, setUpdateDbDate] = useState();  //修改回显数据
    const columns = [
        {
            title: '地址',
            dataIndex: 'url',
            render: (text, record) => {
                return <a className='text-blue-400 cursor-pointer' onClick={() => goTenantDb(record)}>{record.url}</a>
            },
        },
        {
            title: '用户',
            dataIndex: 'userName',
        },
        {
            title: '当前使用',
            dataIndex: 'present',
            render:(text)=>(
                <Space size="middle">
                    {
                        text===1&& <Tag color={'green'} key={text}>当前</Tag>
                    }
                </Space>
            )
        },
        {
            title: '序号 (使用db顺序)',
            dataIndex: 'serialNumber',

        },
        {
            title: '描述',
            dataIndex: 'details',
        },
        {
            title: '操作',
            key: 'details',
            render: (text, record) => (
                <Space size="useState" className='flex  gap-x-2'>
                    <div className='border border-gray-200 bg-blue-400 px-2 text-white cursor-pointer'onClick={()=>updateDb(record)} >
                        编辑
                    </div>
                    <div  className='border border-gray-200 px-2 cursor-pointer' onClick={()=>openDeletePop(record)} >
                        删除
                    </div>
                </Space>
            ),
        },
    ];

    useEffect(async ()=>{
        await findDb()
    },[])
    //查询所有的数据源db
    const findDb = async () => {
        const res=await tenantService.findAllTenantDbGroup()
        if (res.code===0){
            setDbDataList(res.data)
        }
    }



    //打开删除数据源弹窗
    const openDeletePop =async (record) => {
        confirm({
            title: '此操作关系甚大，请看清再操作',
            icon: <ExclamationCircleOutlined/>,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            style: {top: 300},
            onOk() {
                deleteDb(record.id)
            },
            onCancel() {
            },
        })
    }
    //删除数据源
    const deleteDb = async (id) => {
        const param=new FormData()
        param.append('id',id)
        const res= await tenantService.deleteTenantDbGroup(param)
        if (res.code===0){
            setDbDataList(DbDataList.filter(item=>item.id!==id))
        }
    }

    //打开添加修改数据源弹窗
    const openVisible = () => {
      setVisible(true)
    }
    //关闭添加修改数据弹窗
    const closeVisible =async () => {
        setUpdateDbDate(null)
      setVisible(false)
       await findDb()
    }
    const updateDb = (value) => {
        openVisible()
        setUpdateDbDate(value)
    }

    const goTenantDb=async (record)=>{
        props.history.push({
            pathname:"/setting/sourceManage/manageDb/tenantManageDb",
            params:record
        });
    }
    return(
        <section className='flex-row p-6'>
            <div className='w-full  max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item>数据源管理</Breadcrumb.Item>
                    <Breadcrumb.Item href="">db列表</Breadcrumb.Item>
                </Breadcrumb>
                <div className='flex justify-end py-6' >
                    <Button type="primary" onClick={openVisible}>+添加</Button>
                </div>
                <div className='' >
                    <Table
                        columns={columns}
                        dataSource={DbDataList}
                        rowKey = {record => record.id}
                        pagination={false}
                    />
                </div>
            </div>
            <DbAddOrUpdate visible={visible} onCancel={closeVisible} editData={updateDbDate} />
        </section>
    )
}
export default DbSourceList