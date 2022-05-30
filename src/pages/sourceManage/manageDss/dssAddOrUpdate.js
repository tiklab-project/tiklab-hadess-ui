/**
 * @name: DssAddOrUpdate
 * @author: limingliang
 * @date: 2022-05-16 14:30
 * @description：添加或者修改
 * @update: 2022-05-16 14:30
 */

import React, {useEffect} from "react";
import {Col, Form, Input, Modal, Row} from "antd";
import tenantService from "../../../service/tenant.service";
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 18},
};
const DssAddOrUpdate = props => {
    const [form] = Form.useForm();
    const {visible, onCancel, editData} = props;
    useEffect(()=>{
        if (editData) {
            form.setFieldsValue({
                url: editData.url,
                details:editData.details,
            })
        }
    }, [editData])


    const addOrUpdate = async () => {
        form.validateFields().then(async values => {
            if (editData){
                const res=await tenantService.updateTenantDssGroup({...values,id:editData.id})
                if (res.code===0){
                    onCancel()
                }
            }else {
                const res=await tenantService.createTenantDssGroup({...values})
                if (res.code===0){
                    onCancel()
                }
            }
        })
    }

    return(
        <Modal
            visible={visible}
            title='添加db数据源'
            okText='保存'
            cancelText='取消'
            width={500}
            style={{ top: 200 }}
            destroyOnClose={true}
            onOk={addOrUpdate}
            onCancel={onCancel}
        >
            <Row>
                <Col span={24}>
                    <Form
                        {...layout}
                        form={form}
                        preserve={false}
                    >
                        <Form.Item
                            name="url"
                            label='url地址'
                            rules={[{required: true}]}
                        >
                            <Input   placeholder="例如：192.10.1.10:3306"/>
                        </Form.Item>
                        <Form.Item
                            name="details"
                            label='简介'
                        >
                            <Input/>
                        </Form.Item>
                    </Form>
                </Col>

            </Row>
        </Modal>
    )
}
export default DssAddOrUpdate