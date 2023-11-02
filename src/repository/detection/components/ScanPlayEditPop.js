/**
 * @name: ScanPlayEditPop
 * @author: limingliang
 * @date: 2023-11-1 10:13
 * @description：编辑扫描计划弹窗
 * @update: 2023-11-1 10:13
 */
import React,{useState,useEffect} from 'react';
import Modals from "../../../common/modal/Modal";
import Btn from "../../../common/btn/Btn";
import {Form, Input,} from 'antd';
const ScanPlayEditPop = (props) => {
    const [form] = Form.useForm()
    const {editVisible,setEditVisible,createScanPlay,repositoryId,scanPlay,updateScanPlay}=props

    useEffect(()=>{
        if (scanPlay){
            form.setFieldsValue({
                playName:scanPlay?.playName,
            })
        }
    },[scanPlay])

    //取消编辑弹窗
    const  cancel= () => {
        form.resetFields()
        setEditVisible(false)
    }

    //添加
    const onOk = (value) => {
        form.validateFields().then(async values => {
            if (!scanPlay){
                createScanPlay({playName:values.playName,repository:{id:repositoryId}}).then(res=>{
                    res.code===0&&cancel()
                })
            }else {
                updateScanPlay({...scanPlay,playName:values.playName}).then(res=>{
                    res.code===0&&cancel()
                })
            }
        })
    }

    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )

    return(
        <Modals
            open={editVisible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={500}
            title={"添加计划"}
        >
            <Form form={form}
                  layout='vertical'
                  autoComplete='off'>
                <Form.Item
                    label={'计划名称'}
                    name={'playName'}
                    rules={[{required:true,message:'计划名称不能为空'}]}
                >
                    <Input  placeholder={"计划名称"}/>
                </Form.Item>
            </Form>
        </Modals>
    )
}
export default ScanPlayEditPop
