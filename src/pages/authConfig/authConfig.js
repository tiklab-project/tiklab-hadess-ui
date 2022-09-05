/**
 * @name: authentication
 * @author: mahai
 * @date: 2021-06-23 09:37
 * @description：认证设置
 * @update: 2021-06-23 09:37
 */
import React, {useEffect, useState, useCallback} from 'react';
import {inject, observer} from 'mobx-react'
import {Col, Row, Form, Select, Input, Button, message} from "antd";
import {Axios} from 'tiklab-core-ui';
import {AUTH_CONFIG_STORE} from "./store/authConfigStore";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};

const SubLayout = {
    wrapperCol: { offset: 4, span: 18 },
};

const AuthConfig = props => {

    const {authConfigStore, match} = props;

    const { getFindAuthConfig } = authConfigStore
    const [visible, setVisible] = useState(false);
    const [config, setConfig] = useState({});
    const [form] = Form.useForm();

    // 获取认证配置
    useEffect(async () => {
        const config = await Axios.post('/authConfig/getAuthConfig', {}, match.params.tenant)
        if (config.code === 0) {
            if (config.data) {
                setConfig(config.data)
                form.setFieldsValue({
                    authType:config.data.authType,
                })
                if(config.data.authType === 'local') {
                    setVisible(true)
                } else {
                    setVisible(false)
                }
                if (config.data.authAccConfig) {
                    form.setFieldsValue({
                        accUrl:config.data.authAccConfig.accUrl,
                    })
                }
            }
        }
    }, [])
    const onSelectType =useCallback(value =>{
        if (value === 'acc') {
            setVisible(false)
        }
        if (value !== 'acc') {
            setVisible(true)
        }
    },[]);

    const onFinish = async (values) => {
        const id = config.id;
        let authAccConfig = null
        if (!id) {
            return message.error('没有id')
        }
        if(!visible) {
            const id = config.authAccConfig ? config.authAccConfig.id : null
            authAccConfig = {
                // accServerUrl: values.accServerUrl,
                accUrl: values.accUrl
            }
            if (id) {
                authAccConfig.id = id
            }
        }
        const formData = {
            id,
            authType: values.authType,
            authAccConfig
        }
        const result = await Axios.post('/authConfig/updateAuthConfig', formData, match.params.tenant)
        if (!result.code) {
            getFindAuthConfig(match.params.tenant)
            message.success('提交成功')
            // window.location.href = window.location.href
            setTimeout(() => {
                location.reload();
            }, 1000)

        } else {
            message.error('提交失败')
        }
        console.log(result);
    };

    const hhtpReg = /(http|https):\/\/([\w.]+\/?)\S*/
    return (
        <Row justify={'center'} style={{width:'100%'}}>
            <Col xl={{span:24}} xxl={{span:16}}>
                <div className='authentication'>
                    <div className='authentication-detail'>
                        <Form
                            {...layout}
                            form={form}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="authType"
                                label={'认证类型'}
                            >
                                <Select
                                    onChange={onSelectType}
                                >
                                    <Select.Option value="acc">账号中心</Select.Option>
                                    <Select.Option value="local">本地登录</Select.Option>
                                </Select>
                            </Form.Item>
                            {
                                !visible && <Form.Item
                                    name="accUrl"
                                    label={'账号中心地址'}
                                    rules={
                                        [
                                            { required: true, message: '请输入账号中心地址!' },
                                            { validator: (_, value, callback) => {
                                                    if (value){
                                                        const vaild = hhtpReg.test(value)
                                                        if (vaild) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error('地址开头是http htpps开头的!'));
                                                    }
                                                    callback()
                                                }
                                            }
                                        ]
                                    }
                                >
                                    <Input />
                                </Form.Item>
                            }
                            <Form.Item {...SubLayout}>
                                <Button type="primary" htmlType="submit">
                                    保存
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default inject(AUTH_CONFIG_STORE)(observer(AuthConfig))
