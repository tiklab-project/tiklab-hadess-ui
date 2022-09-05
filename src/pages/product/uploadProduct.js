/**
 * @name: CompileVersion
 * @author: limingliang
 * @date: 2022-07-09 16:48
 * @description：上传项目
 * @update: 2022-07-09 16:48
 */
import React, {useState, useEffect} from "react";
import {Col, Row, Form, Modal, Input,Select,Upload, Button} from 'antd';
import {UploadOutlined} from "@ant-design/icons";
import {DFS_URL} from "../../const";
import {getUser} from "../../utils";
import productService from "../../service/product.service";
const { Option } = Select;
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 18},
};
const systemTypeList=[{key:'windows',value:'windows'},{key:'macOs',value:'macOs'},{key:'linux',value:'linux'}]
const UploadProduct = props => {
    const [form] = Form.useForm();

    const {visible, onCancel, editData} = props;
    const [fileList, setFileList] = useState([]);
    const [fileName, setFileName] = useState(); //文件名字
    const [size,setSize]=useState(); //文件大小  字节


    useEffect(()=>{
        form.setFieldsValue({
            productName: editData?.product.name,
            version:editData?.version,
        })
    }, [editData])

    const handleOk =   () => {
        form.validateFields().then(async values => {
           const res=await productService.createProductUrl({...values, size:(size/1048576).toFixed(2),productId:editData?.product.id,productVersionId:editData.id,productUrl:fileName})
            if (!res.code) {
                onCancel()
            }
        })}
    //文件上传
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

    return(
        <Modal
            visible={visible}
            title={'上传项目包'}
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
                        <Form.Item name={['productName']} label="项目名称" rules={[{ required: true }]}>
                            <Input
                                type="text"
                                disabled
                            />
                        </Form.Item>
                        <Form.Item name={['version']} label="项目版本" rules={[{ required: true }]}>
                            <Input
                                type="text"
                                disabled
                            />
                        </Form.Item>
                        <Form.Item name={['systemType']} label="包类型" rules={[{ required: true }]}>
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
                    </Form>
                </Col>
            </Row>
        </Modal>
    )
}
export default UploadProduct