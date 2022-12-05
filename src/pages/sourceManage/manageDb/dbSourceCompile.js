/**
 * @name: DbSourceList
 * @author: limingliang
 * @date: 2022-05-16 14:30
 * @description：添加或者修改
 * @update: 2022-05-16 14:30
 */
import React, {useEffect} from "react";
import {Col, Form, Input, Modal, Row, Select} from "antd";
const { Option } = Select;
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 24},
};
import tenantService from "../../../service/tenant.service"
const dbType=[{code:"eas",value:"eas"},{code:"homes",value:"homes"},{code:"more",value:"other"}]
const DbSourceCompile = props => {
    const [form] = Form.useForm();
    const {visible, onCancel, editData} = props;

    useEffect(()=>{
        if (editData) {
            form.setFieldsValue({
                url: editData.url,
                userName:editData.userName,
                password: editData.password,
                serialNumber:editData.serialNumber,
                details:editData.details,
            })
        }
    }, [editData])

    const addOrUpdate = async () => {
        form.validateFields().then(async values => {
            if (editData){
               const res=await tenantService.updateTenantDbGroup({...values,id:editData.id})
                if (res.code===0){
                    onCancel()
                }
            }else {
                const res=await tenantService.createTenantDbGroup({...values})
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
                        layout="vertical"
                    >
                        <Form.Item
                            name="url"
                            label='url地址'
                            rules={[{required: true}]}
                        >
                            <Input   placeholder="例如：192.10.1.10:3306"/>
                        </Form.Item>
                        <Form.Item
                            name="userName"
                            label='用户名'
                            rules={[{required: true}]}
                        >
                            <Input placeholder='请输入用户名'/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label='密码'
                            rules={[{required: true}]}
                        >
                            <Input placeholder='请输入密码'/>
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label='类型'
                            rules={[{required: true}]}
                        >
                            <Select showArrow  placeholder='请选择类型'>
                                {
                                    dbType.map(item=>{
                                        return(
                                            <Option key={item.code} value={item.code}>
                                                {item.value}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="details"
                            label='简介'
                        >
                            <Input placeholder='请输入简介'/>
                        </Form.Item>
                    </Form>
                </Col>

            </Row>
        </Modal>
    )
}
export default DbSourceCompile
