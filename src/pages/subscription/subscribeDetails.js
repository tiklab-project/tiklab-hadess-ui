/**
 * @name: Details
 * @author: limingliang
 * @date: 2021-08-09 16:48
 * @description：订阅详情
 * @update: 2021-08-09 16:48
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Form} from "antd";

import {withRouter} from "react-router";
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 15 },
};

const SubscribeDetails = props => {
    const [subscriberData,setSubscriberData]=useState('')
    const subscribers=props.history.location.params
    useEffect(async ()=>{
        if(subscribers){
            sessionStorage.setItem("subscribers", JSON.stringify(subscribers));
            setSubscriberData( JSON.parse(sessionStorage.getItem("subscribers")))
        }

    },[])
    return (
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-screen-xl m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item  href='#/setting/subscribe'>服务订阅</Breadcrumb.Item>
                    <Breadcrumb.Item href="">{subscriberData.name}</Breadcrumb.Item>
                </Breadcrumb>
                <Form
                    {...layout}
                    name="nest-messages"
                    className='mt-6'>
                    <Form.Item label="会员名称">
                        {subscriberData.name}
                    </Form.Item>
                    <Form.Item label="会员邮箱">
                        {subscriberData.email}
                    </Form.Item>
                    <Form.Item label="手机号">
                        {subscriberData.phone}
                    </Form.Item>
                    <Form.Item label="认证方式">
                        {
                            subscriberData.memberType===1
                                ?'内部':'第三方'
                        }
                    </Form.Item>
                </Form>

            </div>
        </section>
    )
};

export default withRouter(SubscribeDetails)
