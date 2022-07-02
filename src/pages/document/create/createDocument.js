/**
 * @name: CreateOrUpdateDocument
 * @author: limingliang
 * @date: 2022-01-20 14:30
 * @description：创建或修改文档
 * @update: 2022-01-20 14:30
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Input, Button, Table, Form,Upload,Modal } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import documentService from "../../../service/document.service"
import {getUser} from "../../../utils";
import CustomEditor from "../../../common/editSlate/editor";
import {withRouter} from "react-router";
import {DocumentEditor} from 'doublekit-slate-ui'
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 },
};

const CreateDocument = props => {
    const data=props.history.location.params
    const [form] = Form.useForm();
    const [details,setDetails]=useState(null)
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ]);
    useEffect(async ()=>{
        if(data){
            sessionStorage.setItem("data", JSON.stringify(data));
        }
        setDetails( JSON.parse(sessionStorage.getItem("data")))
    },[])
    const onFinish=async (value)=>{
        const contant = JSON.stringify(value.details)
        let param;
        if (details.repository){
             param={
                name:value.name,
                 repository:{
                    id: details.repository.id
                },
                details:contant,
                category:{
                    id:details.id
                }
            }
        }else {
             param={
                name:value.name,
                 repository:{
                    id: details.id
                },
                details:contant,
            }
        }
       const res=await  documentService.createDocument(param)
        if (res.code===0){
            props.history.push('/setting/document/details')
        }
    }


    return(
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-screen-xl m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item  href='#/setting/document/details'>目录详情</Breadcrumb.Item>
                    <Breadcrumb.Item href="">创建文档</Breadcrumb.Item>
                </Breadcrumb>
                <Form
                    {...layout}
                    onFinish={onFinish}
                    name="plugin-form"
                    form={form}
                    className='mt-6'
                >
                    <Form.Item name={'name'} label="文档名称" rules={[{ required: true }]}>
                        <Input  type="text"/>
                    </Form.Item>
                    <Form.Item  label="问题内容" name={['details']} initialValue={value} rules={[{ required: true }]}>
                        <CustomEditor/>
                    </Form.Item>
                    <Row>
                        <Col span={20} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                            <Button
                                style={{ margin: '0 8px' }}
                                onClick={() => {
                                    form.resetFields();
                                }}
                            >
                                重置
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </section>
    )
};

export default withRouter(CreateDocument)
