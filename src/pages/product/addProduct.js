/**
 * @name: index
 * @author: mahai
 * @date: 2021-08-09 16:49
 * @description：添加产品
 * @update: 2021-08-09 16:49
 */
import React, {useEffect, useState} from "react";
import {Col, Row, Form, Modal, Input,Select,Upload, Button} from 'antd';
import {withRouter} from "react-router";
import productService from "../../service/product.service";
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 25},
};
import {DFS_URL, FTP_DOWNLOAD_URL, FTP_URl} from "../../const";
import {getUser} from "tiklab-core-ui";
const typeList=[{key:'saas',value:'线上saas版'},{key:'ce',value:'线下社区版'},{key:'ee',value:'线下企业版'}]
const AddProduct = props => {
    const [form] = Form.useForm();
    const [productType,setProductType]=useState([]);
    const {visible, onCancel, editData,compileType} = props;
    const [surfacePlot,setSurfacePlot]=useState('') //封面图
    const [type,setType]=useState(null)   //产品类型
    const [fileUrl, setFileUrl] = useState(); //文件地址


    useEffect(()=>{
        finAllProductType()
        if (editData) {
            form.setFieldsValue({
                name: editData.name,
                code:editData.code,
                type:editData.type,
                productUrl:editData.productUrl,
                price:editData.price,
                des:editData.des,
            })
            if (editData.icon){
                setFileUrl(editData.icon)
            }
            setType(editData.type)
        }
    }, [editData])

    const finAllProductType=async ()=>{
        const res=await productService.findAllProductTypeService();
        setProductType(res.data)

    }

    const handleOk =   () => {
        form.validateFields().then(async values => {
            if (editData) {
                const res = await productService.updateProductService({...values, member:{id:getUser().userId},icon:fileUrl, id: editData.id,productType:{id:values.productType}})
                if (!res.code) {
                    onCancel()
                }
            } else {
                const res = await productService.createProductService({...values,icon:fileUrl,member:{id:getUser().userId},productType:{id:values.productType}})
                if (!res.code) {
                    const person={
                        id:res.data,
                        name:values.name,
                        code:values.code,
                        type:values.type
                    }
                    //saas 不需要添加版本
                    if (values.type!=='saas'){
                        props.history.push({
                            pathname:"/setting/product/compileVersion",
                            params:person
                        });
                    }
                    onCancel()
                }
            }
        })
    };

    const uploadPros = {
        name: 'uploadFile',
        data:{type:"project"},
        action: FTP_URl + '/uploadFile/ftpUpload',
        headers:{
            ticket:getUser().ticket
        },
        progress:{
            strokeWidth: 2,
            showInfo: false
        }
    }

    //图片上传
    const fileUpload={
        ...uploadPros,
        onChange(info) {
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            fileList = fileList.map(file => {
                if (file.response) {
                    setSurfacePlot(file.response.data.fileName)
                    setFileUrl(file.response.data.url)
                }
                return file;
            });
        },
    }

    const fileList=[
        {
            uid: '-1',
            name: surfacePlot,
            status: 'done',
            url:`${FTP_DOWNLOAD_URL}/${fileUrl}`,
            thumbUrl:`${FTP_DOWNLOAD_URL}/${fileUrl}`
        }
    ]

    const selectType = (e) => {
        setType(e)
    }
    return(
        <Modal
            visible={visible}
            title={compileType==='add'?'添加产品':'修改产品'}
            onCancel={onCancel}
            okText='保存'
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
                            label='产品名称'
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '字段类型名称不能包含非法字符，如&,%，&，#……等'
                                    }
                                ]
                            }
                        >
                            <Input placeholder='请输入产品名称'/>
                        </Form.Item>
                        <Form.Item
                            name="code"
                            label='产品类型'
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '项目类型必填'
                                    }
                                ]
                            }
                        >
                            <Select  showArrow placeholder='请选择产品类型'>
                                {
                                    productType.map(item=>{
                                        return (
                                            <Option  key={item.code} value={item.code}>
                                                {item.typeName}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label='产品版本'
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '请输入产品类型'
                                    }
                                ]
                            }
                        >
                            <Select showArrow onChange={selectType} placeholder='请选择产品版本'>
                                {
                                    typeList.map(item=>{
                                        return(
                                            <Option key={item.key} value={item.key}>
                                                {item.value}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        {
                            type==='saas'&&
                            <Form.Item
                                name="productUrl"
                                label='访问路径'
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: '请输入产品访问路径'
                                        }
                                    ]
                                }
                            >
                                <Input placeholder='https://wwww.darth.product.com'/>
                            </Form.Item>
                        }
                        {type!=='ce'&&
                            <Form.Item
                            name="price"
                            label='产品价格'
                            >
                            <Input placeholder='***元' addonAfter="/人/月"/>
                            </Form.Item>
                        }

                        <Form.Item
                            name="icon"
                            label='缩略图'

                        >
                            {
                                fileUrl
                                    ? <Upload {...fileUpload} listType="picture" defaultFileList={[...fileList]}
                                              className="upload-list-inline" maxCount='1'>
                                    </Upload>
                                    :  <Upload {...fileUpload} listType="picture"
                                               className="upload-list-inline" maxCount='1'>
                                        <Button icon={<UploadOutlined />}>Upload</Button>
                                    </Upload>
                            }
                        </Form.Item>
                        <Form.Item
                            name="des"
                            label='描述'

                        >
                            <Input placeholder='描述'/>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Modal>
    )

}

export default withRouter(AddProduct)
