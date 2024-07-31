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
import {Form, Input, message, Select,} from 'antd';
import {inject, observer} from "mobx-react";
import ScanSchemeStore from "../../../setting/scan/store/ScanSchemeStore";
import {withRouter} from "react-router";
const ScanPlayEditPop = (props) => {
    const {repositoryStore} = props;
    const [form] = Form.useForm()
    const {editVisible,setEditVisible,createScanPlay,repositoryId,scanPlay,setScanPlay,updateScanPlay}=props
    const {findRepository}=repositoryStore
    const {findAllScanScheme}=ScanSchemeStore

    const [scanSchemeList,setScanSchemeList]=useState([])
    const [scanScheme,setScanScheme]=useState()

    useEffect(()=>{
        if (scanPlay){
            form.setFieldsValue({
                playName:scanPlay?.playName,
                scanSchemeId:scanPlay?.scanScheme?.id
            })
        }
        findAllScanScheme().then(res=>{
            setScanSchemeList(res.data)
        })

    },[scanPlay,editVisible])




    //取消编辑弹窗
    const  cancel= () => {
        form.resetFields()
        setScanPlay('')
        setEditVisible(false)
    }

    //添加
    const onOk = (value) => {
        form.validateFields().then(async values => {
            if (!scanPlay){
                createScanPlay({playName:values.playName,repository:{id:repositoryId},
                    scanScheme:{id:scanScheme}
                }).then(res=>{
                    res.code===0&&cancel()
                })
            }else {
                updateScanPlay({...scanPlay,playName:values.playName}).then(res=>{
                    res.code===0&&cancel()
                })
            }
        })
    }
    //选择扫描方案
    const choiceScheme = (value) => {
        setScanScheme(value)
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
                <Form.Item
                    label={'扫描方案'}
                    name={'scanSchemeId'}
                    rules={[{required:true,message:'扫描方案不能为空'}]}
                >
                    <Select     allowClear onChange={choiceScheme} placeholder={"请选择"}>
                        {
                            scanSchemeList.length&&scanSchemeList.map(item=>{
                                    return(
                                        <Select.Option key={item.schemeName} value={item.id}>{item.schemeName}</Select.Option>
                                    )
                                }
                            )
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modals>
    )
}
export default withRouter(inject('repositoryStore')(observer(ScanPlayEditPop)))
