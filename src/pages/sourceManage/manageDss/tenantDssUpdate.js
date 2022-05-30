
/**
 * @name: TenantDssUpdate
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
const TenantDssUpdate = props => {
    const [form] = Form.useForm();
    const {visible, onCancel, oldDssData,allDssData,tenantDssIds} = props;

    useEffect(async ()=>{
        if (oldDssData){
            form.setFieldsValue({
                oldDss:oldDssData.url,
            })
        }
    },[oldDssData])

    //修改单个dss路径
    const updateTenantDb = () => {
        form.validateFields().then(async values => {
            if (tenantDssIds.length){
                const param=new FormData();
                param.append('ids',tenantDssIds.join(','))
                param.append('dssId',values.url)
                const res=await tenantService.updateTenantDssByIds(param)
                if (res.code===0){
                    onCancel()
                }
            }else {
                const res=await tenantService.updateTenantDss({...oldDssData,tenantDssGroup:{id:values.url}})
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
                            name="oldDss"
                            label='原dss数据源'
                        >
                            <Input disabled="disabled"/>
                        </Form.Item>
                        <Form.Item
                            name="url"
                            label='dss数据源'
                            rules={[{required: true}]}
                        >
                            <Select  showArrow>
                                {
                                    allDssData.map(item=>{
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

export default TenantDssUpdate