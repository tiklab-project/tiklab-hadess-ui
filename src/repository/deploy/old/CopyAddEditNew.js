/**
 * @name: RepositoryCompile
 * @author: limingliang
 * @date: 2022-12-29 10:30
 * @description：编辑复制信息
 * @update: 2022-12-29 10:30
 */
import React, {useEffect, useState} from "react";
import {Col, Row, Form, Modal, Input, Button} from 'antd';
import copyService from "../api/CopyApi";
import {getUser} from "tiklab-core-ui";
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 25},
};
const CopyAddEditNew = (props) => {
    const [form] = Form.useForm();
    const {compileType,visible,onCancel,repositoryId,copy}=props

    useEffect(()=>{
        if (copy){
            form.setFieldsValue({
                url: copy.url,
                source:copy.source,
                account:copy.account,
                password:copy.password,
                timeOut:copy.timeOut
            })
        }
    },[copy])

    /**
     * 提交编辑后的复制信息
     */
    const handleOk =async () => {
        form.validateFields().then(async values => {
            if (copy){
                const res=await copyService.updateRepositoryClusterCfg({...values,id:copy.id,repository:{id:repositoryId},user:{id:getUser().userId}}
                )
                if (!res.code) {
                    onCancel()
                }
            }else {
                const res=await copyService.createRepositoryClusterCfg({...values,repository:{id:repositoryId},user:{id:getUser().userId}})
                if (!res.code) {
                    onCancel()
                }
            }

        })
    }
    const connect = () => {

    }
    return(
        <Modal
            visible={visible}
            title={compileType==='add'?'添加复制源':'修改复制源'}
            onCancel={onCancel}
            okText='保存'
            cancelText='取消'
            width={500}
            destroyOnClose={true}
            closable={false}
            onOk={handleOk}
            footer={[
                <Button key="back" onClick={onCancel}>
                    取消
                </Button>,
                <Button
                    type="primary"
                    onClick={handleOk}
                >
                   确认
                </Button>,
            ]}
        >
            <Form
                {...layout}
                form={form}
                preserve={false}
                layout="vertical"
            >
                <Form.Item
                    name="url"
                    label='地址'
                    rules={[{required: true, message: '地址必填'}]}
                >
                    <Input placeholder='请输入地址'/>
                </Form.Item>
                <Form.Item
                    name="source"
                    label='运输'
                >
                    <Input placeholder='请输入运输' addonAfter="车"/>
                </Form.Item>
                <Form.Item
                    name="account"
                    label='挖机'
                >
                    <Input placeholder='请输入挖机数' addonAfter="辆"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label='人工'
                >
                    <Input placeholder='请输入人工' type={"password"} addonAfter="人"/>
                </Form.Item>
                <Form.Item
                    name="总时长"
                    label='其他消耗'
                >
                    <Input placeholder='请输入总时长'/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label='其他消耗'
                >
                    <Input placeholder='请输入人工'/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label='时间'
                >
                    <Input placeholder='时间输入'/>
                </Form.Item>
            </Form>
        </Modal>

    )
}
export default CopyAddEditNew
