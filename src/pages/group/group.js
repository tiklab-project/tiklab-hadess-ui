/**
 * @name: group
 * @author: mahai
 * @date: 2021-07-22 17:56
 * @description：group
 * @update: 2021-07-22 17:56
 */
import React, {useState, useEffect}  from 'react';
import {Form, Input, Button} from 'antd';



const Group = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="企业名称"
                name="username"
                rules={[{ required: true, message: '请输入企业名称!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="子域名"
                name="password"
                rules={[{ required: true, message: '请输入子域名地址!' }]}
            >
                <Input addonBefore="http://" addonAfter=".doublekit.com" />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
export default Group
