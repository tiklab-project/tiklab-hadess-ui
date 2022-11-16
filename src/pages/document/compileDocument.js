/**
 * @name: CompileDocument
 * @author: limingliang
 * @date: 2022-01-20 14:30
 * @description：编辑文件   (创建或修改文档)
 * @update: 2022-01-20 14:30
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Input, Button, Table, Form, Upload, Modal, Select} from "antd";
import CustomEditor from "../../common/editSlate/editor";
import documentService from "../../service/document.service";
import './document.scss'
const { Option } = Select;
const layout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 20 },
};
const CompileDocument = (props) => {
    const data=props.history.location.params
    const [form] = Form.useForm();
    const [type,setType]=useState("document")
    const [allData,setAllData]=useState(null)   // 所有数据
    const [value] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ]);

    useEffect(async ()=>{
        if(data){
            sessionStorage.setItem("data", JSON.stringify(data));
        }
        setAllData( JSON.parse(sessionStorage.getItem("data")))
    },[])

    const onFinish = async (value) => {
        const  details = JSON.stringify(value.details)
        const param={
            name:value.name,
            repository:{
                id: allData.type==="document"||allData.type==="catalog"?allData.repository.id:allData.id
            },
            type:type,
            parentLevelId:allData.type==="document"||allData.type==="catalog"?allData.id:null,
            details:details&&details
        }
        const res=await  documentService.createDocument(param)
        if (res.code===0){
            props.history.push('/index/server/documentDetails')
        }
    }

    //切换类型
    const cuteType = (e) => {
        setType(e)
    }
    return(
        <div className='w-full mt-4 max-w-screen-xl m-auto document' id='tables'>
            <Breadcrumb separator="/" className=' document-title'>
                <Breadcrumb.Item  href='#/index/document/details'>文档列表</Breadcrumb.Item>
                <Breadcrumb.Item href="">创建文档</Breadcrumb.Item>
            </Breadcrumb>
            <Form
                {...layout}
                onFinish={onFinish}
                name="plugin-form"
                form={form}
                className='mt-6'
                layout="vertical"
            >
                <Form.Item name={'name'} label="名称" rules={[{ required: true }]}>
                    <Input  type="text"/>
                </Form.Item>
                <Form.Item name="code" label='类型'>
                    <Select  defaultValue="document" value={type} onChange={cuteType}>
                        <Option value="document">文档</Option>
                        <Option value='catalog'>目录</Option>
                    </Select>
                </Form.Item>

                <Form.Item  label="内容" name={['details']} initialValue={value} rules={[{ required: true }]}>
                    <CustomEditor/>
                </Form.Item>

                <Row>
                    <Col span={20} style={{ textAlign: 'left' }}>
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
    )
}
export default CompileDocument