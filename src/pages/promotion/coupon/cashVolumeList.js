/**
 * @name: CashVolumeList
 * @author: limingliang
 * @date: 2022-06-15 14:30
 * @description：现金卷管理列表
 * @update: 2022-06-15 14:30
 */

import React, {useState, useEffect} from "react";
import {Breadcrumb, Button, Modal, Radio, Space, Switch, Table} from "antd";
import activityService from "../../../service/avtivity.service";
import {ExclamationCircleOutlined} from "@ant-design/icons";
const { confirm } = Modal;
import {getUser} from "tiklab-core-ui"
const rollTypeList= [{code:'cash',name:'现金卷'},{code: 'coupon',name:'折扣卷'}]
const CashVolumeList = props => {
    const type=props.history.location.params

    const [cashVolumeList,setCashVolumeList]=useState([])   //现金卷数据
    const [rollKind,setRollKind]=useState(null)   //卷类型
    const [page, setPage] = useState(1);  //当前页
    const [totalRecord, setTotalRecord] = useState();  //总条数

    const columns = [
        {
            title: '名称',
            dataIndex: 'rollName',
            render: (text, record) => {
                return <a className='text-blue-400 cursor-pointer' onClick={() => goDetails(record)}>{record.rollName}</a>
            },
        },
        {
            title: '类型',
            dataIndex: 'rollType',

        },
        {
            title: '种类',
            dataIndex: 'rollKind',
            render: (text) => text==='cash'&&'现金卷'||text==="coupon"&&'折扣卷'

        },
        {
            title: '总数量',
            dataIndex: 'rollNumber',

        },
        {
            title: '剩余',
            dataIndex: 'residue',
        },
        {
            title: '有效期',
            dataIndex: 'date',
            render:(text, record) => {
                return record?.startTime + '~' + record?.endTime
            }
        },

        {
            title: '创建时间',
            dataIndex: 'createTime',

        },
        {
            title: '启用状态',
            dataIndex: 'activityInvoke',
            render: (text, record) => (
                <Switch checkedChildren="启用" unCheckedChildren="停用" checked={text==='false'?false:true} onChange={(e)=>changeEnable(e,record)} />
            ),
        },
        {
            title: '操作',
            key: 'activity',
            render: (text, record) => (
                <Space size="middle">
                    {record.activityInvoke==='true'?
                        <div className='text-gray-200'>删除</div>:
                        <a onClick={() => deleteCashVolumePop(record.id)}>删除</a>
                    }
                </Space>
            ),
        },
    ];

    useEffect(async ()=>{
        if (type){
            setRollKind(type)
            await findRollPage(type,page)
        }else {
            setRollKind('cash')
            await findRollPage(rollKind,page)
        }

    },[])

    //分页查询现金卷数据
    const findRollPage = async (value,page) => {
        const param={
            rollKind:value,
            pageParam: {
                pageSize: 10,
                currentPage: page,
            },
            memberId:getUser().userId
        }
        const res=await activityService.findRollPage(param)
        if (res.code===0){
            setCashVolumeList(res.data.dataList)
            setTotalRecord(res.data.totalRecord)
        }
    }

    //编辑现金卷
    const editCashVolume = (record) => {
        props.history.push({
            pathname:"/setting/activity/compileCashVolume",
            params:record
        })
    }

    //修改
    const updateCashVolume =async (value) => {

      const res= await activityService.updateRoll(value);
        if (res.code===0){
            await findRollPage(rollKind,page)
        }
    }

    //删除弹窗
    const deleteCashVolumePop =async (CashVolumeId) => {
        confirm({
            title: '注意，回删除相对应的所有现金券，请谨慎操作',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            style:{top: 200} ,
            onOk() {
                deleteCashVolume(CashVolumeId)
            },
            onCancel() {
            },
        });
    }

    //删除
    const deleteCashVolume =async (CashVolumeId) => {
        const formData = new FormData()
        formData.append('id', CashVolumeId);
       const res=await activityService.deleteRoll(formData)
        if (res.code===0){
           await findRollPage(rollKind,page)
        }
    }

    //启用停用
    const changeEnable =async (e,record)=>{
        if (e){
            await  updateCashVolume({...record,activityInvoke:'true'})
        }else {
            await  updateCashVolume({...record,activityInvoke:'false'})
        }

    }

    //创建现金卷
    const addCashVolume =async () => {
        props.history.push("/setting/activity/compileCashVolume")
    }

    const goDetails = async (record) => {
        props.history.push({
            pathname:"/setting/activity/cashVolumeDetails",
            params:record
        });
    }

    //分页
    const handleTableChange = async (pagination, filters, sorter) => {
        setPage(pagination.current)
        await findRollPage(rollKind,pagination.current)
    }

    //切换卷类型
    const cutType =async (e) => {
        const value=e.target.value
        setRollKind(value)

        await findRollPage(value,page)
    }

    return(
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item>活动管理</Breadcrumb.Item>
                    <Breadcrumb.Item >优惠券</Breadcrumb.Item>
                </Breadcrumb>

                <div className='pt-6 space-y-6'>
                    <div className='flex'>
                        <Radio.Group  value={rollKind} buttonStyle="solid"  className='w-2/3' onChange={cutType}>
                            {rollTypeList.map(item=>{
                                return(
                                    <Radio.Button key={item.code} value={item.code}>{item.name}</Radio.Button>
                                )
                            })}
                        </Radio.Group>
                        <div className='flex justify-end  w-1/3 pr-4'>
                            <Button type="primary"  onClick={addCashVolume}>创建优惠卷</Button>
                        </div>
                    </div>
                    <div>
                        <Table
                            dataSource={cashVolumeList}
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={{
                                current:page,
                                pageSize: 10,
                                total: totalRecord,
                            }}
                            onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
                        />
                    </div>
                </div>
            </div>

        </section>
    )

}
export default CashVolumeList