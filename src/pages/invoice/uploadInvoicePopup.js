/**
 * @name: uploadInvoicePopup
 * @author: limingliang
 * @date: 2022-02-26 14:30
 * @description：上传发票弹窗
 * @update: 2022-02-26 14:30
 */
import React, {useEffect, useState} from "react";
import {Col, Row, Form, Modal, Button   , Select, Upload, message} from 'antd';
import {UploadOutlined} from "@ant-design/icons";
import {HOMES_URL} from "../../const";
import {getUser} from "../../utils";
import invoiceService from "../../service/invoice.service";
const { Option } = Select;
const layout = {
    labelCol: { span: 8},
    wrapperCol: { span: 5},
};

const  UploadInvoicePopup=props=>{
    const [form] = Form.useForm();
    const [invoiceUrl,setInvoiceUrl]=useState('')  //发票路径
    const {visible, onClose,invoiceData} = props;


    //提交
    const handleOk = async (invoiceUrl) => {
        const param={
            id:invoiceData.id,
            invoiceTitleType:invoiceData.invoiceTitleType,
            invoiceType:invoiceData.invoiceType,
            invoiceState:1,
            orderType:invoiceData.orderType,
            buyerName:invoiceData.buyerName,
            invoiceUrl:invoiceUrl

        }
        const res=await invoiceService.updateInvoice(param)
        if (res.code===0){
            onClose()
        }
    }

    //上传发票
    const uploadInvoice = {
        name: 'uploadFile',
        action: HOMES_URL+ '/dfs/upload',
        headers:{
            ticket:getUser().ticket
        },
        progress:{
            strokeWidth: 2,
            showInfo: false
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                setInvoiceUrl(info.file.response.data.fileName)
                handleOk(info.file.response.data.fileName)

            } else if (info.file.status === 'error') {
                message.error('上传失败，请重新上传');
            }
        },
    };

    return(
        <Modal
            visible={visible}
            title='上传发票'
            footer={false}
            onCancel={onClose}
            width={400}
            style={{ top: 200 }}
            destroyOnClose={true}
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
                            label='上传PDF/OFD'
                        >
                            <Upload  {...uploadInvoice} >
                                <Button icon={<UploadOutlined />}>上传发票</Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Modal>
    )
}
export default UploadInvoicePopup