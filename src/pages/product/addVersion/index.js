 /**
 * @name: index
 * @author: mahai
 * @date: 2021-08-09 16:48
 * @description：版本添加
 * @update: 2021-08-09 16:48
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Input, Button, Table, Form,Upload,Modal } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import productService from "../../../service/product.service";
import {getUser} from "../../../utils";
import {withRouter} from "react-router";
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 },
};

 import {BASE_URL_DEV} from "../../../const";
const Version = props => {
    const [form] = Form.useForm();
    const param=props.history.location.params
    const [fileList, setFileList] = useState([]);

    const [fileName, setFileName] = useState(); //文件名字
    const [surfacePlot,SetSurfacePlot] =useState(); //封面图名字
    const [size,setSize]=useState(); //文件大小  字节

    useEffect(()=>{
        if (param) {
            form.setFieldsValue({
                productName: param.name,
            })
        }
    }, [param])

    //添加插件版本
    const onFinish =async (value) => {
        const params = {
            captureUrl:surfacePlot,
            version:value.version,
            productUrl:fileName,
            product:{
                id:param.id
            },
            size:(size/1048576).toFixed(2),  //将字节转为mb 并保留两位数,
            versionData:value.versionData
        }
        const response=  await productService.createProductVersion(params)
        if (response.code===0){
            props.history.push("/setting/product");
        }
    }

    //文件上传
    const uploadPros = {
        name: 'uploadFile',
        action: BASE_URL_DEV + '/dfs/upload',
        headers:{
            ticket:getUser().ticket
        },
        progress:{
            strokeWidth: 2,
            showInfo: false
        }
    }
    //文件上传
    const fileUpload={
        ...uploadPros,
        onChange(info) {
            setFileName(null)
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            fileList = fileList.map(file => {
                const size=file.originFileObj.size
                setSize(size)
                if (file.response) {
                    file.url = file.response.url;
                    setFileName(file.response.data.fileName)
                }
                return file;
            });
            setFileList(fileList)
        },
    }
    //图片上传
    const pictureUpload={
        ...uploadPros,
        onChange(info) {
            SetSurfacePlot(null)
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            fileList = fileList.map(file => {
                if (file.response) {
                    file.url = file.response.url;
                    SetSurfacePlot(file.response.data.fileName)
                }
                return file;
            });
        },
    }
    const pictureList=[
        {
            uid: '1',
            name: surfacePlot,
            status: 'done',
            url:`${BASE_URL_DEV}/image/${surfacePlot}`,
            thumbUrl:`${BASE_URL_DEV}/image/${surfacePlot}`
        }
    ]
    return (
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b  border-solid pb-4'>
                    <Breadcrumb.Item  href='#/setting/product'>产品列表 </Breadcrumb.Item>
                    <Breadcrumb.Item href=""> 版本添加</Breadcrumb.Item>
                </Breadcrumb>
                <Form
                    {...layout}
                    onFinish={onFinish}
                    name="nest-messages"
                    form={form}
                    className='mt-6'>
                    <Form.Item name={['productName']} label="关联项目" rules={[{ required: true }]}>
                        <Input
                            type="text"
                            disabled
                        />
                    </Form.Item>
                    <Form.Item name={['version']} label="版本" rules={[{ required: true }]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={['plugIn']} label="添加项目" rules={[{ required: true }]}>
                        {
                            fileName
                             ?<Upload {...fileUpload} fileList={fileList}>
                                </Upload>
                            : <Upload {...fileUpload} >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        }

                    </Form.Item>
                    <Form.Item name={['captureUrl']} label="项目截图">
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
                    <Form.Item name={['versionData']} label="版本描述" >
                        <Input/>
                    </Form.Item>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }} className={'pr-24'}>
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

export default withRouter(Version)
