
/**
 * @name: CreateOrUpdateCategory
 * @author: limingliang
 * @date: 2022-01-20 14:30
 * @description：创建或修改目录弹窗
 * @update: 2022-01-20 14:30
 */
import React, {useEffect, useState} from "react";
import {Col, Row, Form, Modal, Input, Select} from 'antd';
const { Option } = Select;
import documentService from "../../../service/document.service"
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 16},
};

const CreateOrUpdateCategory = props => {
    const [form] = Form.useForm();
    const {visible, onCancel,editData,repository,onOk,categoryData,parentCategoryId} = props;
    useEffect(()=>{
        if (categoryData) {
            form.setFieldsValue({
                name: editData.name,
            })
        }
    }, [editData])
    //提交创建
    const handleOk=async ()=>{
        form.validateFields().then(async values => {
            const params={
                name:values.name, //目录名称
                repository:{
                    id:repository.id
                },
                parentCategory:{
                    id:parentCategoryId
                }
            }
           const res=await documentService.createCategory(params)
            if (res.code===0){
                onOk(parentCategoryId)
            }
        })
    }

    return(
        <Modal
            visible={visible}
            title='创建目录'
            onCancel={onCancel}
            okText='创建'
            cancelText='取消'
            width={500}
            style={{ top: 300 }}
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
                            label='目录名称'
                            required="required"
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Modal>
    )
}

export default CreateOrUpdateCategory