/**
 * @name: sendDetail
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：提交发送消息表单
 * @update: 2021-05-06 15:19
 */

import React, {useEffect, useState} from 'react';
import {Col, Row, Modal, Input, Table, Tabs, Button, Form, Space, Select} from "antd";
import {useTranslation} from "react-i18next";
import {Axios} from 'tiklab-core-ui';
import templateContent from '../../template-data.json'

import './SendMessage.scss'

const { Option } = Select;

const {TextArea} = Input;
const { TabPane } = Tabs;
const layout = {
    labelCol: { span: 2},
    wrapperCol: { span: 22},
};

const SendMessage = props => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const {visible, onCancel, onOpenUserModal, userTable, removeUser, match} = props;
    const columns = [
        {
            title: t('message-management-detail-tab-table-title'),
            dataIndex: 'receiverName',
            key: 'receiverName',
        },
        {
            title: t('message-management-detail-tab-table-phone'),
            dataIndex: 'receiverContact',
            key: 'receiverContact',
        },
        {
            title: t('message-table-action'),
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => onRemove(record.id)}>{t('message-delete')}</a>
                </Space>
            )
        },
    ];
    const [messageTemplate, setMessageTemplate] = useState([]);
    useEffect(() => {
        const params = {
            pageParam: {
                pageSize: 1,
                currentPage: 9999,
            }
        }
        getMessageTemplate(params)
    }, [])

    const handleCancel = () => {
        onCancel()
    };

    // TODO 获取消息模板数据
    const getMessageTemplate = params => {
        Axios.post('/messageTemplate/findMessageTemplateList', params, match.params.tenant).then(res => {
            if (!res.code) {
                setMessageTemplate(res.data)
            }
        })
    }

    // TODO 移除用户
    const onRemove = id => {
        removeUser(id)
    }

    const handleOk = () => {
        let url = '/message/sendMessage'

        form.validateFields().then(values => {
            let params = {
                ...values,
                messageTemplate: {
                    id: values.messageTemplate
                },
                messageReceiverList: userTable.map(item => {
                    let obj ={}
                    if (item.receiver) {
                        obj.receiver = {id:item.receiver}
                    }
                    if (item.receiverContact) {
                        obj.receiverContact = item.receiverContact
                    }
                    return obj
                })
            }
            Axios.post(url, params, match.params.tenant).then(res => {
                if (!res.code) {
                    handleCancel()
                }
            })
        })
    }

    // TODO 校验内容是不是json格式
    const isContentJson = (rule, value , callback) => {
        if (value) {
            try {
                if (typeof JSON.parse(value) == "object") {
                    callback()
                }
            } catch(e) {
                callback('数据统一用JSON格式定义')
            }
        }
        callback()
    }
    // TODO 选择消息模板
    const selectMessageTemplate = value => {
        const index = messageTemplate.findIndex(item => item.id === value);
        const type = messageTemplate[index].msgSendType.code;
        if (templateContent[type]) {
            const contentPlaceholder = templateContent[type];
            form.setFieldsValue({
                data: JSON.stringify(contentPlaceholder),
            })
        }
    }
    return(
        <Modal
            visible={visible}
            closable={false}
            destroyOnClose={true}
            title={t("message-send")}
            width={1200}
            okText={t("message-immediately-send")}
            cancelText={t("message-table-cancel")}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Row>
                <Col span={24}>
                    <Form
                        {...layout}
                        form={form}
                        preserve={false}
                    >
                        <Form.Item
                            name="messageTemplate"
                            label={t("message-template")}
                            rules={
                                [
                                    {
                                        required: true,
                                        message: `${t("message-template")} 必填`
                                    }
                                ]
                            }
                        >
                            <Select onSelect={selectMessageTemplate}>
                                {
                                    messageTemplate.map(item => {
                                        return <Option value={item.id} key={item.id}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="data"
                            label={t("message-modal-content")}
                            rules={
                                [
                                    {
                                        required: true,
                                        message: `${t("message-modal-content")} 必填`
                                    },
                                    {
                                        required: true,
                                        validator: isContentJson
                                    }
                                ]
                            }
                        >
                            <TextArea
                                autoSize={{ minRows: 5, maxRows: 5 }}
                                placeholder={'数据统一用JSON格式定义'}
                            />
                        </Form.Item>

                    </Form>


                </Col>
            </Row>
            <Row >
                <Col span={24} >
                    <div className="card-container">
                        <Tabs type="card">
                            <TabPane tab={t('message-management-detail-tab-table-title')} key="1">
                                <Row justify="space-between">
                                    <Col span={24} >
                                        <div style={{display:'flex', justifyContent: 'flex-end'}}>
                                            <Button onClick={onOpenUserModal} type="primary">+{t('message-management-add-user')}</Button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Table
                                            columns={columns}
                                            dataSource={userTable}

                                            rowKey={r => r.id}
                                            tableLayout="fixed"
                                        />
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </div>
                </Col>
            </Row>
        </Modal>
    )
};

export default SendMessage
