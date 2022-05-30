/**
 * @name: TenantDbUpdate
 * @author: limingliang
 * @date: 2022-05-16 14:30
 * @description：租户的数据源切换
 * @update: 2022-05-16 14:30
 */
import React, {useState,useEffect} from "react";
import {Col, Form, Input, Modal, Row, Select} from "antd";
import tenantService from "../../../service/tenant.service";
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 18},
};
const { Option } = Select;
const TenantDbUpdate = props => {
    const [form] = Form.useForm();
    const {visible, onCancel, oldDatabase,allDatabase,tenantIds} = props;
    useEffect(async ()=>{
        if (oldDatabase){
            form.setFieldsValue({
                oldDb:oldDatabase.url,
            })
        }
    },[oldDatabase])
    //修改单个db路径
    const updateTenantDb = () => {
        form.validateFields().then(async values => {
            if (tenantIds.length){
                const param=new FormData();
                param.append('ids',tenantIds.join(','))
                param.append('dbId',values.url)
                 const res=await tenantService.updateTenantDatabaseByIds(param)
                 if (res.code===0){
                     onCancel()
                 }
            }else {
                const res=await tenantService.updateTenantDatabase({...oldDatabase,tenantDbGroup:{id:values.url}})
                if (res.code===0){
                    onCancel()
                }
            }

        })
    }
    return(
        <Modal
            visible={visible}
            title='切换租户db数据源'
            okText='切换'
            cancelText='取消'
            width={500}
            destroyOnClose={true}
            onOk={updateTenantDb}
            style={{ top: 250 }}
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
                            name="oldDb"
                            label='原db数据源'
                        >
                            <Input disabled="disabled"/>
                        </Form.Item>
                        <Form.Item
                            name="url"
                            label='bd数据源'
                            rules={[{required: true}]}
                        >
                            <Select  showArrow>
                                {
                                    allDatabase.map(item=>{
                                        return (
                                            <Option  key={item.id} value={item.id}>
                                                {item.url}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>

            </Row>
        </Modal>
    )

}

export default TenantDbUpdate