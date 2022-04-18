/**
 * @name: addMessageTemplate
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：添加消息模板
 * @update: 2021-05-06 15:19
 */

import React,{useEffect, useState} from 'react';
import {Col, Row, Modal, Input, Form, Select} from "antd";
import {useTranslation} from "react-i18next";
import {Axios} from 'doublekit-core-ui';

const {TextArea} = Input;
const {Option} = Select;
const layout = {
    labelCol: { span: 4},
    wrapperCol: { span: 20},
};

const AddMessageTemplate = props => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const {visible, onCancel, editdata,match} = props;
    const [messageServiceData, setMessageService] = useState([]);
    const [messageSendData, setMessageSend] = useState([])
    const [configShow, setConfigShow] = useState(true);

    useEffect(() => {
        if (editdata) {
            setConfigShow(editdata.contentConfigType === 1)
            if (editdata.contentConfigType === 1) {
                form.setFieldsValue({
                    name: editdata.name,
                    id: editdata.id,
                    title: editdata.title,
                    content: editdata.content,
                    msgType: editdata.msgType.id,
                    msgSendType: editdata.msgSendType.id,
                    contentConfigType: editdata.contentConfigType,
                    link: editdata.link,
                })
            } else {
                form.setFieldsValue({
                    name: editdata.name,
                    id: editdata.id,
                    title: editdata.title,
                    contentUrl: editdata.contentUrl,
                    msgType: editdata.msgType.id,
                    msgSendType: editdata.msgSendType.id,
                    link: editdata.link,
                    contentConfigType: editdata.contentConfigType
                })
            }
        }
    }, [editdata]);

    useEffect(() => {
        getMessageService();
        getMessageSendType()
    }, []);

    // TODO 获取消息发送方式
    const getMessageSendType = () => {
        const params = {
            pageParam: {
                pageSize: 999999,
                currentPage: 1,
            }
        }
        Axios.post('/messageSendType/findMessageSendTypeList', params, match.params.tenant).then(res => {
            if (!res.code) {
                setMessageSend(res.data)
            }
        })
    }

    // TODO 获取业务类型的数据
    const getMessageService = () => {
        const params = {
            pageParam: {
                pageSize: 999999,
                currentPage: 1,
            }
        }
        Axios.post('/messageType/findMessageTypeList', params, match.params.tenant).then(res => {
            if (!res.code) {
                setMessageService(res.data)
            }
        })
    }
    // TODO 关闭当前的对话框
    const handleCancel = () => {
        setConfigShow(false)
        onCancel()
    };
    const handleOk = () => {
        let url = '/messageTemplate/createMessageTemplate'
        form.validateFields().then(values => {
            let params = {
                name: values.name,
                msgType: {
                    id: values.msgType
                },
                title:values.title,
                msgSendType:{
                    id: values.msgSendType
                },
                contentConfigType:values.contentConfigType,
                link : values.link
            }
            params.content = values.content;
            // if (values.contentConfigType === 1) {
            //     params.content = values.content;
            // } else {
            //     params.contentUrl = values.contentUrl;
            // }

            if (editdata) {
                url = '/messageTemplate/updateMessageTemplate';
                params.id = editdata.id;
            }
            Axios.post( url, params, match.params.tenant).then(res => {
                if (!res.code) {
                    handleCancel()
                }
            })
        })
    }


    const handelDisabledConfigType = value => {
        const index = messageSendData.findIndex(item => item.id === value);
        const code = messageSendData[index].code;
        // if (code === 'SMS') {
        //     setConfigShow(true)
        //     form.setFieldsValue({
        //         contentConfigType: 1,
        //     })
        // } else {
        //     setConfigShow(false)
        //     form.setFieldsValue({
        //         contentConfigType: 2,
        //     })
        // }
    }
    return(
        <Modal
            visible={visible}
            closable={false}
            title={t(!editdata ? "message-template-addtemplate" : 'message-template-edittemplate')}
            destroyOnClose={true}
            okText={t("message-save")}
            cancelText={t("message-table-cancel")}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
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
                            label={t("message-template-modal-name")}
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
                            name="id"
                            label={t("message-template-modal-ID")}
                        >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item
                            name="msgType"
                            label={t("message-template-modal-messagetype")}
                            rules={
                                [
                                    {
                                        required: true,
                                        message: `${t("message-template-modal-messagetype")} 必填`
                                    }
                                ]
                            }
                        >
                            <Select>
                                {
                                    messageServiceData.map(item => {
                                        return <Option value={item.id} key={item.id}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="msgSendType"
                            label={t("message-send-type")}
                            rules={
                                [
                                    {
                                        required: true,
                                        message: `${t("message-send-type")} 必填`
                                    }
                                ]
                            }
                        >
                            <Select onSelect={handelDisabledConfigType}>
                                {
                                    messageSendData.map(item => {
                                        return <Option value={item.id} key={item.id}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="title"
                            label={t("message-template-modal-title")}
                            rules={
                                [
                                    {
                                        required: true,
                                        message: `${t("message-template-modal-title")} 必填`
                                    }
                                ]
                            }
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="contentConfigType"
                            label={t("message-template-config")}
                            initialValue={1}
                            rules={
                                [
                                    {
                                        required: true,
                                        message: `${t("message-send-type")} 必填`
                                    }
                                ]
                            }
                        >
                            <Select disabled={true}>
                                <Option value={1}>文本</Option>
                                <Option value={2}>模板路径或对象</Option>
                            </Select>
                        </Form.Item>
                        {
                            // configShow &&
                            <Form.Item
                                name="content"
                                label={t("message-template-modal-content")}
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: `${t("message-template-modal-content")} 必填`
                                        }
                                    ]
                                }
                            >

                                <TextArea
                                    autoSize={{ minRows: 5, maxRows: 5 }}
                                />
                            </Form.Item>
                        }

                        <Form.Item
                            name="link"
                            label='消息链接'
                            rules={
                                [
                                    {
                                        required: true,
                                        message: `消息链接必填`
                                    }
                                ]
                            }
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Modal>
    )
}

export default AddMessageTemplate
