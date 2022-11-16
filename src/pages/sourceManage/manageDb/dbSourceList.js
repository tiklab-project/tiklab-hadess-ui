/**
 * @name: DbSourceList
 * @author: limingliang
 * @date: 2022-05-16 14:30
 * @description：数据源列表管理
 * @update: 2022-05-16 14:30
 */

import React, {useState, useEffect} from "react";
import {message, Space, Table, Modal, Button,Tag,Tooltip} from "antd";
const { confirm } = Modal;
import tenantService from "../../../service/tenant.service";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import './manageDb.scss'
import DbAddOrUpdate from "./dbAddOrUpdate";
import DbSourceDetails from "./dbSourceDetails";
const DbSourceList = props => {
    const [DbDataList,setDbDataList]=useState([])  //db数据list
    const [visible, setVisible] = useState(false);  //修改删除弹窗
    const [updateDbDate, setUpdateDbDate] = useState();  //修改回显数据

    const [detailsVisible,setDetailsVisible]=useState(false)  //打开详情抽屉状态
    const [dbData,setDbData]=useState()  //bd数据
    const [tenantDbList,setTenantDbList]=useState([])  //租户db

    const columns = [
        {
            title: '地址',
            dataIndex: 'url',
            render: (text, record) => {
                return <a className='text-blue-400 cursor-pointer' onClick={() => openTenantDb(record)}>{record.url}</a>
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
            title: '类型',
            dataIndex: 'type',
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
                <Space size="useState" className='flex  gap-x-4 '>
                    <Tooltip title="编辑">
                        <EditOutlined className='cursor-pointer' onClick={()=>updateDb(record)}/>
                    </Tooltip>
                    <Tooltip title="删除">
                        <DeleteOutlined className='cursor-pointer' onClick={()=>openDeletePop(record)}/>
                    </Tooltip>
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
            title: '注意！ 请确定后在删除',
            icon: <ExclamationCircleOutlined/>,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
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
        }else {
            message.error(res.msg)
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
            pathname:"/index/sourceManage/tenantManageDb",
            params:record
        });
    }
    //打开租户数据源详情
    const openTenantDb =async (value) => {
        await findTenantDatabase(value)
        setDbData(value)
        setDetailsVisible(true)
    }
    const closeTenantDb = () => {
      setDetailsVisible(false)
    }

    //查询改数据源下面的租户
    const findTenantDatabase = async (value,name) => {
        const param={
            dbGroupId:value.id,
            tenantName:name
        }
        const res=await tenantService.findTenantDatabaseByDb(param)
        if (res.code===0){
            setTenantDbList(res.data)
        }
    }

    return(
        <div className='manage-db'>
            <div className='manage-head-style'>
                <div className='manage-title'>db数据源列表</div>
                <Button type="primary" onClick={openVisible}>添加</Button>
            </div>
            <div className='manage-data' >
                <Table
                    columns={columns}
                    dataSource={DbDataList}
                    rowKey = {record => record.id}
                    pagination={false}
                />
            </div>
            <DbAddOrUpdate visible={visible} onCancel={closeVisible} editData={updateDbDate} />
            <DbSourceDetails onClose={closeTenantDb} visible={detailsVisible} dbData={dbData} tenantDbList={tenantDbList} findTenantDatabase={findTenantDatabase} />
        </div>
    )
}
export default DbSourceList