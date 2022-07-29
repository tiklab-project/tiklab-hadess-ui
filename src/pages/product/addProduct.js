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
import {getUser} from "../../utils";
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 18},
};
import {OCS_URL} from "../../const";
const typeList=[{key:'saas',value:'线上saas版'},{key:'ce',value:'线下社区版'},{key:'ee',value:'线下企业版'}]
const AddProduct = props => {
    const [form] = Form.useForm();
    const [productType,setProductType]=useState([]);
    const {visible, onCancel, editData,compileType} = props;
    const [surfacePlot,setSurfacePlot]=useState('') //封面图
    const [type,setType]=useState(null)   //产品类型

    useEffect(()=>{
        finAllProductType()
        if (editData) {
            form.setFieldsValue({
                name: editData.name,
                productUrl:editData.productUrl,
                icon: editData.icon,
                price:editData.price,
                code:editData.code,
                type:editData.type,
            })
            if (editData.icon){
                setSurfacePlot(editData.icon)
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
                const res = await productService.updateProductService({...values, member:{id:getUser().member},
                    id: editData.id,productType:{id:values.productType}})
                if (!res.code) {
                    onCancel()
                }
            } else {
                const res = await productService.createProductService({...values,icon:surfacePlot,member:{id:getUser().member},productType:{id:values.productType}})
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

    //图片上传
    const prop = {
        multiple:true,
        //  showUploadList:false,
        name: "uploadFile",
        action:  `${OCS_URL}/dfs/upload`,
        headers: {
            ticket: getUser().ticket,
        },
        onChange(info) {
            console.log(info.file,'info');
            console.log(info.file.status,'status');
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
                setSurfacePlot(null)
            }
            if (info.file.status === 'done') {
                setSurfacePlot(info.file.response.data.fileName)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }

        },
    };

    const fileList=[
        {
            uid: '-1',
            name: surfacePlot,
            status: 'done',
            url:`${OCS_URL}/image/${surfacePlot}`,
            thumbUrl:`${OCS_URL}/image/${surfacePlot}`
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
            width={600}
            destroyOnClose={true}
            onOk={handleOk}
        >
            <Row>
                <Col span={24}>
                    <Form
                        {...layout}
                        form={form}
                        preserve={false}
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
                            <Input />
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
                            <Select  showArrow>
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
                            <Select showArrow onChange={selectType}>
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
                            <Input placeholder='***元'/>
                            </Form.Item>
                        }

                        <Form.Item
                            name="icon"
                            label='缩略图'

                        >
                            {
                                surfacePlot
                                    ? <Upload {...prop} listType="picture" defaultFileList={[...fileList]}
                                              className="upload-list-inline" maxCount='1'>
                                    </Upload>
                                    :  <Upload {...prop} listType="picture"
                                               className="upload-list-inline" maxCount='1'>
                                        <Button icon={<UploadOutlined />}>Upload</Button>
                                    </Upload>
                            }
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Modal>
    )

}

export default withRouter(AddProduct)
