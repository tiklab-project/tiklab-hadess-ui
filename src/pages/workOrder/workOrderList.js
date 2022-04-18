/**
 * @name: index
 * @author: limingliang
 * @date: 2022-03-15 14:30
 * @description：在线工单
 * @update: 2022-03-15 14:30
 */
import React ,{useState,useEffect}from "react";
import {Breadcrumb, Radio,Tooltip,Space,Tag,Table} from "antd";
import workOrderServer from "../../service/workOrder.server";
import PreviewEditor from "../../common/editSlate/previewEditor";
const WorkOrderList=(props)=>{
    const type=props.history.location.params

    const [tableData, setTableData] = useState([]);  //数据
    const [state,setState]=useState("await")  //工单状态

    const [currentPage,setCurrentPage]=useState(1)
    const [pageSize,setPageSize]=useState(10)
    const [totalRecord, setTotalRecord] = useState(props.total);

    const   column = [
        {
            title: '所属产品',
            dataIndex:['product','name'],
            key: 'product',
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
                    <PreviewEditor
                        value={JSON.parse(text)}
                    />
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
                <Space size="middle">
                    <a onClick={()=>goDetails(record.id)}>{record.state==='await'?'处理':'查看'}</a>
                </Space>
            ),
        },
    ]
    useEffect(async ()=>{
        if (type){
            setState(type)
            await findWorkOrder(currentPage,type)
        }else {
            await findWorkOrder(currentPage,'await')
        }

    },[type])

    //查询工单列表
    const findWorkOrder=async (currentPage,state)=>{
        const param={
            pageParam:{
                currentPage:currentPage,
                pageSize:pageSize
            },
            state:state
        }
        const res=await workOrderServer.findWorkOrderPage(param);

        if (res.code===0){
            setTableData(res.data.dataList)
            setTotalRecord(res.data.totalRecord)
        }
    }
    //切换状态
    const cutType=async (e)=>{
        setCurrentPage(1)
        setState(e.target.value)
        await findWorkOrder(1,e.target.value)

    }
    //分页
    const handleTableChange=async (pagination)=>{
        setCurrentPage(pagination.current)
        await findWorkOrder(pagination.current,state)
    }

    //跳转处理界面
    const goDetails=(id)=>{
        props.history.push({
            pathname:'/setting/workOrder/details',
            params:id
        })
    }
    return(
        <section className='container mx-auto flex flex-col my-6'>
            <div className='w-full p-6 max-w-screen-xl m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item>在线工单</Breadcrumb.Item>
                    <Breadcrumb.Item href=""> 工单列表</Breadcrumb.Item>
                </Breadcrumb>
                <Radio.Group size='large' value={state} className='py-6' onChange={cutType} >
                    <Radio.Button value={'await'}>待处理 </Radio.Button>
                    <Radio.Button value={'finish'} >已处理</Radio.Button>
                </Radio.Group>

                <Table dataSource={tableData} columns={column}
                       pagination={{
                           current:currentPage,
                           pageSize: pageSize,
                           total: totalRecord,
                       }}
                       rowKey={record => record.id}
                       onChange={(pagination)=>handleTableChange(pagination)}
                />


            </div>
        </section>
    )
}
export default WorkOrderList