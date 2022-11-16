/**
 * @name: WorkOrderList
 * @author: limingliang
 * @date: 2022-03-15 14:30
 * @description：服务与支持
 * @update: 2022-03-15 14:30
 */
import React ,{useState,useEffect}from "react";
import {Breadcrumb, Radio, Tooltip, Space, Tag, Table, Pagination, Tabs, Select} from "antd";
import workOrderServer from "../../service/workOrder.server";
import './workOrder.scss'
import WorkOrderDetails from "./workOrderDetails";
const { TabPane } = Tabs;
import PreviewEditor from "../../common/editSlate/previewEditor";
import productService from "../../service/product.service";
import Paging from "../../common/components/paging";
const { Option } = Select;
const WorkOrderList=props=>{

    const [workOrderList, setWorkOrderList] = useState([]);  //工单数据list
    const [workOrder,setWorkOrder]=useState()   //工单数据
    const [state,setState]=useState("await")  //工单状态

    const [productList,setProductList]=useState([{id:"null",name:'全部产品'}])  //去重后的产品list
    const [product,setProduct]=useState({id:"null",name:'全部产品'})   //选择的产品
    const [currentPage,setCurrentPage]=useState(1)
    const [pageSize,setPageSize]=useState(10)
    const [totalPage,setTotalPage]=useState(0);  //总页数
    
    const [detailsVisible,setDetailsVisible]=useState(false)  //详情抽屉打开状态

    const   column = [
        {
            title: '所属产品',
            dataIndex:['product','name'],
            key: 'product',
            render: (text, record) => (
                <Space size="middle " className='text-blue-500'>
                    <a onClick={()=>openWorkOrderDetails(record)}>{record.product.name}</a>
                </Space>
            )
        },
        {
            title: '工单类型',
            dataIndex:'type',
            render:(text)=>text==='flow'&&'流程'||text==='per'&&'性能'||text==='common'&&'常规'
        },
        {
            title: '问题描述',
            dataIndex:'description',
            render: (text, record) => {
                return <Tooltip placement="top" title={text}><div style={{width:180,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {/*<PreviewEditor
                        value={JSON.parse(text)}
                    />*/}
                    {text}
                    </div>
                </Tooltip>
            }
        },
        {
            title: '状态',
            dataIndex:'state',
            key: 'state',
            render:(text)=>(
                <Space size="middle">
                    {
                        text==='await'?
                            <Tag color={'volcano'} key={text}>
                                待处理
                            </Tag>:
                            <Tag color={'green'} key={text}>
                                已完成
                            </Tag>
                    }
                </Space>
            )
        },
        {
            title: '提交时间',
            dataIndex:'createTime',
            key: 'createTime',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle " className='text-blue-500'>
                    <a onClick={()=>openWorkOrderDetails(record)}>{record.state==='await'?'处理':'查看'}</a>
                </Space>
            ),
        },
    ]
    useEffect(async ()=>{
        await findWorkOrder(currentPage,state)
        await findProduct()
    },[])

    //查询工单列表
    const findWorkOrder=async (currentPage,state,productId)=>{
        debugger
        const param={
            pageParam:{
                currentPage:currentPage,
                pageSize:pageSize
            },
            state:state,
            productId:productId
        }
        const res=await workOrderServer.findWorkOrderPage(param);
        if (res.code===0){
            setWorkOrderList(res.data.dataList)
            setTotalPage(res.data.totalPage)
        }
    }
    //切换状态
    const cutType=async (event)=>{
        setCurrentPage(1)
        setState(event)
        await findWorkOrder(1,event,product.id)

    }
    //分页
    const handleTableChange=async (pagination)=>{
        setCurrentPage(pagination)
        await findWorkOrder(pagination,state,product.id)
    }


    //查询产品
    const findProduct=async ()=>{
        const res= await productService.findAllProductListSig()
        if (res.code===0){
            setProductList(productList.concat(res.data))
        }
    }

    const cuteProduct =async (e) => {
        setProduct(e)
        if (e==='null'){
            await findWorkOrder(1,state)
        }else {
            await findWorkOrder(1,state,e)
        }

    }


    //打开抽屉
    const openWorkOrderDetails = (value) => {
        setWorkOrder(value)
        setDetailsVisible(true)

    }
    //关闭抽屉
    const closeWorkOrderDetails =async () => {
        setDetailsVisible(false)
        if (product.id==='null'){
            await findWorkOrder(currentPage,state)
        }else {
            await findWorkOrder(currentPage,state,product.id)
        }

    }
    return(
        <div className=' work-order'>
            <Breadcrumb separator="/" className='work-order-title '>
                <Breadcrumb.Item> 工单列表</Breadcrumb.Item>
            </Breadcrumb>
            <div className='flex space-x-8'>
                <Tabs  activeKey={state}  onTabClick={cutType}  >
                    <TabPane  tab="待处理" key="await"/>
                    <TabPane tab="已处理" key="finish"/>
                </Tabs>
                <div className='pt-2'>
                    <Select   defaultValue={product.id} style={{width: 150}}  onChange={cuteProduct} >
                        {
                            productList.map((item,key)=>{
                                return(
                                    <Option  key={key} value={item.id} >{item.name}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
            </div>


            <Table dataSource={workOrderList}
                   columns={column}
                   pagination={false}
            />
            <Paging totalPage={totalPage} currentPage={currentPage} handleTableChange={handleTableChange}/>
            <WorkOrderDetails onClose={closeWorkOrderDetails} visible={detailsVisible} workOrderData={workOrder}/>
        </div>
    )
}
export default WorkOrderList