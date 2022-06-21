
/**
 * @name: CompileActivity
 * @author: limingliang
 * @date: 2022-06-13 14:30
 * @description：编辑活动
 * @update: 2022-06-13 14:30
 */

import React, {useEffect, useState} from "react";
import {
    Form,
    Input,
    Select,
    DatePicker,
    Space,
    Breadcrumb,
    InputNumber, Row, Col, Button
} from 'antd';
import activityService, {createFullReductionApi} from "../../../service/avtivity.service";
import {MinusSquareOutlined, PlusSquareOutlined} from "@ant-design/icons";
import productService, {findChargeProductListApi} from "../../../service/product.service";
const { RangePicker } = DatePicker;
const { Option } = Select;
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 },
};
const CompileActivity = props => {
    const [form] = Form.useForm();

    const [productList,setProductList]=useState([])
    const [product,setProduct]=useState(null)
    const [startTime,setStartTime]=useState('')  //开始时间
    const [endTime,setEndTime]=useState('')  //结束时间

    const [fullPrice,seFullPrice]=useState('')  //满多少金额
    const [reducePrice,setReducePrice]=useState('')  //减多少金额
    const [type,setType]=useState('')  //添加选择的类型

    const [activityTypeList,setActivityTypeList]=useState([])  //活动类型

    const [activityTypeId,setActivityTypeId]=useState('')

    const [number,setNumber]=useState([1]);
    const [fullReductionList,setFullReductionList]=useState([])

    useEffect(async ()=>{

      await findActivityType()
        await findChargeProductList()
    },[])

//查询活动分类
    const findActivityType = async () => {
        const res=await activityService.findAllActivityType()
        if (res.code===0){
            setActivityTypeList(res.data)
        }
    }

    const findChargeProductList = async () => {
      const res=await productService.findChargeProductList()
        if (res.code===0){
            debugger
            setProductList(res.data)
        }
    }


    //提交
    const handleOk = () => {
        form.validateFields().then(async values => {
          const res= await activityService.createActivity({activityName:values.activityName,activityType:{id:activityTypeId}, activityStartTime:startTime,activityEndTime:endTime})
            if (res.code===0){
                if (type==='full'){
                    await activityService.createFullReduction({fullPrice:fullPrice,reducePrice:values.reducePrice,activity:{id:res.data}})
                }
            }
            onCancel()
        })
    }
    const onChange =async (value, dateString) => {

        setStartTime(dateString[0])
        setEndTime(dateString[1])

    }

    const cancel =async () => {
        setType('')
        onCancel()
    }

    const cuteType = (value) => {
        setType(value)
       const id=activityTypeList.filter(item=>value===item.activityCode)[0].id
        setActivityTypeId(id)
    }

    const optionProduct = (value) => {
        setProduct(value)
    }

    //满多少金额
    const addFullPrice = (e) => {
        const  price=e.target.value
        seFullPrice(price)
    }
    const reduce = (e) => {
        const  price=e.target.value
        setReducePrice(price)
    }

    //提交
    const onFinish =async (value) => {
        const param={
            activityName:value.activityName,
            activityType:{
                id:activityTypeId
            },
            activityStartTime:startTime,
            activityEndTime:endTime
        }
        const res= await activityService.createActivity(param)
        if (res.code===0){
            if (type==='full'){
             await   FullReduction(res.data)
            }
            if (type==='dis'){
               await Discount(value,res.data)
            }
        }

    }
    //创建满减
    const FullReduction = async (activityId) => {
      const param={
          fullPrice:fullPrice,
          reducePrice:reducePrice,
          activity:{
              id:activityId
          }
      }
      const res=await activityService.createFullReduction(param)
        if (res.code===0){
            props.history.push("/setting/activity")
        }
    }
    //创建折扣
    const Discount = async (value,activityId) => {
      const param={
          activity:{
              id:activityId
          },
          product:{
              id:product
          },
          discount:value.discount
      }
      const res=await activityService.createDiscount(param)
        if (res.code===0){
            props.history.push("/setting/activity")
        }
    }
    
    //增加场次
    const addNUmber =async () => {
       // setNumber(number.concat(1))
    }
    //减少场次
    const deleteNUmber =async () => {
       // setNumber(number.splice(1))
    }
    return (
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item href='#/setting/activity'>活动列表</Breadcrumb.Item>
                    <Breadcrumb.Item href="">创建活动</Breadcrumb.Item>
                </Breadcrumb>
                <Form
                    {...layout}
                    onFinish={onFinish}
                    name="nest-messages"
                    form={form}
                    className='mt-6'>
                    <Form.Item name={['activityName']} label="活动名称" rules={[{ required: true }]}>
                        <Input
                            type="text"
                        />
                    </Form.Item>
                    <Form.Item
                        name="desc"
                        label='活动时间'
                    >
                        <Space direction="vertical" size={12}>
                            <RangePicker
                                showTime={{
                                    format: 'HH:mm',
                                }}
                                format="YYYY-MM-DD HH:mm"
                                onChange={onChange}
                            />
                        </Space>
                    </Form.Item>
                    <Form.Item name={['activityType']} label="活动类型" rules={[{ required: true }]}>
                        <Select  showArrow onChange={cuteType} >
                            {
                                activityTypeList&&activityTypeList.map(item=>{
                                    return(
                                        <Option key={item.id}  value={item.activityCode} >
                                            {item.activityType}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    {
                        type&&type==='full'&&
                        <Form.Item
                            name="reducePrice"
                            label='满减规则'
                            required="required"
                        >
                            <div className=' flex  grid grid-cols-2 gap-4' >
                                {
                                    number.map((item,index)=>{
                                        return(
                                            <div className='flex  space-x-2 w-2/3' key={index}  >
                                                <Input.Group compact  >
                                                    <Input addonBefore="满" style={{ width: '50%' }} onChange={addFullPrice}  />
                                                    <Input addonBefore="减" style={{ width: '50%' }} onChange={reduce}/>
                                                </Input.Group>
                                                {
                                                    index!== number.length-1&&
                                                    <MinusSquareOutlined className={' cursor-pointer pt-2 pl-4'} onClick={deleteNUmber}/>
                                                }

                                                {
                                                    index=== number.length-1&&
                                                    <PlusSquareOutlined className={' cursor-pointer pt-2 pl-4'} onClick={addNUmber}/>
                                                }
                                            </div>
                                        )
                                    }
                                    )
                                }

                            </div>
                        </Form.Item>||
                        type==='dis'&&
                        <>
                            <Form.Item
                                name="discount"
                                label='折扣数'
                                required="required"
                            >
                                <InputNumber />
                            </Form.Item>
                            <Form.Item
                                name="product"
                                label='折扣产品'
                                required="required"
                            >
                                <Select  showArrow onChange={optionProduct} >
                                    {
                                        productList&&productList.map(item=>{
                                            return(
                                                <Option key={item.id}  value={item.id} >
                                                    {
                                                        item.type==='saas'?
                                                            <div>{item.name+'(saas版本)'}</div>
                                                            :<div className='text-gray-500'>{item.name+'(企业版本)'}</div>
                                                    }
                                                </Option>
                                            )
                                        })
                                    }
                                </Select>
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
export default CompileActivity