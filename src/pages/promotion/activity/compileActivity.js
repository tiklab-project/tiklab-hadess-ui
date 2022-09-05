
/**
 * @name: CompileActivity
 * @author: limingliang
 * @date: 2022-06-13 14:30
 * @description：编辑活动  增加修改
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
    InputNumber, Row, Col, Button,message
} from 'antd';
import activityService from "../../../service/avtivity.service";
import {MinusSquareOutlined, PlusSquareOutlined} from "@ant-design/icons";
import productService from "../../../service/product.service";
const { RangePicker } = DatePicker;
const { Option } = Select;
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 },
};

const activityKindList= [{code:'dis',name:'折扣'},{code: 'full',name:'满减'},{code: 'sub',name:'订阅活动'}]

const ruleList= [{code:'userNum',name:'人数'},{code: 'math',name:'时间'}]

const activityTypeList= [{code:'all',name:'所有版本'},{code:'saas',name:'线上saas活动'},{code: 'ee',name:'线下ee活动'}]
const CompileActivity = props => {
    const [form] = Form.useForm();

    const [productList,setProductList]=useState([])
    const [product,setProduct]=useState(null)
    const [startTime,setStartTime]=useState('')  //开始时间
    const [endTime,setEndTime]=useState('')  //结束时间

    const [fullPrice,seFullPrice]=useState('')  //满多少金额
    const [reducePrice,setReducePrice]=useState('')  //减多少金额



    const [number,setNumber]=useState([1]);    //数量
    const [rule,setRule]=useState('userNum');   //活动规则
    const [activityType,setActivityType]=useState('all')  //活动类型  saas  ee
    const [activityKind,setActivityKind]=useState('dis')  //活动种类

    const [fullMath,setFullMath]=useState()   //满月数
    const [fullUserNum,setFullUserNum]=useState()  //满用户数
    const [discount,setDiscount]=useState()  //折扣数

    useEffect(async ()=>{

        await findChargeProductList()
    },[])



    const findChargeProductList = async () => {
      const res=await productService.findChargeProductList()
        if (res.code===0){
            setProductList([{id:'all',type:'no'},...res.data])
        }
    }

    const onChange =async (value, dateString) => {

        setStartTime(dateString[0])
        setEndTime(dateString[1])

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

    //满折
    const  fullDiscount= (e) => {
      
    }
    
    
    //提交
    const onFinish =async (value) => {
        if (rule==='math'&&value.math<0){
            return message.error('数量不能为负数')
        }
        if (rule==='userNum'&&value.userNum<0){
            return message.error('数量不能为负数')
        }
        if ((activityKind==='dis'||activityKind==='sub')&&value.discount<0){
            return message.error('折扣数不能为负数')
        }
        const param={
            activityName:value.activityName,
            activityType:activityType,
            activityKind:activityKind,
            activityRule:rule,
            activityStartTime:startTime,
            activityEndTime:endTime
        }
        const res= await activityService.createActivity(param)
        if (res.code===0){
            if (activityKind==='full'){
             await   FullReduction(res.data)
            }
            if (activityKind==='dis'){
               await Discount(value,res.data)
            }
            if (activityKind==='sub'){
                await addSubActivity(value,res.data)
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
    
    //创建订阅活动
    const addSubActivity =async (value,activityId) => {
      const param={
          activity:{
              id:activityId
          },
          type:rule,
          num:rule==='userNum'?value.userNum:value.math,
          discount:value.discount,
      }
    const res = await activityService.createSubActivity(param);
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
        setNumber(number.concat(1))
    }
    //减少场次
    const deleteNUmber =async () => {
        setNumber(number.splice(1))
    }
    //切换活动类型
    const cuteType = (value) => {
        setActivityType(value)
    }
    //切换活动规则
    const cuteRule = (value) => {
      setRule(value)
    }
    //切换种类
    const cuteKind = (value) => {
        setActivityKind(value)
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

                    <Form.Item name={['activityType']} label="活动类型" >
                        <Select defaultValue={activityType} value={activityType}  onChange={cuteType} >
                            {
                                activityTypeList.map(item=>{
                                    return(
                                        <Option key={item.code}  value={item.code} >
                                            {item.name}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name={['activityKind']} label="活动种类" >
                        <Select defaultValue={activityKind} value={activityKind}  onChange={cuteKind} >
                            {
                                activityKindList.map(item=>{
                                    return(
                                        <Option key={item.id}  value={item.code} >
                                            {item.name}
                                        </Option>
                                    )
                                })
                            }fold
                        </Select>
                    </Form.Item>

                    {activityKind!=='sub'&&
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
                            <span className='pl-4 text-gray-400'>(不添加时间则永久有效)</span>
                        </Form.Item>
                    }

                    {activityKind==='sub'&&
                        <Form.Item name={['ruleList']} label="活动规则" >
                            <Select defaultValue={rule} value={rule} showArrow onChange={cuteRule}   style={{ width: 420 }}>
                                {
                                    ruleList.map(item=>{
                                        return(
                                            <Option key={item.code}  value={item.code} >
                                                {item.name}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                    }
                    {
                       activityKind==='full'&&
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
                        </Form.Item>
                    }
                    {
                        activityKind==='dis'&&
                        <Form.Item
                            name="discount"
                            label='折扣数'
                            required="required"
                        >
                            <InputNumber />
                        </Form.Item>
                    }

                    {
                        (activityKind==='dis'||activityKind==='fold')&&<Form.Item
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
                                                    item.type==='saas'&&<div>{item.name+'(saas版本)'}</div>||
                                                    item.type==='ee'&&<div className='text-gray-500'>{item.name+'(企业版本)'}</div>||
                                                    item.type==='no'&&<div>{'所有产品'}</div>
                                                }
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                    }
                    {
                        activityKind==='sub'&&rule==='userNum'&&
                        <Form.Item name={['userNum']} label="人数"  rules={[{ required: true }]}>
                            <InputNumber placeholder="输入大于0" style={{width: 150}}/>
                        </Form.Item>
                    }
                    {
                        activityKind==='sub'&&rule==='math'&&
                        <Form.Item name={['math']} label="月数" rules={[{ required: true }]}>
                            <InputNumber placeholder="输入大于0" style={{width: 150}}/>
                        </Form.Item>
                    }
                    {
                        activityKind==='sub'&&
                        <Form.Item name={['discount']} label="折扣" rules={[{ required: true }]}>
                            <InputNumber placeholder="0～1之间"  style={{width: 150}}/>
                        </Form.Item>
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