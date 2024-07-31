/**
 * @name: RemoteProxyEditPop
 * @author: limingliang
 * @date: 2023-01-19 10:30
 * @description：编辑代理信息
 * @update: 2023-01-19 10:30
 */
import React, {useEffect,useState} from "react";
import {Form, Modal, Input, Select} from 'antd';
import Modals from "../../../common/modal/Modal";
import Btn from "../../../common/btn/Btn";
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 25},
};

const RemoteAgencyEditPop = (props) => {
    const [form] = Form.useForm();
    const {editVisible,setEditVisible,compileType,remoteProxy,createRemoteProxy,updateRemoteProxy,setRemoteProxy}=props

    const [agencyType,setAgencyType]=useState("maven")

    useEffect(()=>{
        if (remoteProxy){
            form.setFieldsValue({
                agencyType:remoteProxy.agencyType,
                agencyUrl: remoteProxy.agencyUrl,
                agencyName:remoteProxy.agencyName,
                userName:remoteProxy.userName,
                password:remoteProxy.password,
            })
        }
    },[remoteProxy,editVisible])

    /**
     * 提交编辑后的代理信息
     */
    const handleOk =async () => {
        form.validateFields().then(async values => {
            if (remoteProxy){
                updateRemoteProxy({...remoteProxy,agencyType:values.agencyType,agencyName:values.agencyName,agencyUrl:values.agencyUrl}).then(res=>{
                    res.code===0&&closePop()
                })
            }else {
                createRemoteProxy({...values,agencyType:agencyType,type:1}).then(res=>{
                    res.code===0&&closePop()
                })
            }
        })
    }

    //关闭弹窗
    const closePop = () => {
        form.resetFields()
        setRemoteProxy(null)
        setEditVisible(false)
    }

    const selectAgencyType = (value) => {
      setAgencyType(value)
    }

    const modalFooter = (
        <>
            <Btn onClick={closePop} title={'取消'} isMar={true}/>
            <Btn onClick={handleOk} title={'确定'} type={'primary'}/>
        </>
    )
    return(
        <Modals
            open={editVisible}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={500}
            title={compileType==='add'?'添加来源':'修改来源'}
        >
            <Form
                {...layout}
                form={form}
                preserve={false}
                layout="vertical"
            >
                <Form.Item
                    name="agencyType"
                    label='代理类型'
                >
                    <Select
                        defaultValue="maven"
                        options={[
                            {value: 'maven', label: 'maven'},
                            {value: 'npm', label: 'npm'},
                            {value: 'docker', label: 'docker'},
                        ]}
                           onChange={selectAgencyType}
                    />
                </Form.Item>
                <Form.Item
                    name="agencyName"
                    label='代理来源'
                    rules={[{required: true, message: '名称必填'}]}
                >
                    <Input placeholder='请输入来源名称'/>
                </Form.Item>
                <Form.Item
                    name="agencyUrl"
                    label='代理地址'
                    rules={[{required: true, message: '地址必填'}]}
                >
                    <Input placeholder='请输入来源地址'/>
                </Form.Item>


                {/*<div className={"agency-verify-title"}>校验信息</div>
                <div className='agency-verify-text'>您可以通过设置用户信息取私有包</div>
                <Form.Item
                    name="userName"
                    label='账号'
                >
                    <Input placeholder='请输入账号'/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label='密码'
                >
                    <Input  placeholder='请输入密码' type={"text"}/>
                </Form.Item>*/}
            </Form>
        </Modals>
    )
}
export default RemoteAgencyEditPop
