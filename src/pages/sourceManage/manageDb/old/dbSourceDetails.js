/**
 * @name: DbSourceDetails
 * @author: limingliang
 * @date: 2022-11-11 14:30
 * @description：数据源列表管理
 * @update: 2022-11-11 14:30
 */
import React,{useState}from "react";
import {Button, Drawer,Input, message,Space, Table} from 'antd'
import {SearchOutlined} from "@ant-design/icons";
import TenantDbUpdate from "../tenantDbUpdate";
import tenantService from "../../../../service/tenant.service";
const DbSourceDetails = (props) => {
    const {visible, onClose,dbData,tenantDbList,findTenantDatabase} = props;
    const [name, setName] = useState('');   //搜索内容
    const [tenantDbIds,setTenantDbIds]=useState([])  //需要切换数据源租户的IDs

    const [tenantDbVisible,setTenantDbVisible]=useState(false)
    const [oldDatabase,setOldDatabase]=useState()   //原db数据源
    const [allDatabase,setAllDatabase]=useState([])  //所有数据源
    const columns = [
        {
            title: '租户名称',
            dataIndex: ['tenant','name'],
        },
        {
            title: '租户id',
            dataIndex: ['tenant','id'],
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
    //通过名字搜索租户
    const onInputName = (e) => {
        const value = e.target.value
        setName(value)
    }
    const onSearch = async () => {
        if (tenantDbIds.length){
            return message.warn('请取消多选在搜索');
        }
         findTenantDatabase(dbData.id,name)
    }

    //打开多个修改租户的弹窗
    const openUpdateVisibleS = async () => {
        if (tenantDbIds.length){
            await openUpdateVisible(dbData)
        }
    }


    //打开单个修改租户db数据弹窗
    const openUpdateVisible =async (value) => {
        setOldDatabase(value)
        await findAllDatabase()
        setTenantDbVisible(true)
    }
    //关闭单个修改租户db数据弹窗
    const closeUpdateVisible = () => {
        setTenantDbVisible(false)
    }

    //查询所有数据源
    const findAllDatabase = async () => {
        const param={
            type:dbData.type
        }
        const res=await tenantService.findTenantDbGroupList(param)
        if (res.code===0){
            setAllDatabase(res.data)
        }
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setTenantDbIds(selectedRowKeys)
        }
    };

    return(
        <div>
            <Drawer
                title="db数据源详情"
                placement='right'
                onClose={onClose}
                visible={visible}
                width ={'800'}
                className='locker-top'
            >
                {dbData&&
                    <div className='space-y-3'>
                        <div>用户名: {dbData.userName}</div>
                        <div>db路径: {dbData.url}</div>
                        <div>简介: {dbData.details}</div>
                        <div className='pt-6'>
                            <div className='flex justify-between'>
                                <Input placeholder={'搜索租户'} style={{ width: 240 }} value={name} onChange={onInputName}  onPressEnter={onSearch} prefix={<SearchOutlined/>} className='text-gray-400' />
                                <Button type="primary" onClick={openUpdateVisibleS}>批量切换</Button>
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
                                //scroll={{ y: 500 }}
                            />
                        </div>
                    </div>
                }
            </Drawer>
            <TenantDbUpdate  visible={tenantDbVisible} onCancel={closeUpdateVisible} oldDatabase={oldDatabase} allDatabase={allDatabase} tenantIds={tenantDbIds}/>
        </div>

    )
}
export default DbSourceDetails