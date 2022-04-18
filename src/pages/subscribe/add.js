/**
 * @name: add
 * @author: mahai
 * @date: 2021-07-28 16:39
 * @description：添加订阅服务
 * @update: 2021-07-28 16:39
 */
import React, {useEffect, memo} from 'react';
import { Modal, Form, Input, Select, Row, Col } from 'antd';



const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const AddSubscribe = props => {
    const {visible, onCancel, editData} = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (editData) {
            form.setFieldsValue({
                parentOrga:editData.parentOrga.orgaId,
            })
            form.setFieldsValue({
                orgaName:editData.orgaName,
            })
        }
    }, [editData])

    const handleOk = () => {

        onCancel()
    }
    return (
        <Modal
            title='订阅服务'
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            okText='保存'
            cancelText='取消'
            width={600}
            destroyOnClose={true}
            closable={false}
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
                            label='服务类型'
                        >
                            <Select defaultValue="project">
                                <Select.Option value="project">项目管理</Select.Option>
                                <Select.Option value="api">接口管理</Select.Option>
                                <Select.Option value="monitor">监控管理</Select.Option>
                                <Select.Option value="log">日志平台</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="domainUrl"
                            label='订阅时长'
                        >
                            <Select defaultValue="1">
                                <Select.Option value="1">1年</Select.Option>
                                <Select.Option value="2">2年</Select.Option>
                                <Select.Option value="3">3年</Select.Option>
                                <Select.Option value="4">4年</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="desc"
                            label='描述'
                        >
                            <Input placeholder="输入描述"/>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Modal>
    )
};

export default AddSubscribe
