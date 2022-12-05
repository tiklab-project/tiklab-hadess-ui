/**
 * @name: Details
 * @author: limingliamg
 * @date: 2021-08-09 16:48
 * @description：租户详情
 * @update: 2021-08-09 16:48
 */

import React, {useState, useEffect} from "react";
import {Drawer, Space, Table, Tabs, Tag} from 'antd'
import subscribeService from "../../service/subscribe.service";
import tenantService from "../../service/tenant.service";
const { TabPane } = Tabs;
const TenantDetails = (props) => {
    const {visible, onClose,tenantData,memberDataList} = props;

    const [subscriptionList,setSubscriptionList]=useState()   //租户的订阅数据
    const [databaseData,setDatabaseData]=useState()   //db数据源
    const [dssData,setDssData]=useState()   //dss数据源
    const [activeKey,setActiveKey]=useState('1')
    const columns = [
        {
            title: '姓名',
            dataIndex:['master','nickName'],
        },
        {
            title: '手机号',
            dataIndex: ['master','phone'],
        },
        {
            title: '邮箱',
            dataIndex: ['master','email'],
        },

    ];
    const subColumns = [
        {
            title: '产品名称',
            dataIndex: ['product','name'],
        },
        {
            title: '订阅类型',
            dataIndex: 'subType',
            render: text => {
                return text === 1 && '试用'||text === 2&& "购买"||text === 3&& "免费"
            }
        },
        {
            title: '订阅状态',
            dataIndex: 'status',
            render:(text)=>(
                <Space size="middle">
                    {
                        text===1&&<Tag color={'green'} key={text}>使用中</Tag>||
                        text===2&&<Tag color={'gray'} key={text}>已过期</Tag>||
                        text===3&&<Tag color={'default'} key={text}>未订阅</Tag>
                    }
                </Space>
            )
        },
        {
            title: '订阅时长',
            dataIndex: 'duration',
            render: (text, record)  => (
                record.subType===2?
                    <div>{(record.duration) / 12 === 1 ? '1年' : `${text}月`}</div>:
                    <div>{" N/A"}</div>
            )
        },
        {
            title: '订阅有效期',
            dataIndex: 'date',
            render:(text, record) => (
                record.subType===2?
                    <div>{ record.fromDate + '~' + record.endDate}</div>:
                    <div>max</div>
            )
        },
    ];

    //查询该租户的订阅数据
    const findSubscription=async ()=>{
        const param={
            tenantId:tenantData.id
        }
        const res=await subscribeService.findSubscribeList(param)

        if (res.code===0){
            setSubscriptionList(res.data)
        }
    }

    //查询租户数据源
    const findDatabase = async () => {

        const param={
            tenantId:tenantData.id
        }
        const res=await tenantService.findTenantDatabaseList(param)
        if (res.code===0&&res.data.length){
            setDatabaseData(res.data[0])
        }
        const dssRes=await tenantService.findTenantDssList(param)
        if (dssRes.code===0&&dssRes.data.length){
            setDssData(dssRes.data[0])
        }
    }

    //切换类型
    const cuteType = async (value) => {
        setActiveKey(value)
        if (value==='2'){
            await findSubscription()
        }
        if (value==='3'){
            await findDatabase()
        }
    }

    const close = async () => {
        setActiveKey('1')
        onClose()
    }
    return(
        <Drawer
            title="企业详情"
            placement='right'
            onClose={close}
            visible={visible}
            width  ={'700'}
            className='locker-top'
        >
            {
                tenantData&&
                <div className='space-y-2'>
                    <div>租户名称 : {tenantData.name}</div>
                    <div >租户地址 : {tenantData.id}</div>
                    <div>创建用户 : {tenantData.master.nickName}</div>
                    <Tabs defaultActiveKey="1"  activeKey={activeKey} onChange={cuteType} className='pt-6' >
                        <TabPane tab="成员" key="1">
                            <Table
                                dataSource={memberDataList}
                                columns={columns}
                                rowKey={record => record.id}
                                pagination={false}
                            />
                        </TabPane>
                        <TabPane tab="订阅" key="2">
                            <Table
                                dataSource={subscriptionList}
                                columns={subColumns}
                                rowKey={record => record.id}
                                pagination={false}
                            />
                        </TabPane>
                        <TabPane tab="数据源" key="3" >
                            <div className='grid  grid-cols-3  gap-x-10 pt-6 '>
                                {
                                    databaseData&&
                                    <div className='grid gap-y-2 border border-gray-200 pl-2 py-3'>
                                        <h1 className='text-center '>db数据源</h1>
                                        <p>用户: {databaseData.tenantDbGroup.userName}</p>
                                        <p>地址: {databaseData.tenantDbGroup.url}</p>
                                        <p>描述： {databaseData.tenantDbGroup.details}</p>
                                    </div>
                                }
                                {
                                    <div className='grid gap-y-2 border border-gray-200 pl-2 py-3'>
                                        <h1 className='text-center'>dss数据源</h1>
                                        <p>地址: {dssData?.tenantDsGroup?.url}</p>
                                        <p>描述： {dssData?.tenantDsGroup?.details}</p>
                                    </div>
                                }
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            }

        </Drawer>
    )
}
export default TenantDetails
