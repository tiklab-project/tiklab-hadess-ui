/**
 * @name: networkProxy
 * @author: limingliang
 * @date: 2025-03-27 14:30
 * @description：网络代理地址编辑
 * @update: 2025-03-27 14:30
 */
import React, {useEffect,useState} from "react";
import {Form, Modal, Input, Select} from 'antd';
import Modals from "../../../common/modal/Modal";
import Btn from "../../../common/btn/Btn";
import NetworkProxyStore from "../store/NetworkProxyStore";
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 25},
};

const NetworkProxyEdit = (props) => {
    const [form] = Form.useForm();
    const {createNetworkProxy,updateNetworkProxy}=NetworkProxyStore
    const {visible,setVisible,compileType,proxy,setProxy}=props


    useEffect(()=>{
        if (proxy){
            form.setFieldsValue({
                address:proxy.address,
                port:proxy.port,
                describe:proxy.describe
            })
        }
    },[proxy,visible])

    /**
     * 提交编辑后的代理信息
     */
    const handleOk =async () => {
        form.validateFields().then(async values => {
            if (proxy){
                updateNetworkProxy({...proxy,address:values.address,port:values.port,description:values.description}).then(res=>{
                    res.code===0&&closePop()
                })
            }else {
                createNetworkProxy({...values}).then(res=>{
                    res.code===0&&closePop()
                })
            }
        })
    }

    //关闭弹窗
    const closePop = () => {
        form.resetFields()
        setProxy(null)
        setVisible(false)
    }



    const modalFooter = (
        <>
            <Btn onClick={closePop} title={'取消'} isMar={true}/>
            <Btn onClick={handleOk} title={'确定'} type={'primary'}/>
        </>
    )
    return(
        <Modals
            visible={visible}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={500}
            title={compileType==='add'?'添加地址':'修改地址'}
        >
            <Form
                {...layout}
                form={form}
                preserve={false}
                layout="vertical"
            >

                <Form.Item
                    name="address"
                    label='代理地址'
                    rules={[{required: true, message: '地址必填'}]}
                >
                    <Input placeholder='格式：127.0.0.1'/>
                </Form.Item>
                <Form.Item
                    name="port"
                    label='端口'
                    rules={[{required: true, message: '端口必填'},
                        ({getFieldValue}) => ({
                            validator(rule,value) {
                                if (value&&!/^[1-9]\d*$/.test(value)) {
                                    return Promise.reject('请输入正整数')
                                }
                                return Promise.resolve()
                            }
                        })
                    ]}
                >
                    <Input placeholder='请输入端口'/>
                </Form.Item>
                <Form.Item
                    name="description"
                    label='描述'
                >
                    <Input placeholder='请输入描述'/>
                </Form.Item>
            </Form>
        </Modals>
    )
}
export default NetworkProxyEdit
