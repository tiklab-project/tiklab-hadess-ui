/**
 * @name: DssSourceDetails
 * @author: limingliang
 * @date: 2022-11-11 14:30
 * @description：数据源列表管理
 * @update: 2022-11-11 14:30
 */
import React,{useState}from "react";
import {Button, Drawer,Input, message,Space, Table} from 'antd'
import {SearchOutlined} from "@ant-design/icons";
import TenantDssUpdate from "./tenantDssUpdate";
import tenantService from "../../../service/tenant.service";
const DssSourceDetails = (props) => {
    const {visible, onClose,dssData,tenantDssList,findTenantDss} = props;
    const [name, setName] = useState('');   //搜索内容
    const [tenantDssIds,setTenantDssIds]=useState([])  //需要切换数据源租户的dss
    const [oldDss,setOldDss]=useState()  //原dss数据源
    const [tenantDssVisible,setTenantDssVisible]=useState(false)  //修改租户的dss数据源弹窗
    const [allDssData,setAllDssData]=useState([])  //所有数据源

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
            title: '地址',
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
        if (tenantDssIds.length){
            return message.warn('请取消多选在搜索');
        }
        findTenantDss(dssData,name)
        //await findTenantDss(2,name)
    }
    //打开多个修改租户的弹窗
    const openUpdateVisibleS = async () => {
        if (tenantDssIds.length){
            await openUpdateVisible(dssData)
        }
    }
    //打开单个修改租户db数据弹窗
    const openUpdateVisible =async (value) => {
        setOldDss(value)
        await findAllDss(value)
        setTenantDssVisible(true)
    }

    //查询所有dss数据源
    const findAllDss = async (value) => {
        const param={
            dsType:value.dsType
        }
        const res=await tenantService.findTenantDsGroupList(param)
        if (res.code===0){
            setAllDssData(res.data)
        }
    }
    //关闭
    const closeUpdateVisible = () => {
        setTenantDssVisible(false)
    }


    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setTenantDssIds(selectedRowKeys)
        }
    };

    return(
        <div>
            <Drawer
                title={dssData?.dsType==='dss'&&'dss数据源详情'||dssData?.dsType==='dfs'&&'dfs数据源详情'||dssData?.dsType==='dcs'&&'dcs数据源详情'}
                placement='right'
                onClose={onClose}
                visible={visible}
                width  ={'800'}
                className='locker-top'
            >
                {dssData&&
                    <div className='space-y-3 '>
                        <div>
                            {dssData.dsType==='dss'&&'dss路径'||dssData.dsType==='dfs'&&'dfs路径'||dssData.dsType==='dcs'&&'dcs路径'}: {dssData.url}
                        </div>
                        <div>类型: {dssData.dsType}</div>
                        <div>简介: {dssData.details}</div>
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
                                dataSource={tenantDssList}
                                rowKey = {record => record.id}
                                //scroll={{ y: 400 }}
                                pagination={false}
                            />
                        </div>
                    </div>
                }
            </Drawer>
            <TenantDssUpdate  visible={tenantDssVisible} onCancel={closeUpdateVisible} oldDssData={oldDss} allDssData={allDssData} tenantDssIds={tenantDssIds}/>
        </div>
    )
}
export default DssSourceDetails