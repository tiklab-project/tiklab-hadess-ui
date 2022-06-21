/**
 * @name: compileCashVolume
 * @author: limingliang
 * @date: 2022-06-15 14:30
 * @description：编辑现金卷  （修改和添加）
 * @update: 2022-06-15 14:30
 */
import React, {useState, useEffect} from "react";
import {
    Breadcrumb,
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
    Space
} from "antd";
import activityService from "../../../service/avtivity.service";
import moment from "moment";
const { RangePicker } = DatePicker;
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 },
};
const { Option } = Select;

const rollKindList= [{code:'cash',name:'现金卷'},{code: 'coupon',name:'折扣卷'}]
const rollTypeList= [{code:'saas',name:'线上saas优惠券'},{code: 'ee',name:'线下ee优惠券'}]
const compileCashVolume = props => {
    const comData=props.history.location.params
    const [form] = Form.useForm();

    const [startTime,setStartTime]=useState('')  //开始时间
    const [endTime,setEndTime]=useState('')  //结束时间
    const [rollType,setRollType]=useState(null)   //优惠卷类型
    const [rollKind,setRollKind]=useState(null)  //优惠券种类
    const [rollData,setRollData]=useState(null)


    useEffect(async ()=>{
        if(comData){
            sessionStorage.setItem("comData", JSON.stringify(comData));
        }
        const data=JSON.parse(sessionStorage.getItem("comData"));
        if (comData) {
            form.setFieldsValue({
                rollName: data.rollName,
                rollType:data.rollType,
                desc: data.startTime,
                activityKind:data.rollKind,
                rollLimit:data.rollLimit,
                rollNumber:data.rollNumber,
                rollRule:data.rollRule,
            })
            setRollKind(data.rollKind)
            setRollType(data.rollType)
            setRollData(data)
        }

    },[])



    //提交
    const onFinish = async (value) => {
        const param={
            rollLimit:value.rollLimit,
            rollRule:value.rollRule,
            rollName:value.rollName,
            rollType:rollType,
            rollKind:rollKind,
            rollNumber:value.rollNumber,
            startTime:startTime,
            endTime:endTime
        }
        const res=await activityService.createRoll(param)
        if (res.code===0){
            props.history.push("/setting/activity/cashVolumeList")
        }
    }
    const onChange =async (value, dateString) => {
        setStartTime(dateString[0])
        setEndTime(dateString[1])
    }

    //切换种类
    const cuteKind = (value) => {
        setRollKind(value)
    }
    //切换类型
    const cuteType = (value) => {
      setRollType(value)
    }

    return(
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item href='#/setting/activity/cashVolumeList'>现金卷列表</Breadcrumb.Item>
                    <Breadcrumb.Item href="">创建优惠卷</Breadcrumb.Item>
                </Breadcrumb>
                <Form
                    {...layout}
                    onFinish={onFinish}
                    name="nest-messages"
                    form={form}
                    className='mt-6'>
                    <Form.Item name={['rollName']} label="优惠券名称" rules={[{ required: true }]}>
                        <Input
                            type="text"
                        />
                    </Form.Item>
                    <Form.Item name={['rollType']} label="优惠券类型" rules={[{ required: true }]}>
                        <Select  showArrow onChange={cuteType}>
                            {rollTypeList.map(item=>{
                                return(
                                    <Option key={item.code}  value={item.code} >
                                        {item.name}
                                    </Option>
                                )
                            })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={['desc']}
                        label='优惠卷有效期'
                    >
                        <Space direction="vertical" size={12}>
                            <RangePicker
                                showTime={{
                                    format: 'HH:mm',
                                }}
                                format="YYYY-MM-DD HH:mm"
                                onChange={onChange}

                                value={rollData&&rollData.startTime?[moment(rollData.startTime, "YYYY-MM-DD HH:mm"), moment(rollData.endTime, "YYYY-MM-DD HH:mm")]:null}
                            />
                        </Space>
                    </Form.Item>
                    <Form.Item name={['activityKind']} label="优惠卷种类" rules={[{ required: true }]}>
                        <Select  showArrow onChange={cuteKind} >
                            {rollKindList.map(item=>{
                                    return(
                                        <Option key={item.code}  value={item.code} >
                                            {item.name}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    {
                        rollKind&&
                        <>
                            <Form.Item
                                name="rollLimit"
                                label={rollKind==='cash'&&'现金卷金额'||rollKind==='coupon'&&'折扣数'}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="rollNumber"
                                label={rollKind==='cash'&&'现金卷数量'||rollKind==='coupon'&&'折扣卷数量'}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="rollRule"
                                label={rollKind==='cash'&&'现金卷规则'||rollKind==='coupon'&&'折扣卷规则'}
                            >
                                <Input addonBefore="满" addonAfter="可用" style={{ width: '30%' }}   />
                            </Form.Item>
                        </>
                    }

                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }} className={'pr-24'}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </section>
    )
}

export default compileCashVolume