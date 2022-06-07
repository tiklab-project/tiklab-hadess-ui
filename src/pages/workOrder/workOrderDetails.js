/**
 * @name: index
 * @author: limingliang
 * @date: 2022-03-15 14:30
 * @description：在线工单
 * @update: 2022-03-15 14:30
 */

import React ,{useState,useEffect}from "react";
import {Breadcrumb, Input, Form, Button, Col, Row} from "antd";
import workOrderServer from "../../service/workOrder.server";
import {getUser} from "doublekit-core-ui";
import CustomEditor from "../../common/editSlate/editor";
import PreviewEditor from "../../common/editSlate/previewEditor";
import {withRouter} from "react-router";
const { TextArea } = Input;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const WorkOrderDetails=props=>{
    const workOrderId=props.history.location.params
    const [form] = Form.useForm();
    const [data,setData]=useState('')
    const [workOrderReply,setWorkOrderReply]=useState('')  //回复

    const [value] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ]);

    useEffect(async ()=>{
        if (workOrderId){
            sessionStorage.setItem("workOrderId", JSON.stringify(workOrderId));
        }
        await findWorkOrder()
    },[workOrderId])

    //查询详情
    const findWorkOrder=async ()=>{
        const workOrderId=JSON.parse(sessionStorage.getItem("workOrderId"));
        const param=new FormData();
        param.append('id',workOrderId)
        const res= await workOrderServer.findWorkOrder(param)
        if (res.code===0){
            setData(res.data)
            if (res.data.state==='finish'){
               await findWorkOrderReply(workOrderId)
            }
        }
    }

    //查询回复内容
    const findWorkOrderReply=async (id)=>{
        const param={
            workOrderId:id
        }
        const res=await workOrderServer.findWorkOrderReplyList(param)
        if(res.code===0){
            if (res.data.length>0){
                setWorkOrderReply(res.data[0])
            }
        }
    }


    //提交回复内容
    const onFinish=async (value)=>{
        const replyContent = JSON.stringify(value.description)
        const param={
            workOrder:{
               id:data.id
            },
            userId:getUser().userId,
            replyContent:replyContent,

        }
        const res=await workOrderServer.createWorkOrderReply(param)
        if (res.code===0){
           await updateWorkOrder()
            await skip()
        }
    }

    const skip=async ()=>{
        props.history.push({
            pathname:'/setting/workOrder',
            params:data.state
        })
    }
    //修改工单
    const updateWorkOrder=async ()=>{
        const param={
            ...data,
            state:'finish',
        }
       await workOrderServer.updateWorkOrder(param)
    }
    return(
        <section className='container mx-auto flex flex-col my-6'>
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item  onClick={skip}>工单列表</Breadcrumb.Item>
                    <Breadcrumb.Item href=""> 工单详情</Breadcrumb.Item>
                </Breadcrumb>
                {
                    data&&
                        <>
                            <div className='py-4 pl-2 border-b'>
                                <div className='flex'>
                                    <p className='py-2 w-2/5'>工单类型 : {data.type==='flow'&&'流程'||data.type==='per'&&'性能'||data.type==='common'&&'常规'} </p>
                                    <p className='py-2'>联系人 : {data.userName}</p>
                                </div>
                                <div className='flex'>
                                    <p className='py-2 w-2/5'>所属产品 : {data.product.name}</p>
                                    <p className='py-2'>手机号 : {data.userPhone}</p>
                                </div>
                                <div className='py-2'>问题描述 :
                                    <p className='pt-2 pl-6 leading-loose '>
                                        <PreviewEditor
                                            value={JSON.parse(data.description)}
                                        />
                                    </p>
                                </div>
                            </div>
                            <div className='pt-6 pl-2  '>
                                <h2 className='text-lg font-serif'>回答:</h2>
                                {
                                    data.state==='await'?
                                        <Form
                                            {...layout}
                                            onFinish={onFinish}
                                            name="plugin-form"
                                            form={form}

                                        >
                                            <Form.Item name={['description']} initialValue={value}  rules={[{ required: true }]}>
                                                <CustomEditor/>
                                            </Form.Item>
                                            <Row>
                                                <Col span={20} style={{ textAlign: 'right' }}>
                                                    <Button type="primary" htmlType="submit">
                                                        提交回复
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form> :
                                        <div className='py-2 pl-3 bg-gray-100 leading-loose '>
                                            <PreviewEditor
                                                value={JSON.parse(data.description)}
                                            />
                                        </div>
                                }
                            </div>
                        </>
                }


            </div>
        </section>
    )
}

export default withRouter( WorkOrderDetails)