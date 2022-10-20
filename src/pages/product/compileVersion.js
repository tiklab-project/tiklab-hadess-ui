
/**
 * @name: CompileVersion
 * @author: limingliang
 * @date: 2021-08-09 16:48
 * @description：编辑版本  （添加或修改）
 * @update: 2021-08-09 16:48
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Input, Button, Table, Form, Upload, Modal, Select} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import productService from "../../service/product.service";
import {getUser} from "../../utils";
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 },
};
import {FTP_URl,DFS_URL} from "../../const";
import CustomEditor from "../../common/editSlate/editor";
const { Option } = Select;
const systemTypeList=[{key:'windows',value:'windows'},{key:'macOs',value:'macOs'},{key:'linux',value:'linux'}]
const CompileVersion = props=> {
    const [form] = Form.useForm();
    const param=props.history.location.params
    const [fileList, setFileList] = useState([]);

    const [productData,setProductData]=useState(null)  //产品详情
    const [fileName, setFileName] = useState(); //文件名字
    const [fileUrl, setFileUrl] = useState(); //文件地址
    const [surfacePlot,SetSurfacePlot] =useState(); //封面图名字
    const [size,setSize]=useState(); //文件大小  字节

    const [value] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ]);

    useEffect(()=>{
        if (param) {
           sessionStorage.setItem("param", JSON.stringify(param));
        }
        const product=JSON.parse(sessionStorage.getItem("param"));
        setProductData(product)
        form.setFieldsValue({
            productName: product?.name,
        })
    }, [param])

    //添加版本
    const onFinish =async (value) => {
        const params = {
            captureUrl:surfacePlot,
            version:value.version,

            product:{
                id:productData.id
            },
            code:productData.code,
            type:productData.type,
            des:value.desc,
            newFeature:value.newFeature&&JSON.stringify(value.newFeature),
        }
        const response=  await productService.createProductVersion(params)
        if (response.code===0){
            const productUrlParam={
                productUrl:fileUrl,
                productId:productData.id,
                productVersionId:response.data,
                name:fileName,
                systemType:value.systemType,
                size:(size/1048576).toFixed(2),  //将字节转为mb 并保留两位数,
            }

           await productService.createProductUrl(productUrlParam)

            props.history.push("/setting/productList");
        }
    }

    //文件上传
    const uploadPros = {
        name: "uploadFile",
        data:{type:"projectPage"},
        action: FTP_URl +'/uploadFile/ftpUpload',
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
                    setFileName(file.response.data.fileName)
                    setFileUrl(file.response.data.url)
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
            url:`${DFS_URL}/image/${surfacePlot}`,
            thumbUrl:`${DFS_URL}/image/${surfacePlot}`
        }
    ]

    const skip =async () => {
        props.history.push({
            pathname:"/setting/product",
        });
    }
    return (
        <section className='w-full flex flex-row ' >
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b  border-solid pb-4'>
                    <Breadcrumb.Item  href='#/setting/productList'>产品列表 </Breadcrumb.Item>
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
                    <Form.Item name={['systemType']} label="系统类型" rules={[{ required: true }]}>
                        <Select showArrow >
                            {
                                systemTypeList.map(item=>{
                                    return(
                                        <Option key={item.key} value={item.key}>
                                            {item.value}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
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
                                    <Button zicon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                        }

                    </Form.Item>
                    {/*<Form.Item name={['captureUrl']} label="项目封面">
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
                    </Form.Item>*/}
                  {/*  <Form.Item name={['newFeature']} label="功能简介"  initialValue={value}>
                        <CustomEditor/>
                    </Form.Item>*/}
                    <Form.Item name={['desc']} label="版本描述" rules={[{ required: true }]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={['newFeature']} label="版本详情" initialValue={value} >
                        <CustomEditor/>
                    </Form.Item>
                   {/* <Form.Item name={['updateFeature']} label="修改功能" initialValue={value}>
                        <CustomEditor/>
                    </Form.Item>*/}
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }} className={'pr-24'}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                            <Button
                                style={{ margin: '0 8px' }}
                                /*onClick={() => {
                                    form.resetFields();
                                }}*/
                                onClick={skip}
                            >
                               取消
                            </Button>
                        </Col>
                    </Row>
                </Form>

            </div>

        </section>
    )
}

export default CompileVersion