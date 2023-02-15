/**
 * @name: AgencyCompile
 * @author: limingliang
 * @date: 2022-12-29 10:30
 * @description：编辑代理信息
 * @update: 2022-12-29 10:30
 */
import React, {useEffect, useState} from "react";
import {Col, Row, Form, Modal, Input,Select,Upload, Button} from 'antd';
import proxyService from "../../../service/proxy.service";
const { Option } = Select;
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 25},
};
const AgencyCompile = (props) => {
    const [form] = Form.useForm();
    const {compileType,visible,onCancel,repositoryId,agency}=props
    useEffect(()=>{
        if (agency){
            form.setFieldsValue({
                agencyUrl: agency.agencyUrl,
                agencyName:agency.agencyName,
                userName:agency.userName,
                password:agency.password,
            })
        }
    },[agency])

    const handleOk =async () => {
        form.validateFields().then(async values => {
            if (agency){
                const res=await proxyService.updateRepositoryRemoteProxy({...values,id:agency.id,repository:{id:repositoryId}})
                if (!res.code) {
                    onCancel()
                }
            }else {
                const res=await proxyService.createRepositoryRemoteProxy({...values,repository:{id:repositoryId}})
                if (!res.code) {
                    onCancel()
                }
            }

        })
    }
    return(
        <Modal
            visible={visible}
            title={compileType==='add'?'添加来源':'修改来源'}
            onCancel={onCancel}
            okText='保存'
            cancelText='取消'
            width={500}
            destroyOnClose={true}
            closable={false}
            onOk={handleOk}
        >
            <Form
                {...layout}
                form={form}
                preserve={false}
                layout="vertical"
            >
                <Form.Item
                    name="agencyUrl"
                    label='地址'
                    rules={[{required: true, message: '地址必填'}]}
                >
                    <Input placeholder='请输入来源地址'/>
                </Form.Item>
                <Form.Item
                    name="agencyName"
                    label='名称'
                    rules={[{required: true, message: '名称必填'}]}
                >
                    <Input placeholder='请输入来源名称'/>
                </Form.Item>
                <Form.Item
                    name="userName"
                    label='账号'
                >
                    <Input placeholder='请输入账号'/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label='密码'
                >
                    <Input placeholder='请输入密码' type={"password"}/>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default AgencyCompile