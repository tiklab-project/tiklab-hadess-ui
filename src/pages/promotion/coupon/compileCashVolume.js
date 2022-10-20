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

const couponTypeList= [{code:'cash',name:'现金卷'},{code: 'discount',name:'折扣卷'}]
const rollBGroupList= [{code:1,name:'线上saas优惠券'},{code: 2,name:'线下ee优惠券'}]
const compileCashVolume = props => {
    const comData=props.history.location.params
    const [form] = Form.useForm();

    const [startTime,setStartTime]=useState('')  //开始时间
    const [endTime,setEndTime]=useState('')  //结束时间
    const [bGroup,setBGroup]=useState(null)   //优惠卷类型
    const [couponType,setCouponType]=useState(null)  //优惠类型 现金券、折扣券
    const [rollData,setRollData]=useState(null)


    useEffect(async ()=>{
        if(comData){
            sessionStorage.setItem("comData", JSON.stringify(comData));
        }
        const data=JSON.parse(sessionStorage.getItem("comData"));
        if (comData) {
            form.setFieldsValue({
                couponName: data.couponName,
                bGroup:data.bGroup,
                activityKind:data.couponType,
                couponLimit:data.couponLimit,
                couponNumber:data.couponNumber,
                couponRule:data.couponRule,
            })
            setCouponType(data.couponType)
            setBGroup(data.bGroup)
            setRollData(data)
        }

    },[])



    //提交
    const onFinish = async (value) => {
        const param={
            couponName:value.couponName,
            couponLimit:value.couponLimit,
            couponRule:value.couponRule,
            bGroup:bGroup,
            couponType:couponType,
            couponNumber:value.couponNumber,
            startTime:startTime,
            endTime:endTime
        }
        if (rollData){
            await updateRoll(param)
        }else {
            const res=await activityService.createCoupon(param)
            if (res.code===0){
                props.history.push("/setting/coupon")
            }
        }
    }

    const updateRoll = async (value) => {
        const param={
            ...value,
            id:rollData.id
        }
        const res=await activityService.updateCoupon(param)
    }
    const onChange =async (value, dateString) => {
        setStartTime(dateString[0])
        setEndTime(dateString[1])
    }

    //切换种类
    const cuteKind = (value) => {
        setCouponType(value)
    }
    //切换类型
    const cuteType = (value) => {
      setBGroup(value)
    }

    return(
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item href='#/setting/activity/coupon' className={'cursor-pointer'}>现金券列表</Breadcrumb.Item>
                    <Breadcrumb.Item >创建优惠券</Breadcrumb.Item>
                </Breadcrumb>
                <Form
                    {...layout}
                    onFinish={onFinish}
                    name="nest-messages"
                    form={form}
                    className='mt-6'>
                    <Form.Item name={['couponName']} label="优惠券名称" rules={[{ required: true }]}>
                        <Input
                            type="text"
                        />
                    </Form.Item>
                    <Form.Item name={['bGroup']} label="优惠券类型" rules={[{ required: true }]}>
                        <Select  showArrow onChange={cuteType}>
                            {rollBGroupList.map(item=>{
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
                            {
                                rollData&&rollData.startTime?
                                <RangePicker
                                    showTime={{
                                        format: 'HH:mm',
                                    }}
                                    format="YYYY-MM-DD HH:mm"
                                    onChange={onChange}
                                    value={[moment(rollData.startTime, "YYYY-MM-DD HH:mm"), moment(rollData.endTime, "YYYY-MM-DD HH:mm")]}
                                />:
                                    <RangePicker
                                        showTime={{
                                            format: 'HH:mm',
                                        }}
                                        format="YYYY-MM-DD HH:mm"
                                        onChange={onChange}
                                    />
                            }

                        </Space>
                    </Form.Item>
                    <Form.Item name={['activityKind']} label="优惠卷种类" rules={[{ required: true }]}>
                        <Select  showArrow onChange={cuteKind} >
                            {couponTypeList.map(item=>{
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
                        couponType&&
                        <>
                            <Form.Item
                                name="couponLimit"
                                label={couponType==='cash'&&'现金卷金额'||couponType==='coupon'&&'折扣数'}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="couponNumber"
                                label={couponType==='cash'&&'现金卷数量'||couponType==='coupon'&&'折扣卷数量'}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="couponRule"
                                label={couponType==='cash'&&'现金卷规则'||couponType==='coupon'&&'折扣卷规则'}
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