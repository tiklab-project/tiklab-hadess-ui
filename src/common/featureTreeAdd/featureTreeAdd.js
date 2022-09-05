/**
 * @name: featureTreeAdd
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：权限中心 新增功能树
 * @update: 2021-05-06 15:19
 */
import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {Form, Modal, Input, TreeSelect} from 'antd';
import {Axios} from 'tiklab-core-ui';


const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const AddTree = props => {
    const {visible, cancelAdd, editData={}, parentId='', urlType='system', match} = props;
    const [form] = Form.useForm();
    const {t} = useTranslation();

    const [parentNodeData, setParentNodeData] = useState([])
    useEffect(() => {
        if (visible) {
            getNodeFirst()
        }
    }, [visible])

    useEffect(() => {
        if (JSON.stringify(editData) !== '{}') {
            form.setFieldsValue({
                code:editData.code,
            })
            form.setFieldsValue({
                name:editData.name,
            })

            form.setFieldsValue({
                parent:editData.parentFunction ? editData.parentFunction.id : editData.parentFunction
            })
        }
        if (parentId) {
            form.setFieldsValue({
                parent:parentId,
            })
        }
    }, [editData, parentId])
    // 获取节点的第一层
    const getNodeFirst = () => {
        const url = urlType === 'system' ? 'function/findFunctionListByParentId' : 'prjFunction/findPrjFunctionListByParentId'
        Axios.post(url, {}, match.params.tenant).then(res => {
            if (!res.code) setParentNodeData(res.data)
        })
    }
    const handleOk = () => {
        form.submit()
    }
    const handleCancel = () => {
        form.resetFields()
        cancelAdd()
    };

    const onFinish = values => {
        const createurl = urlType === 'system' ? 'function/createFunction': 'prjFunction/createPrjFunction'
        const updateurl = urlType === 'system' ? 'function/updateFunction': 'prjFunction/updatePrjFunction'

        if (JSON.stringify(editData) === "{}") {
            const params = {
                name: values.name,
                code:values.code,
                parentFunction:{
                    id: values.parent
                }
            }
            Axios.post(createurl, params, match.params.tenant).then(res => {
                if (!res.code) {
                    handleCancel()
                }
            })
        } else {
            const params = {
                id: editData.id,
                name: values.name,
                code:values.code,
                parentFunction:{
                    id: values.parent
                }
            }
            Axios.post(updateurl, params, match.params.tenant).then(res => {
                if (!res.code) {
                    handleCancel()
                }
            })
        }
    }

    /**
     * 处理父级下挂载的子集
     * @returns {[]}
     */
    const parentNode = () => {
        let result =[]
        let loop = (data, result, disable= false) => {
            data.forEach(item => {
                let data = {}
                if (item.id === editData.id) {
                    data = {
                        title: item.name,
                        value: item.id,
                        disabled:true
                    }
                    result.push(data)
                    if (item.children && item.children.length > 0) {
                        return loop(item.children, data.children = [], data.disabled)
                    }
                } else {
                    data = {
                        title: item.name,
                        value: item.id,
                        disabled:disable
                    }
                    result.push(data)
                }
                if (item.children && item.children.length > 0) {
                    return loop(item.children, data.children = [], disable)
                }
            })
        }
        loop(parentNodeData, result)
        return result
    }
    return(
        <Modal
            title={ JSON.stringify(editData) !== "{}"? t('privilege-edit-feature') : t('privilege-add-feature')}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            closable={false}
            forceRender
            destroyOnClose={true}
        >
            <Form
                {...layout}
                form={form}
                onFinish={onFinish}
                preserve={false}
            >
                <Form.Item
                    label={t('privilege-feature-name')}
                    name="name"
                    rules={[{ required: true, message: '用户名不能包含非法字符，如&,%，&，#……等' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t('privilege-feature-code')}
                    name="code"
                    rules={[{ required: true, message: '用户名不能包含非法字符，如&,%，&，#……等' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t('privilege-point-node')}
                    name="parent"
                >
                    <TreeSelect
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={parentNode()}
                        placeholder={t('privilege-point-node-placeholder')}
                        disabled={parentId}
                        treeDefaultExpandedKeys={[parentNodeData.length > 0 && parentNodeData[0].id]}
                    />
                </Form.Item>

            </Form>
        </Modal>
    )
}


export default AddTree
