/**
 * @name: ScanPlayEditPop
 * @author: limingliang
 * @date: 2023-11-1 10:13
 * @description：编辑扫描方案弹窗
 * @update: 2023-11-1 10:13
 */
import React,{useState} from 'react';
import Modals from "../../../common/modal/Modal";
import {Form, Input, Select} from "antd";
const { TextArea } = Input;
import Btn from "../../../common/btn/Btn";
import {observer} from "mobx-react";
const languageList=["Java","JavaScript"]
const ScanSchemeEditPop = (props) => {
    const [form] = Form.useForm()
    const {editVisible,setEditVisible,createScanScheme}=props

    const [language,setLanguage]=useState('')


    //添加
    const onOk = () => {
        form.validateFields().then(async values => {
            createScanScheme({schemeName:values.schemeName,schemeType:"custom",language:language,describe:values.describe}).then(res=>{
                if (res.code===0){
                    cancel()
                }
            })
        })
    }

    //取消编辑弹窗
    const  cancel= () => {
        form.resetFields()
        setEditVisible(false)
    }

    //选择语言
    const choiceSanLanguage = (value) => {
        setLanguage(value)
    };


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
            title={"添加方案"}
        >
            <Form form={form}
                  layout='vertical'
                  autoComplete='off'>
                <Form.Item
                    label={'方案名称'}
                    name={'schemeName'}
                    rules={[{required:true,message:'方案名称不能为空'}]}
                >
                    <Input  placeholder={"方案名称"}/>
                </Form.Item>
                <Form.Item
                    label={'检测语言'}
                    name={'scanSchemeId'}
                    rules={[{required:true,message:'检测语言'}]}
                >
                    <Select   allowClear onChange={choiceSanLanguage} placeholder={"请选择语言"}>
                        {
                            languageList.map(item=>{
                                    return(
                                        <Select.Option key={item} value={item}>{item}</Select.Option>
                                    )
                                }
                            )
                        }
                    </Select>
                </Form.Item>
                 <Form.Item
                     label={'方案描述'}
                     name={'describe'}
                 >
                     <TextArea showCount maxLength={100}  placeholder="方案描述" />
                 </Form.Item>
            </Form>
        </Modals>
    )
}
export default observer(ScanSchemeEditPop)
