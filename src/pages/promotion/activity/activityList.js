/**
 * @name: activityList
 * @author: limingliang
 * @date: 2022-06-13 14:30
 * @description：活动管理列表
 * @update: 2022-06-12 14:30
 */

import React, {useState, useEffect} from "react";
import {Breadcrumb, Button, Radio, Space, Switch, Table,Modal} from "antd";
import activityService from "../../../service/avtivity.service";
import CompileActivity from '../activity/compileActivity'
import {ExclamationCircleOutlined} from "@ant-design/icons";
const { confirm } = Modal;
const ActivityList = props => {

    const [activityList,setActivityList]=useState([])   //活动列表数据

    const[useTypeId,setUseTypeId]=useState(null)  //当前使用的活动类型的id

    const [page, setPage] = useState(1);  //当前页
    const [totalRecord, setTotalRecord] = useState();  //总条数

    const [visible, setVisible] = useState(false);   //弹窗状态
    const [editData, setEditData] = useState(null);  //弹窗数据
    const [compileType,setCompileType]=useState(null)   //弹出的类型
    const [activityTypeList,setActivityTypeList]=useState([])  //活动类型


    const columns = [
        {
            title: '活动名称',
            dataIndex: 'activityName',

        },
        {
            title: '活动类型',
            dataIndex: ['activityType','activityType'],

        },
        {
            title: '活动时间',
            dataIndex: 'date',
            render:(text, record) => {
                return record?.activityStartTime + '~' + record?.activityEndTime
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
                    <a onClick={() => editActivity(record)}>编辑</a>
                    <a onClick={() => deleteActivityPop(record.id)}>删除</a>
                </Space>
            ),
        },
    ];
    useEffect(async ()=>{

        await findActivity(null,page)
        await findActivityType()
    },[])

//查询活动分类
    const findActivityType = async () => {
        const res=await activityService.findAllActivityType()
        if (res.code===0){
            setActivityTypeList(res.data)
        }
    }

    //分页查询活动
    const findActivity = async (param,page) => {
        const params={
            activityTypeId:param,
            pageParam: {
                pageSize: 10,
                currentPage: page,
            },
        }
     const res= await activityService.findActivityPage(params);
        if (res.code===0){
            setActivityList(res.data.dataList)
            setTotalRecord(res.data.totalRecord)
        }
    }

    const onCancel = async () => {
      await  findActivity(useTypeId,page)
        setVisible(false)
        setEditData(null)
    }

    //创建活动
    const addActivity = async () => {
        props.history.push("/setting/activity/compileActivity")

      setCompileType("add")
     setVisible(true)
    }
    //修改活动弹窗
    const editActivity = async (value) => {
        setEditData(value)
        setCompileType("update")
        setVisible(true)
    }

    //切换活动类型
    const cutType =async (e) => {
        const value=e.target.value
       const activityTypeId= activityTypeList.filter(item=>item.activityCode===value)[0].id
        setUseTypeId(activityTypeId)

      await findActivity(activityTypeId,page)
    }

    const handleTableChange = async (pagination, filters, sorter) => {

    }

    //启用停用
    const changeEnable =async (e,record)=>{
            if (e){
                await  updateActivity({...record,activityInvoke:'true'})
            }else {
                await  updateActivity({...record,activityInvoke:'false'})
            }
    }

    //修改活动（启用停用活动）
    const updateActivity =async (record) => {
      const res=await activityService.updateActivity(record)
        if (res.code===0){
           await findActivity(useTypeId,page)
        }
    }


    //删除活动弹窗
    const deleteActivityPop=async (activityId)=>{
        confirm({
            title: '确认删除活动',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            style:{top: 200} ,
            onOk() {
                deleteActivity(activityId)
            },
            onCancel() {
            },
        });
    }
    //删除
    const deleteActivity = async (activityId) => {
        const formData = new FormData()
        formData.append('id', activityId);
        const res=await activityService.deleteActivity(formData)
        if (res.code===0){
           await findActivity(useTypeId,page)
        }
    }

    return(
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item>活动管理</Breadcrumb.Item>
                    <Breadcrumb.Item href="">活动列表</Breadcrumb.Item>
                </Breadcrumb>
                <div className='pt-6 space-y-6'>
                    <div className='flex'>
                            <Radio.Group  defaultValue="a" buttonStyle="solid"  className='w-2/3' onChange={cutType}>
                            {activityTypeList&&activityTypeList.map(item=>{
                                return(
                                    <Radio.Button key={item.activityCode} value={item.activityCode}>{item.activityType}</Radio.Button>
                                )
                            })}
                            </Radio.Group>
                        <div className='flex justify-end  w-1/3 pr-4'>
                            <Button type="primary" onClick={addActivity} >添加活动</Button>
                        </div>
                    </div>

                    <div>
                        <Table
                            dataSource={activityList}
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
          {/*  <CompileActivity visible={visible} onCancel={onCancel} editData={editData} compileType={compileType} activityType={activityTypeList}/>*/}
        </section>
    )

}
export default ActivityList