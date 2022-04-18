/**
 * @name: addMessageType
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：发送消息的类型
 * @update: 2021-05-06 15:19
 */

import React, {useEffect} from 'react';
import {Col, Row, Form, Modal, Input} from 'antd';
import {useTranslation} from "react-i18next";
import {Axios} from 'doublekit-core-ui';


const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 18},
};


const AddMessageType = props => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const {visible, onCancel, editdata,match} = props;
    useEffect(() => {
        if (editdata) {
            form.setFieldsValue({
                name: editdata.name,
                code: editdata.code,
                desc: editdata.desc,
            })
        }
    }, [editdata]);

    const handleCancel = () => {
        onCancel()
    };
    const handleOk = () => {
        let url = '/messageSendType/createMessageSendType'

        form.validateFields().then(values => {
            let params = {
                ...values
            }
            if (editdata) {
                url = '/messageSendType/updateMessageSendType';
                params.id = editdata.id;
            }
            Axios.post(url, params, match.params.tenant).then(res => {
                if (!res.code) {
                    handleCancel()
                }
            })
        })
    }
    return(
        <Modal
            visible={visible}
            closable={false}
            title={t(!editdata ? "message-type-addtype" : 'message-type-edittype')}
            destroyOnClose={true}
            okText={t("message-save")}
            cancelText={t("message-table-cancel")}
            onOk={handleOk}
            onCancel={handleCancel}
            width={600}
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
                            label={t("message-type-modal-name")}
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '字段类型名称不能包含非法字符，如&,%，&，#……等'
                                    }
                                ]
                            }
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            label={t("message-service-modal-code")}
                            rules={
                                [
                                    {
                                        required: true,
                                        message: `${t("message-service-modal-code")}必填`
                                    }
                                ]
                            }
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="desc"
                            label={t("message-type-modal-desc")}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Modal>
    )
}
export default AddMessageType
