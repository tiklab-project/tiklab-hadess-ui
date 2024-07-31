/**
 * @name: HoleEdit
 * @author: limingliang
 * @date: 2023-11-08 14:30
 * @description：添加漏洞信息弹窗
 * @update: 2023-11-08 14:30
 */
import React,{useState,useEffect} from 'react';
import Modals from "../../../common/modal/Modal";
import {observer} from "mobx-react";
import {Form, Input, Select} from "antd";
import Btn from "../../../common/btn/Btn";
const { TextArea } = Input;
import "./HoleEditPop.scss"
const levelList=[{key:1,value:"严重"},{key:2,value:"高危"},{key:3,value:"中危"},{key:4,value:"低危"}]
const languageList=[{key:'Java',value:"Java"},{key:"Node",value:"Node.js"}]
const HoleEditPop = (props) => {
    const [form] = Form.useForm()
    const {editVisible,setEditVisible,createScanHole}=props



    //取消编辑弹窗
    const  cancel= () => {
        form.resetFields()
        setEditVisible(false)
    }
    //创建
    const onOk = () => {
        form.validateFields().then(async values => {
            createScanHole({...values}).then(res=>{
                res.code===0&&cancel()
            })
        })
    }

    /**
     * 跳转到上一级路由
     */
    const goBack = () => {
        props.history.go(-1)
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
            width={750}
            title={"添加规则"}
        >
            <Form form={form}
                  layout='vertical'
                  autoComplete='off'>
                <Form.Item
                    label={'漏洞名称'}
                    name={'holeName'}
                    rules={[{required:true,message:'漏洞名称不能为空'}]}
                >
                    <Input  placeholder={"漏洞名称"} className="nav-item-style"/>
                </Form.Item>
                <Form.Item
                    label={'漏洞编号'}
                    name={'holeNumber'}
                    rules={[{required:true,message:'漏洞编号不能为空'}]}
                >
                    <Input  placeholder={"漏洞编号"} className="nav-item-style"/>
                </Form.Item>
                <Form.Item
                    label={'漏洞等级'}
                    name={'holeLevel'}
                    rules={[{required:true,message:'漏洞等级不能为空'}]}
                >
                    <Select   allowClear  placeholder={"问题等级"} style={{width:500}}>
                        {
                            levelList.map(item=>{
                                    return(
                                        <Select.Option key={item.key} value={item.key}>{item.value}</Select.Option>
                                    )
                                }
                            )
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label={'语言'}
                    name={'language'}
                    rules={[{required:true,message:'语言不能为空'}]}
                >
                    <Select   allowClear  placeholder={"问题等级"} style={{width:500}}>
                        {
                            languageList.map(item=>{
                                    return(
                                        <Select.Option key={item.key} value={item.key}>{item.value}</Select.Option>
                                    )
                                }
                            )
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label={'产品名称'}
                    name={'product'}
                    rules={[{required:true,message:'产品名称不能为空'}]}
                >
                    <Input  placeholder={"产品名称"} className="nav-item-style"/>
                </Form.Item>
                <Form.Item
                    label={'vendor'}
                    name={'vendor'}
                >
                    <Input  placeholder={"vendor"} className="nav-item-style"/>
                </Form.Item>
                <Form.Item
                    label={'漏洞描述'}
                    name={'describe'}
                    rules={[{required:true,message:'漏洞描述不能为空'}]}
                >
                    <TextArea showCount maxLength={800}  placeholder="漏洞描述"   style={{
                        height: 100,
                        resize: 'none',
                    }}/>
                </Form.Item>
                <Form.Item
                    label={'修复建议'}
                    name={'suggestion'}
                    rules={[{required:true,message:'修复建议不能为空'}]}
                >
                    <TextArea showCount maxLength={800}  placeholder="修复建议"    style={{
                        height: 100,
                        resize: 'none',
                    }}/>
                </Form.Item>
            </Form>
        </Modals>
    )
}
export default observer(HoleEditPop)
