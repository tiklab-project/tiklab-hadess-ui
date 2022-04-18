import React, {useEffect, memo} from 'react';
import { useTranslation } from 'react-i18next';
import {Form, Modal, Input} from 'antd';
import {Axios} from 'doublekit-core-ui';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const RoleAdd = props => {

    const {t} = useTranslation();
    // urlType ： 'system' || 'project'   根据 这个字段判断使用哪个接口
    const {visible, cancel, editData={}, group='system', urlType='system', match} = props;
    if (!['system', 'project'].includes(urlType)) throw Error('use RoleAdd Component must have' +
        ' urlType props, value:\'system\'、 \'project\'')
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            desc:editData.desc,
        })
        form.setFieldsValue({
            name:editData.name,
        })
    }, [editData])

    // 确认事件
    const handleOk = () => {
        form.submit()
    }
    // 取消事件
    const handleCancel = () => {
        form.resetFields()
        cancel()
    }
    const onFinish = values => {
        let url = urlType === 'system' ? 'role/createRole':'prjRole/createPrjRole';
        let params = {...values, group}
        if (JSON.stringify(editData) !== "{}") {
            url = urlType === 'system' ?  'role/updateRole':'prjRole/updatePrjRole';
            params = {
                ...values,
                group,
                id: editData.id,
            }
        }
        Axios.post(url, params, match.params.tenant).then(res => {
            if (!res.code) handleCancel()
        })
    }
    return(
        <Modal
            title={ JSON.stringify(editData) !== "{}"? t('privilege-role.editRole') : t('privilege-role.addRole')}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            closable={false}
            forceRender
            destroyOnClose={true}
        >
            <Form {...layout} form={form} preserve={false} onFinish={onFinish}>
                <Form.Item label={t('privilege-role.roleName')} name="name" rules={[{ required: true, message: '用户名不能包含非法字符，如&,%，&，#……等' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label={t("privilege-desc")} name="desc">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default memo(RoleAdd)
