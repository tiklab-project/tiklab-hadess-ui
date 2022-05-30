/**
 * @name: index
 * @author: mahai
 * @date: 2021-08-09 16:49
 * @description：编辑订单
 * @update: 2021-08-09 16:49
 */
import React, {useEffect} from "react";
import {Col, Row, Form, Modal, Input,Select} from 'antd';
import orderService from "../../service/order.service";
import {getUser} from "../../utils";
const { Option } = Select;
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 18},
};


const UpdateOrder = props => {
    const [form] = Form.useForm();
    const {visible, onCancel, editData} = props;

    useEffect(()=>{
        if (editData) {
            form.setFieldsValue({
                id: editData.id,
                productName: editData.productName,
                orderPrice:editData.orderPrice,
                userId: editData.member.id,
                price:editData.price,
                paymentStatus:editData.paymentStatus===1?'待支付':null||editData.paymentStatus===2?'已完成':null||editData.paymentStatus===3?'已取消':null,

            })
        }
    }, [editData])

    const handleOk =   () => {
        form.validateFields().then(async values => {
            if (editData) {
                const res = await orderService.createOrder({...values, member:{id:getUser().member},id: editData.id})
                if (!res.code) {
                    onCancel()
                }
            } else {
                const res = await orderService.updateOrder({...values,member:{id:getUser().member}})
                if (!res.code) {
                    onCancel()
                }
            }
        })
    };

    return(
        <Modal
            visible={visible}
            title='修改订单'
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
                            name="id"
                            label='订单id'
                        >
                            <Input   disabled/>
                        </Form.Item>
                        <Form.Item
                            name="productName"
                            label='产品名称'
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="orderPrice"
                            label='订单价格'
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="userId"
                            label='用户id'
                        >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item
                            name="paymentStatus"
                            label='订单状态'
                        >
                            <Select
                            >
                                <Option key='1'>待支付</Option>
                                <Option key='2'>已完成</Option>
                                <Option key='3'>取消</Option>
                            </Select>

                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Modal>
    )
}

export default UpdateOrder
