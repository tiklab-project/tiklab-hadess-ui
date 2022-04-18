/**
 * @name: addUser
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：组织中心 添加用户到系统用户模块
 * @update: 2021-05-06 15:19
 */
import React, {useEffect, memo} from 'react';
import { Modal, Form, Input, Select } from 'antd';
import {useTranslation} from "react-i18next";
import {Axios} from 'doublekit-core-ui';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const AddUser = props => {
    const {visible, onCancel, listParams, isEdit=false, data={}, getList, match} = props;
    const [form] = Form.useForm();

    const {t}=useTranslation();


    useEffect(() => {
        if (isEdit) {
            form.setFieldsValue({
                name:data.name,
            })
            form.setFieldsValue({
                phone:data.phone,
            })
            form.setFieldsValue({
                email:data.email,
            })
            form.setFieldsValue({
                userType:data.userType,
            })
        }

    }, [isEdit, data]);

    // TODO 表单提交
    const handleOk = () => {
        form.submit()
    };

    // TODO 取消表单提交
    const handleCancel = () => {
        form.resetFields()
        onCancel()
    };

    // TODO 完成表单数据提交到服务
    const onFinish = values => {
        let url = 'user/createUser';
        let params = values
        if (isEdit) {
            params = {
                ...values,
                id: data.id
            }
            url = 'user/updateUser';
        }
        Axios.post( url, params,  match.params.tenant).then(res => {
            if (!res.code) {
                getList(listParams)
                handleCancel()
            }
        })
    };


    return(
        <Modal
            title={t("orga-label.addUser")}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            closable={false}
            destroyOnClose={true}
        >
            <Form
                {...layout}
                form={form}
                onFinish={onFinish}
                preserve={false}
            >
                <Form.Item
                    label={t("orga-table.surname")}
                    name="name"
                    rules={[{ required: true, message: t("orga-table.nameRequired") }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("orga-table.phone")}
                    name="phone"
                    rules={[{ required: true, message: t("orga-table.phoneRequired") }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("orga-table.email")}
                    name="email"
                    rules={[{ required: true, message: t("orga-table.emailRequired") }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("orga-label.userType")}
                    name="userType"
                    rules={[{ required: true, message: t("orga-table.userTypeRequired") }]}
                >
                    <Select  >
                        <Select.Option key={'1'} value={1}>{t("orga-table.internal")}</Select.Option>
                        <Select.Option key={'2'} value={2}>{t("orga-table.thirdparty")}</Select.Option>
                    </Select>

                </Form.Item>
            </Form>
        </Modal>
    )
}
export default memo(AddUser)
