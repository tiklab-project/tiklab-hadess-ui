
/**
 * @name: CreateOrUpdateRepository
 * @author: limingliang
 * @date: 2022-01-20 14:30
 * @description：创建或修改文档空间弹窗
 * @update: 2022-01-20 14:30
 */
import React, {useEffect, useState} from "react";
import {Col, Row, Form, Modal, Input, Select} from 'antd';
const { Option } = Select;
import documentService from "../../service/document.service"
import {getUser} from "tiklab-core-ui";
const repositoryType=[{key:'teamwire',value:'teamwire项目管理'},{key:'postin',value:'postin接口测试'},{key:'teston',value:'teston自动化测试'},{key:'kanass',value:'kanass知识库'}
    ,{key:'matflow',value:'matflow流水线管理'},{key:'other',value:'其他'}]
const layout = {
    labelCol: { span: 4},
    wrapperCol: { span: 24},
};
const { TextArea } = Input;
const CompileRepository = props => {
    const [form] = Form.useForm();
    const [id,setId]=useState('')
    const {visible, onCancel,onok,editData,compileType} = props;

    useEffect(()=>{
        if (editData) {
            form.setFieldsValue({
                id: editData.id,
                name: editData.name,
                user:editData.id,
                type:editData.type,
                desc:editData.desc,

            })
            setId(editData.id)
        }

    }, [editData])

    //提交创建
    const handleOk=async ()=>{
        form.validateFields().then(async values => {
            const params={
                name:values.name, //订单价格
                desc:values.desc,
                type:values.type,
                master:getUser().userId
            }
            if (id){
                await update(params)
            }else {
                await documentService.createRepository(params)
            }
            onok()
        })
    }
    const update=async (params)=>{
        const param={
            ...params,
            id:id

        }
        await documentService.updateRepository(param)
        setId('')
    }
    return(
        <Modal
            visible={visible}
            title={compileType==='add'?'创建文档空间':'修改文档空间'}
            onCancel={onCancel}
            okText='创建'
            cancelText='取消'
            width={500}
            destroyOnClose={true}
            closable={false}
            onOk={handleOk}
        >
            <Row>
                <Col span={24}>
                    <Form
                        {...layout}
                        form={form}
                        preserve={false}
                        layout="vertical"
                    >
                        <Form.Item
                            name="name"
                            label='空间名称'
                            required="required"
                        >
                            <Input placeholder='请填写空间名称'/>
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label='空间类型'
                            required="required"
                        >
                            <Select  showArrow placeholder='请选择空间类型'>
                                {
                                    repositoryType.map(item=>{
                                        return (
                                            <Option  key={item.key} value={item.key}>
                                                {item.value}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="desc"
                            label='空间描述'
                        >
                            <TextArea showCount maxLength={200}  />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Modal>
    )
}

export default CompileRepository