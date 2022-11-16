/**
 * @name: AddMember
 * @author: limingliang
 * @date: 2022-10-19 16:48
 * @description：会员详情
 * @update: 2022-10-19 16:48
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Button, Col, Form, Input, Row, Select,message} from "antd";
import memberService from "../../service/member.service";
import './member.scss'
const { Option } = Select;
const layout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 10 },
};
const memberType=[{code:3,type:"演示账号"}]
const AddMember = (props) => {
    const [form] = Form.useForm();
    const [type,setType]=useState(3);
    //切换类型
    const cuteType = (e) => {
      setType(e)
    }
    const onFinish = async (value) => {
        const param={
            account:value.account,
            nickName:value.nickName,
            phone:value.phone,
            email:value.email,
            passWord:value.passWord,
            memberType:type
        }
        const res= await memberService.createMemberApi(param);
        if (res.code===0){
            message.success('创建成功')
          await goMemberList()
        }
    }
    const goMemberList = async () => {
        props.history.push("/index/member");
    }


    return(
        <div className='member' >
            <Breadcrumb separator="/" className='member-title'>
                <Breadcrumb.Item href="#/index/member">会员列表</Breadcrumb.Item>
                <Breadcrumb.Item> 创建会员</Breadcrumb.Item>
            </Breadcrumb>
            <Form
                {...layout}
                onFinish={onFinish}
                name="nest-messages"
                form={form}
                className='mt-6'
                layout="vertical"
            >
                <Form.Item name='type' label="类型">
                    <Select  defaultValue={type} value={type}   onChange={cuteType} >
                        {
                            memberType.map(item=>{
                                return(
                                    <Option key={item.code} value={item.code}>
                                        {item.type}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item name={['nickName']} label="呢称" rules={[{ required: true }]} >
                    <Input type="nickName" placeholder='请输入呢称'/>
                </Form.Item>
                <Form.Item name={['account']} label="账号" rules={[{ required: true }]}>
                    <Input type="account" placeholder='请输入账号'/>
                </Form.Item>
                <Form.Item name={['passWord']} label="密码" rules={[{ required: true }]}>
                    <Input type="passWord" placeholder='请输入密码'/>
                </Form.Item>
                <Form.Item name={['phone']} label="手机号">
                    <Input type="phone" placeholder='请输入手机号'/>
                </Form.Item>
                <Form.Item name={['email']} label="邮箱">
                    <Input type="email" placeholder='请输入邮箱'/>
                </Form.Item>
                <Row>
                    <Col span={13} style={{ textAlign: 'left' }} className={'pr-24'}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                        <Button
                            style={{ margin: '0 8px' }}
                            onClick={goMemberList}
                        >
                            取消
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default AddMember