/**
 * @name: Details
 * @author: limingliang
 * @date: 2021-08-09 16:48
 * @description：订阅详情
 * @update: 2021-08-09 16:48
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Form, Space, Switch, Table, Tag} from "antd";

import {withRouter} from "react-router";
import tenantService from "../../service/tenant.service";
import subscribeService from "../../service/subscribe.service";
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 15 },
};

const SubscribeDetails = props => {
    const subId=props.history.location.params

    const [subscriberData,setSubscriberData]=useState(null)  //订阅数据
    const [subRecordList,setSubRecordList]=useState(null)   //订阅记录List

    const columns = [
        {
            title: '订阅类型',
            dataIndex: 'buyType',
            render: (text)  => <div>{text=='try'&&'试用'||text=='sub'&&'订阅'||text=='renMath'&&'按时间续订'||text=='renNum'&&'按人数续订'}</div>
        },
        {
            title: '订阅人数',
            dataIndex: 'subNum',
            render: (text)  => <div>{text}人</div>
        },
        {
            title: '订阅时长',
            dataIndex: 'subMath',
            render: (text, record)  => {
                return record.buyType==="try"?"N/A":(record.duration) / 12 === 1 ? '1年' : `${text}月`
            }
        },
        {

            title: '订阅有效期',
            dataIndex: 'date',
            render:(text, record) =>(
                record.subType===2?
                    <div>{record.fromDate + '~' + record.endDate}</div>:
                    <div>max</div>
            )
        }
    ];

    useEffect(async ()=>{
        if(subId){
            sessionStorage.setItem("subId", JSON.stringify(subId));
        }
        await findSubData(subId)
    },[])

    //查询订阅数据
    const findSubData =async () => {
        const subId = JSON.parse(sessionStorage.getItem("subId"))
        const param =new FormData();
        param.append("id",subId)
       const res = await subscribeService.findSubscribe(param)
        if (res.code===0){
            setSubscriberData(res.data)

            await findSubRecord(subId)
        }
    }
    //查询订阅记录
    const findSubRecord =async (subId) => {
       const param={
           subscribeId:subId
       }
      const res = await subscribeService.findSubscribeRecordList(param)
        if (res.code===0){
            setSubRecordList(res.data)
        }
    }

    return (
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-screen-xl m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item  href='#/setting/subscribe'>服务订阅</Breadcrumb.Item>
                    <Breadcrumb.Item href="">订阅记录</Breadcrumb.Item>
                </Breadcrumb>
                <div  className='grid gap-y-6 pt-6 pl-4 pb-8'>
                    <div >订阅产品:{subscriberData?.product.name}</div>
                    <div>{subscriberData?.bGroup===1?`租户名称: ${subscriberData?.tenant?.name}`:`会员名称:${subscriberData?.member?.name}`}</div>
                    <div>订阅类型:{subscriberData?.bGroup===1?'saas订阅':'企业订阅'}</div>
                </div>
                <Table
                    dataSource={subRecordList}
                    columns={columns}
                    rowKey={record => record.id}
                    pagination={false}
                />

            </div>
        </section>
    )
};

export default withRouter(SubscribeDetails)
