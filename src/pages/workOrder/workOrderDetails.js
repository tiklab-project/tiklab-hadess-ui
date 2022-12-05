/**
 * @name: index
 * @author: limingliang
 * @date: 2022-03-15 14:30
 * @description：在线工单
 * @update: 2022-03-15 14:30
 */
import React from "react";
import {Button, Col, Drawer, Form, Input, Row} from "antd";
import {getUser} from "tiklab-core-ui";
import workOrderServer from "../../service/workOrder.server";
const { TextArea } = Input;
const WorkOrderDetails = (props) => {
    const {visible, onClose,workOrderData,answer} = props;
    const [form] = Form.useForm();

    //提交回复内容
    const onFinish=async (value)=>{
        const param={
            workOrder:{
                id:workOrderData.id
            },
            tenantId:workOrderData.tenant?.id,
            memberId:workOrderData.member?.id,
            userId:getUser().userId,
            replyContent:value.description,
        }
        const res=await workOrderServer.createWorkOrderReply(param)
        if (res.code===0){
            await updateWorkOrder()
            onClose()
        }
    }
    //修改工单
    const updateWorkOrder=async ()=>{
        const param={
            ...workOrderData,
            state:'finish',
        }
        await workOrderServer.updateWorkOrder(param)
    }
    return(
        <Drawer
            title="工单详情"
            placement='right'
            onClose={onClose}
            visible={visible}
            width  ={'700'}
            className='locker-top'
        >
            {workOrderData&&
                <div className='space-y-3'>
                    <p >工单类型 : {workOrderData.type==='flow'&&'流程'||workOrderData.type==='per'&&'性能'||workOrderData.type==='common'&&'常规'} </p>
                    <p>所属产品 : {workOrderData.product.name}</p>
                    <p>提交会员 : {workOrderData.member.nickName}</p>
                    <p>提交企业 : {workOrderData.tenant?.name}</p>
                    <div>问题描述 :
                        <p className='pt-2 pl-6 leading-loose '>
                            {workOrderData.description}
                        </p>
                    </div>
                    <div className='pt-6 pl-2  '>
                        <h2 className='text-lg font-serif'>回答:</h2>
                        {
                            workOrderData.state==='await'?
                                <Form
                                    onFinish={onFinish}
                                    name="plugin-form"
                                    form={form}
                                >
                                    <Form.Item name={['description']}  rules={[{ required: true }]}>
                                        <TextArea rows={5} />
                                    </Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        提交回复
                                    </Button>
                                </Form> :
                                <div className='py-2 pl-3 bg-gray-100 leading-loose '>
                                    {answer?.replyContent}
                                </div>
                        }
                    </div>
                </div>

            }

        </Drawer>
    )
}
export default WorkOrderDetails