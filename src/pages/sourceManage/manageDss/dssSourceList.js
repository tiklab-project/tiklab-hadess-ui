/**
 * @name: DssSourceList
 * @author: limingliang
 * @date: 2022-05-16 14:30
 * @description：dss源列表管理
 * @update: 2022-05-16 14:30
 */

import React, {useState, useEffect,Fragment} from "react";
import {Breadcrumb, Button, Space, Table, Modal, Tag, Tooltip} from "antd";
const { confirm } = Modal;
import './manageDss.scss'
import tenantService from "../../../service/tenant.service";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import DssSourceCompile from "./dssSourceCompile";
const DssSourceList = props => {

    const [dssDataList,setDssDataList]=useState([])  //dss数据
    const [visible, setVisible] = useState(false);  //修改删除弹窗
    const [updateDssDate, setUpdateDssDate] = useState();  //修改回显数据

    const [detailsVisible,setDetailsVisible]=useState(false)  //打开详情抽屉状态
    const [dssData,setDssData]=useState()  //bss数据
    const [tenantDssList,setTenantDssList]=useState([])  //
    const [allDssData, setAllDssData] = useState([]);   //所有的dss数据源
    const columns = [
        {
            title: '地址',
            dataIndex: 'url',
            render: (text, record) => {
                return <a className='text-blue-400' onClick={() => openTenantDss(record)}>{record.url}</a>
            },
        },
        {
            title: '类型',
            dataIndex: 'dsType',

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
                <Space size="useState" className='flex  gap-x-2 '>
                    <Space size="useState" className='flex  gap-x-4 '>
                        <Tooltip title="编辑">
                            <EditOutlined className='cursor-pointer' onClick={()=>updateDb(record)}/>
                        </Tooltip>
                        <Tooltip title="删除">
                            <DeleteOutlined className='cursor-pointer' onClick={()=>openDeletePop(record)}/>
                        </Tooltip>
                    </Space>
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
    //打开租户dss数据源详情
    const openTenantDss =async (value) => {
        props.history.push(`/index/sourceManage/manageDss/details/${value.id}/${value.dsType}`)
    }


    return(
        <div className='manage-dss'>
            <div className='manage-head-style'>
                <div className='manage-title'>dss数据源列表</div>
                <Button type="primary" onClick={openVisible}>添加</Button>
            </div>
            <div className='manage-data' >
                <Table
                    columns={columns}
                    dataSource={dssDataList}
                    rowKey = {record => record.id}
                    pagination={false}
                />
            </div>
            <DssSourceCompile visible={visible} onCancel={closeVisible} editData={updateDssDate}/>
        </div>
    )
}
export default DssSourceList