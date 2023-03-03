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
const CopyAddEdit = (props) => {
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
                <Button key="submit" type="primary"  onClick={connect}>
                    连接
                </Button>,
                <Button
                    type="primary"
                    onClick={handleOk}
                >
                   保存
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
                    <Input placeholder='请输入来源地址'/>
                </Form.Item>
                <Form.Item
                    name="source"
                    label='名称'
                    rules={[{required: true, message: '名称必填'}]}
                >
                    <Input placeholder='请输入来源名称'/>
                </Form.Item>
                <Form.Item
                    name="account"
                    label='账号'
                    rules={[{required: true, message: '账号必填'}]}
                >
                    <Input placeholder='请输入账号'/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label='密码'
                    rules={[{required: true, message: '密码必填'}]}
                >
                    <Input placeholder='请输入密码' type={"password"}/>
                </Form.Item>
                <Form.Item
                    name="timeOut"
                    label='超时'
                >
                    <Input placeholder='请输入超时' type={"timeOut"}/>
                </Form.Item>

            </Form>
        </Modal>

    )
}
export default CopyAddEdit
