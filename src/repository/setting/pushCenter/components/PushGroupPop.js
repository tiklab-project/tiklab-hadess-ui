/**
 * @name: PushGroupPop
 * @author: limingliang
 * @date: 2024-01-24 10:30
 * @description：推送组弹窗
 * @update: 2024-01-24 10:30
 */
import React,{useState,useEffect} from 'react';
import Modals from "../../../../common/modal/Modal";
import Btn from "../../../../common/btn/Btn";
import {Form, Input, Select} from "antd";

const PushGroupPop = (props) => {
    const [form] = Form.useForm()
  const {visible,setVisible,createPushGroup,updatePushGroup,repositoryId,pushGroup,setPushGroup}=props

    useEffect(  async () => {
       if (pushGroup){
           form.setFieldsValue({
                groupName:pushGroup.groupName
               })}
    }, [visible]);

    //关闭弹窗
    const cancel = () => {
        form.resetFields()
        setVisible(false)
        setPushGroup(null)
    }

    //确认
    const onOk = () => {
        form.validateFields().then(async values => {
            !pushGroup?
                createPushGroup({...values,repositoryId:repositoryId}).then(res=>{
                res.code===0&&cancel()
            }):
                updatePushGroup({...pushGroup,groupName:values.groupName}).then(res=>{
                    res.code===0&&cancel()
                })
        })
    }

    //弹窗foot
    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )

    return(
        <Modals
            visible={visible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={500}
            title={pushGroup?"编辑推送组":'添加推送组'}
        >
            <Form form={form}
                  layout='vertical'
                  autoComplete='off'>
                <Form.Item
                    label={'组名称'}
                    name={'groupName'}
                    rules={[{required:true,message:'组名称不能为空'}]}
                >
                    <Input  placeholder={"组名称"}  className='custom-input'/>
                </Form.Item>
            </Form>

        </Modals>
    )
}

export default PushGroupPop
