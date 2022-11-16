/**
 * @name: DssAddOrUpdate
 * @author: limingliang
 * @date: 2022-05-16 14:30
 * @description：添加或者修改
 * @update: 2022-05-16 14:30
 */

import React, {useEffect, useState} from "react";
import {Col, Form, Input, Modal, Row,Select} from "antd";
import tenantService from "../../../service/tenant.service";
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 18},
};
const { Option } = Select;
const typeList=[{key:'dfs',value:'dfs'},{key:'dcs',value:'dcs'},{key:'dss',value:'dss'}]
const DssAddOrUpdate = props => {
    const [form] = Form.useForm();
    const {visible, onCancel, editData} = props;

    const [type,setType]=useState(null)   //产品类型
    useEffect(()=>{
        if (editData) {
            form.setFieldsValue({
                url: editData.url,
                details:editData.details,
                dsType:editData.dsType
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
    const selectType = (e) => {
        setType(e)
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
                    >
                        <Form.Item
                            name="url"
                            label='url地址'
                            rules={[{required: true}]}
                        >
                            <Input   placeholder="例如：192.10.1.10:3306"/>
                        </Form.Item>
                        <Form.Item
                            name="dsType"
                            label='类型'
                            rules={[{required: true}]}
                        >
                            <Select showArrow onChange={selectType}>
                                {
                                    typeList.map(item=>{
                                        return(
                                            <Option key={item.key} value={item.key}>
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
                            <Input/>
                        </Form.Item>
                    </Form>
                </Col>

            </Row>
        </Modal>
    )
}
export default DssAddOrUpdate