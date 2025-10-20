/**
 * @name: SystemIntEdit
 * @author: limingliang
 * @date: 2025-03-27 14:30
 * @description：网络代理地址编辑
 * @update: 2025-03-27 14:30
 */
import React, {useEffect,useState} from "react";
import {Form, Modal, Input, Select} from 'antd';
import Modals from "../../../../common/modal/Modal";
import Btn from "../../../../common/btn/Btn";
import ThirdPathStore from "../store/ThirdPathStore";
import message from "../../../../common/header/message";

const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 25},
};

const SystemIntEdit = (props) => {
    const [form] = Form.useForm();
    const {visible,setVisible,compileType,thirdPath,setProxy}=props

    const {createThirdPath,updateThirdPath}=ThirdPathStore

    const [type,setType]=useState("nexus")

    useEffect(()=>{
        if (thirdPath){
            form.setFieldsValue({
                address: thirdPath.address,
                account:thirdPath.account,
                password:thirdPath.password
            })
        }else {
            form.resetFields()
        }
    },[thirdPath,visible])

    /**
     * 提交编辑后的代理信息
     */
    const handleOk =async () => {
        form.validateFields().then(async values => {
            let data
            if (thirdPath){
                data=await updateThirdPath({...thirdPath,
                    address:values.address,
                    account:values.account,
                    password:values.password
                })
            }else {
                data=await createThirdPath({...values,type:type,name:type})
            }

            if (data.code===0){
                setVisible(false)
            }else {
                message.error(data.msg,1)
            }
        })
    }



    const changeType = (value) => {
        setType(value)
    }


    //关闭弹窗
    const closePop = () => {
        form.resetFields()
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
            onCancel={closePop}
            footer={modalFooter}
            destroyOnClose={true}
            width={500}
            title={compileType==='add'?'添加':'修改'}
        >
            <Form
                {...layout}
                form={form}
                preserve={false}
                layout="vertical"
            >

                <Form.Item
                    name="address"
                    label='地址'
                    rules={[{required: true, message: '地址必填'}]}
                >
                    <Input placeholder='请输入地址'/>
                </Form.Item>
                <Form.Item
                    name="account"
                    label='账号'
                >
                    <Input placeholder='请输入账号'/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label='密码'
                >
                    <Input placeholder='请输入密码'/>
                </Form.Item>
            </Form>
        </Modals>
    )
}
export default SystemIntEdit
