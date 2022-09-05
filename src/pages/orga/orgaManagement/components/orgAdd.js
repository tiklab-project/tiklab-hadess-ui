/**
 * @name: orgAdd
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：组织中心添加系统组织
 * @update: 2021-05-06 15:19
 */

import React, {useEffect, memo} from 'react';
import {toJS} from "mobx";
import {useTranslation} from "react-i18next";
import { Modal, Form, Input, TreeSelect } from 'antd';
import {Axios} from 'tiklab-core-ui';
import './orgAdd.scss';



const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const AddOrg = props => {
    const {visible, cancelAddOrg, editData={}, isEdit=false, getAllTree, rawDataTree, match} = props;
    const [form] = Form.useForm();
    const {t}=useTranslation();

    useEffect(() => {
        if (isEdit) {
            form.setFieldsValue({
                parentOrga:editData.parentOrga.orgaId,
            })
            form.setFieldsValue({
                orgaName:editData.orgaName,
            })
        }
    }, [isEdit])

    // TODO 提交表单
    const handleOk = () => {
        form.submit()
    };

    // TODO 取消提交
    const handleCancel = () => {
        form.resetFields()
        cancelAddOrg()
    };


    // TODO 完成表单提交的接口
    const onFinish = values => {
        let url = 'orga/createOrga';
        let params = {
            orgaName: values.orgaName,
            parentOrga:{
                orgaId:values.parentOrga
            }
        }
        if (isEdit) {
            url = 'orga/updateOrga';
            params = {
                ...params,
                orgaId: editData.orgaId
            }
        }
        Axios.post(url, params, match.params.tenant).then(res => {
            if (!res.code) {
                getAllTree()
                form.resetFields()
                cancelAddOrg()
            }
        })
    };

    /**
     * 展示父节点和父节点挂载的数据
     * @returns {[]}
     */
    const parentNode = () => {
        let result =[]
        let loop = (data, result, disable= false) => {
            data.forEach(item => {
                let data = {}
                if (item.orgaId === editData.orgaId) {
                    data = {
                        title: item.orgaName,
                        value: item.orgaId,
                        disabled:true
                    }
                    result.push(data)
                    if (item.children && item.children.length > 0) {
                        return loop(item.children, data.children = [], data.disabled)
                    }
                } else {
                    data = {
                        title: item.orgaName,
                        value: item.orgaId,
                        disabled:disable
                    }
                    result.push(data)
                }
                if (item.children && item.children.length > 0) {
                    return loop(item.children, data.children = [], disable)
                }
            })
        }
        loop(toJS(rawDataTree), result)
        return result
    }

    return(
        <Modal
            title={isEdit? t('orga-common.edit')+t('orga-common.orga') : t('orga-common.add')+t('orga-common.orga') }
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            closable={false}
            destroyOnClose={true}
            preserve={false}
        >
            <Form
                {...layout}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    label={t('orga-label.orgaName')}
                    name="orgaName"
                    rules={[{ required: true, message: '用户名不能包含非法字符，如&,%，&，#……等' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={t('orga-label.parentOrg')}
                    name="parentOrga"
                    rules={[{ required: true, message: t('orga-label.parentOrgRequired') }]}
                >
                    <TreeSelect
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={parentNode()}
                        placeholder={t('orga-label.parentOrgPlaceholder')}
                        treeDefaultExpandedKeys={[rawDataTree.length > 0 && rawDataTree[0].orgaId]}
                    />
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default memo(AddOrg);
