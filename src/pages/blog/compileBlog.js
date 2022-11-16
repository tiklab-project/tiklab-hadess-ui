/**
 * @name: addBlog
 * @author: limingliang
 * @date: 2021-09-16 13:46
 * @description：添加或修改博客
 * @update: 2021-09-16 13:46
 */
import {inject, observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Col, Form, Input, message, Row, Select, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import CustomEditor from "../../common/editSlate/editor";
import {getUser} from "tiklab-core-ui";
import blogService from "../../service/blog.service";
import {DFS_URL} from "../../const";
import './blog.scss'
const { Option } = Select;
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 24 },
};
const CompileBlog = props => {
    const [form] = Form.useForm();
    const {match:{params}} = props;

    const [blogData,setBlogData]=useState('');   //当为修改时候  会把要修改的博客id传过来
    const [surfacePlot, setSurfacePlot]=useState(); //封面图片地址


    const [value] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ]);
    useEffect( async ()=>{
       await findBlogById(params.id)
    },[])

    //通过id查询博客 (适用于修改)
    const findBlogById=async (plugId)=>{
        const param=new FormData();
        param.append('id',plugId)
        const res=await blogService.findBlogById(param)
        if (res.code===0){
            setBlogData(res.data)
            const types=res.data.type.split(",")
            form.setFieldsValue({
                title: res.data.name,
                type: types,
                digest: res.data.digest,
                details: JSON.parse(res.data.details),
            })
            setSurfacePlot(res.data.surfacePlot)
        }
    }

    //创建(修改)博客
    const onFinish =async (value) => {
        const details = JSON.stringify(value.details)
        const param = {
            name: value.title,
            type: value.type.toString(),
            digest:value.digest,
            member:{
                id:getUser().userId
            },
            surfacePlot:surfacePlot,
            details: details

        }
        if (blogData){
            await updateBlog(param)
        }else {
            await createBlog(param)
        }
    }
    //修改博客
    const updateBlog=async (param)=>{
        const params = {
            ...param,
            id: blogData.id,
            status: blogData.status,
        }
        const res = await blogService.updateBlogs(params)
        if (res.code === 0) {
            props.history.push('/index/blogList',)
        }
    }
    //创建博客
    const createBlog=async (param)=>{
        const params ={
            ...param,
            status:'drafts',  //创建默认放入草稿
        }
        const res=await blogService.createBlogs(params)
        if (res.code===0){
            props.history.push('/index/blogList',)
        }
    }


    const uploadPros = {
        name: 'uploadFile',
        action: DFS_URL + '/dfs/upload',
        headers:{
            ticket:getUser().ticket
        },
        progress:{
            strokeWidth: 2,
            showInfo: false
        }
    }
    //图片上传
    const pictureUpload={
        ...uploadPros,
        onChange(info) {
            setSurfacePlot(null)
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            fileList = fileList.map(file => {
                if (file.response) {
                    file.url = file.response.url;
                    setSurfacePlot(file.response.data.fileName)
                }
                return file;
            });
        },
    }
    const pictureList=[
    ]

    const goBlogList = async () => {
        props.history.push('/index/blogList')
    }
    return(
        <div className='blog'>
            <Breadcrumb separator="/"  className='blog-title'>
                <Breadcrumb.Item  onClick={goBlogList} className={'cursor-pointer'}>博客列表</Breadcrumb.Item>
                {blogData && blogData.name ?
                    <Breadcrumb.Item>
                        修改博客
                    </Breadcrumb.Item>
                    : <Breadcrumb.Item>
                        创建博客
                    </Breadcrumb.Item>
                }
            </Breadcrumb>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                form={form}
                className='mt-6'
                layout="vertical"
            >
                <Form.Item name={['title']} label="博客标题" rules={[{ required: true }]}>
                    <Input
                        name='name'
                        type="text"
                    />
                </Form.Item>
                <Form.Item name={['type']} label="博客分类" rules={[{ required: true }]}>
                    <Select
                        mode="multiple"
                        showArrow
                        ticketSeparators={[',']}
                    >
                        <Option key='import'>新闻急速</Option>
                        <Option key='proUpdate'>产品动态</Option>
                        <Option key='useSkill'>使用技巧</Option>
                        <Option key='share'>技术分享</Option>
                        <Option key='other'>其他</Option>
                    </Select>
                </Form.Item>
                <Form.Item name={['digest']} label="摘要信息" rules={[{ required: true }]}>
                    <Input
                        name='name'
                        type="text"
                    />
                </Form.Item>
                <Form.Item name={'captureUrl'} label="博客图片">
                    {
                        surfacePlot
                            ? <Upload {...pictureUpload} listType="picture" defaultFileList={[...pictureList]}
                                      className="upload-list-inline" maxCount='1'>
                            </Upload>
                            :  <Upload {...pictureUpload} listType="picture"
                                       className="upload-list-inline" maxCount='1'>
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                    }
                </Form.Item>
                <Form.Item  label="博客内容" name={['details']} initialValue={value} rules={[{ required: true }]}>
                    <CustomEditor/>
                </Form.Item>
                <Row>
                    <Col span={24} style={{ textAlign: 'left' }}>
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

export default CompileBlog
