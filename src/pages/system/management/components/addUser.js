/**
 * @name: addUser
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：添加用户
 * @update: 2021-05-06 15:19
 */

import React, {useEffect, useState} from 'react';
import {Col, Row, Modal, Input, Form,Select} from "antd";
import {useTranslation} from "react-i18next";
import { v4 as uuidv4 } from 'uuid';
import {Axios} from 'doublekit-core-ui';

const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 18},
};

const { Option } = Select;


const AddUser = props => {
    const {match} = props;
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const {visible, onCancel} = props;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const params = {
            pageParam: {
                pageSize: 1,
                currentPage: 9999,
            }
        }
        getAllUserList(params)
    }, [])

    // TODO 获取接收人
    const getAllUserList = (params) => {
        Axios.post('/user/findUserList', params, match.params.tenant).then(res => {
            if (!res.code) {
                setUsers(res.data)
            }
        })
    }
    const handleCancel = () => {
        onCancel()
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            let params = {}
            if(values.receiver >=0) {
                params.receiverName = users[values.receiver].name;
                params.receiver =  users[values.receiver].id;

            }
            params = {
                receiverContact: values.receiverContact,
                ...params,
                id:uuidv4()
            }
            onCancel(params)
        })

    }


    // TODO 自定义表单校验
    const validatorFunc = (rule, value , callback) => {
        const filed = 'receiverContact';
        const contact = form.getFieldValue(filed)
        if (contact) {
            callback()
        } else if (value >=0) {
            callback()
        } else {
            callback(`${t("message-management-detail-tab-table-title")}  和 ${t("message-phone")}必填一项`)
        }
        callback()
    }
    // TODO 自定义表单校验
    const validatorPhoneFunc = (rule, value , callback) => {
        const filed = 'receiver'
        const receiverValue = form.getFieldValue(filed);
        if (receiverValue>=0) {
            if (!(/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(value)) && value) {
                callback(`${t("message-phone")}格式不正确`)
            }
            callback()
        }else if (!(/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(value))) {
            callback(`${t("message-phone")}格式不正确`)
        } else if (receiverValue!== 0 && receiverValue && !value){
            callback(`${t("message-phone")} 和 ${t("message-management-detail-tab-table-title")}必填一项`)
        }
        callback()
    }

    return(
        <Modal
            visible={visible}
            closable={false}
            title={t("message-management-add-user")}
            destroyOnClose={true}
            okText={t("message-save")}
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
                            name="receiver"
                            label={t("message-management-detail-tab-table-title")}
                            dependencies={['receiverContact']}
                            rules={
                                [
                                    {
                                        validator: validatorFunc
                                    },
                                ]
                            }
                        >

                            <Select >
                                {
                                    users.map((item, index) => {
                                        return <Option value={index} key={item.id}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="receiverContact"
                            label={t("message-phone")}
                            dependencies={['receiver']}
                            rules={
                                [
                                    {
                                        validator: validatorPhoneFunc
                                    }
                                ]
                            }
                        >
                            <Input/>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Modal>
    )
}

export default AddUser
