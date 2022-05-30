/**
 * @name: Details
 * @author: limingliamg
 * @date: 2021-08-09 16:48
 * @description：租户详情
 * @update: 2021-08-09 16:48
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb,Table,Tabs,Tag,Space} from "antd";
const { TabPane } = Tabs;
import userService from "../../service/user.service"
import {withRouter} from "react-router";
import subscribeService from "../../service/subscribe.service";
import tenantService from "../../service/tenant.service";
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 },
};

const TenantDetails = props => {
    const [tenantData,setTenantData]=useState('')
    const [memberDataList,setMemberDataList]=useState()   //租户的成员数据
    const [subscriptionList,setSubscriptionList]=useState()   //租户的订阅数据
    const [databaseData,setDatabaseData]=useState()   //db数据源
    const [dssData,setDssData]=useState()   //dss数据源
    const tenants=props.history.location.params

    const columns = [
        {
            title: '姓名',
            dataIndex:['master','name'],
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
            dataIndex: 'subscribeType',
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
                        text===2&&<Tag color={'gray'} key={text}>已过期</Tag>
                    }
                </Space>
            )

        },
        {
            title: '订阅时长',
            dataIndex: 'duration',
            render: (text, record)  => {
                return record.subscribeType===3?" N/A":(record.duration) / 12 === 1 ? '1年' : `${text}月`
            }
        },
        {

            title: '订阅有效期',
            dataIndex: 'date',
            render:(text, record) => {
                if (record.endDate && record.fromDate) return record.fromDate + '~' + record.endDate
            }
        },
    ];
    useEffect(async ()=>{
        if (tenants){
            sessionStorage.setItem("tenants", JSON.stringify(tenants));
        }
        await getTenantMember()
    },[])


    //查询该租户的成员
    const getTenantMember=async ()=>{
        const tenantData=JSON.parse(sessionStorage.getItem("tenants"));
        setTenantData(tenantData)
        const param={
            tenantId:tenantData.id
        }
        const pre=await tenantService.findTenantMemberService(param)
        debugger
        if (pre.code===0){
            setMemberDataList(pre.data)
        }
    }
    //查询该租户的订阅数据
    const findSubscription=async ()=>{
        const tenantData=JSON.parse(sessionStorage.getItem("tenants"));
        const param={
            tenantId:tenantData.id
        }
        const res=await subscribeService.findSubscribeList(param)

        if (res.code===0){
            setSubscriptionList(res.data)
        }
    }
    const findDatabase = async () => {
        const tenantData=JSON.parse(sessionStorage.getItem("tenants"));
      const param={
          tenantId:tenantData.id
      }
      const res=await tenantService.findTenantDatabaseList(param)
        debugger
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
        if (value==='2'){
          await findSubscription()
        }
        if (value==='3'){
           await findDatabase()
        }
    }

    return (
        <section className='w-full flex flex-row'>
            <div className=' w-full p-6  max-w-screen-xl m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item  href='#/setting/tenant'>租户管理</Breadcrumb.Item>
                    <Breadcrumb.Item href="">{tenantData.name}</Breadcrumb.Item>
                </Breadcrumb>
                {
                    JSON.parse(sessionStorage.getItem("tenants"))
                    && <div className='grid gap-y-6 pt-6 pl-4'>
                        <div>
                            租户名称:{tenantData.name}
                        </div>
                        <div >
                            域名地址:{tenantData.domainUrl}
                        </div>
                        <div>
                            创建用户: {JSON.parse(sessionStorage.getItem("tenants")).master.name}
                        </div>

                        <Tabs defaultActiveKey="1" onChange={cuteType}>
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
                                <div className='grid  grid-cols-5  gap-x-10 pt-6 '>
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
                                        dssData&&
                                        <div className='grid gap-y-2 border border-gray-200 pl-2 py-3'>
                                            <h1 className='text-center'>dss数据源</h1>
                                            <p>地址: {dssData.tenantDssGroup.url}</p>
                                            <p>描述： {dssData.tenantDssGroup.details}</p>
                                        </div>
                                    }

                                </div>
                            </TabPane>
                        </Tabs>
                        <div className=''>

                        </div>
                    </div>
                }
            </div>

        </section>
    )
};

export default withRouter(TenantDetails)
