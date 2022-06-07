/**
 * @name: DssSourceList
 * @author: limingliang
 * @date: 2022-05-16 14:30
 * @description：dss源列表管理
 * @update: 2022-05-16 14:30
 */

import React, {useState, useEffect,Fragment} from "react";
import {Breadcrumb, Button, Space, Table, Modal, Tag} from "antd";
const { confirm } = Modal;
import tenantService from "../../../service/tenant.service";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import DssAddOrUpdate from "./dssAddOrUpdate";
const DssSourceList = props => {

    const [dssDataList,setDssDataList]=useState([])  //dss数据
    const [visible, setVisible] = useState(false);  //修改删除弹窗
    const [updateDssDate, setUpdateDssDate] = useState();  //修改回显数据

    const columns = [
        {
            title: '地址',
            dataIndex: 'url',
            render: (text, record) => {
                return <a className='text-blue-400' onClick={() => goTenantDss(record)}>{record.url}</a>
            },
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
        await findDss()
    },[])

    const findDss = async () => {
      const res= await tenantService.findAllTenantDssGroup()
        if (res.code===0){
            setDssDataList(res.data)
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
                deleteDss(record.id)
            },
            onCancel() {
            },
        })
    }
    //删除dss数据源
    const deleteDss = async (id) => {
        const param= new FormData()
        param.append('id',id)
        const res=await tenantService.deleteTenantDssGroup(param)
        if (res.code===0){
            setDssDataList(dssDataList.filter(item=>item.id!==id))
        }
    }
    //打开添加修改数据源弹窗
    const openVisible = () => {
        setVisible(true)
    }
    const updateDb = (value) => {
        openVisible()
        setUpdateDssDate(value)
    }
    //关闭添加修改数据弹窗
    const closeVisible =async () => {
        setUpdateDssDate(null)
        setVisible(false)
        await findDss()
    }

    const goTenantDss=async (record)=>{
        props.history.push({
            pathname:"/setting/sourceManage/manageDss/tenantManageDss",
            params:record
        });
    }
    return(
        <section className='flex-row p-6'>
            <div className='w-full  max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item >数据源管理</Breadcrumb.Item>
                    <Breadcrumb.Item href="">dss列表</Breadcrumb.Item>
                </Breadcrumb>
                <div className='flex justify-end py-6' >
                    <Button type="primary" onClick={openVisible}>+添加</Button>
                </div>
                <div className='' >
                    <Table
                        columns={columns}
                        dataSource={dssDataList}
                        rowKey = {record => record.id}
                        pagination={false}
                    />
                </div>
            </div>
            <DssAddOrUpdate visible={visible} onCancel={closeVisible} editData={updateDssDate}/>
        </section>
    )
}
export default DssSourceList