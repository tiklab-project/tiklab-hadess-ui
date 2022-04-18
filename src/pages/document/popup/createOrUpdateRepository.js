
/**
 * @name: CreateOrUpdateRepository
 * @author: limingliang
 * @date: 2022-01-20 14:30
 * @description：创建或修改文档空间弹窗
 * @update: 2022-01-20 14:30
 */
import React, {useEffect, useState} from "react";
import {Col, Row, Form, Modal, Input, Select} from 'antd';
const { Option } = Select;
import documentService from "../../../service/document.service"
import {getUser} from "doublekit-frame-ui";
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 18},
};
const { TextArea } = Input;
const CreateOrUpdateRepository = props => {
    const [form] = Form.useForm();
    const [id,setId]=useState('')
    const {visible, onCancel,onok,editData} = props;
    useEffect(()=>{
        if (editData) {
            form.setFieldsValue({
                id: editData.id,
                name: editData.name,
                user:editData.user.id,
                desc:editData.desc,

            })
            setId(editData.id)
        }

    }, [editData])
    //提交创建
    const handleOk=async ()=>{
        form.validateFields().then(async values => {
            const params={
                name:values.name, //订单价格
                desc:values.desc,
                user:{
                    id:getUser().userId
                }
            }
            if (id){
               await update(params)
            }else {
                await documentService.createRepository(params)
            }
            onok()
        })
    }
    const update=async (params)=>{
        const param={
            ...params,
            id:id

        }
        await documentService.updateRepository(param)
    }
    return(
        <Modal
            visible={visible}
            title='创建文档空间'
            onCancel={onCancel}
            okText='创建'
            cancelText='取消'
            width={600}
            destroyOnClose={true}
            onOk={handleOk}
        >
            <Row>
                <Col span={24}>
                    <Form
                        {...layout}
                        form={form}
                        preserve={false}
                    >
                        <Form.Item
                            name="name"
                            label='空间名称'
                            required="required"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="desc"
                            label='空间描述'
                        >
                            <TextArea showCount maxLength={200} style={{ height: 120 }} />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Modal>
    )
}

export default CreateOrUpdateRepository