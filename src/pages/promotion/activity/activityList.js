/**
 * @name: activityList
 * @author: limingliang
 * @date: 2022-06-13 14:30
 * @description：活动管理列表
 * @update: 2022-06-12 14:30
 */

import React, {useState, useEffect} from "react";
import {Breadcrumb, Button, Radio, Space, Switch, Table, Modal, Tabs, Tooltip} from "antd";
const { TabPane } = Tabs;
import activityService from "../../../service/avtivity.service";
import {DeleteOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
const { confirm } = Modal;
import './activity.scss'
const ActivityTypeList= [/*{code:'dis',name:'折扣'},*/{code: 'sub',name:'订阅活动'},{code: 'full',name:'满减活动'}]
const ActivityList = props => {

    const [activityList,setActivityList]=useState([])   //活动列表数据

    const[useTypeId,setUseTypeId]=useState(null)  //当前使用的活动类型的id

    const [page, setPage] = useState(1);  //当前页
    const [totalRecord, setTotalRecord] = useState();  //总条数

    const [visible, setVisible] = useState(false);   //弹窗状态
    const [editData, setEditData] = useState(null);  //弹窗数据
    const [compileType,setCompileType]=useState(null)   //弹出的类型
    const [activityType,setActivityType]=useState('sub')  //活动类型


    const columns = [
        {
            title: '活动名称',
            dataIndex: 'activityName',

        },
        {
            title: '活动类型',
            dataIndex: 'activityType',
            render:text => text==='saas'&&'线上版本'||text==='ee'&&'线下版本'||text==='all'&&'所有版本'
        },
        {
            title: '活动种类',
            dataIndex: 'activityKind',
            render:text => text==='dis'&&'折扣活动'||text==='full'&&'满减活动'||text==='sub'&&'订阅活动'
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
                    <Tooltip title="删除">
                        <DeleteOutlined className='cursor-pointer' onClick={() => deleteActivityPop(record.id)} />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    useEffect(async ()=>{

        await findActivity(activityType,page)

    },[])



    //分页查询活动
    const findActivity = async (param,page) => {
        const params={
            activityKind:param,
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
        props.history.push("/index/activity/compileActivity")

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
    const cutType =async (event) => {
        setActivityType(event)
      await findActivity(event,page)
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
        <div className='activity'>
            <div className='activity-head-style'>
                <div className='activity-title'>
                    活动列表
                </div>
                <Button type="primary" onClick={addActivity} >添加活动</Button>
            </div>
            <Tabs  activeKey={activityType}  onTabClick={cutType}>
                {ActivityTypeList.map(item=>{
                    return(
                        <TabPane key={item.code}  tab={item.name} key={item.code} />
                    )
                })}
            </Tabs>
            <Table
                dataSource={activityList}
                columns={columns}
                rowKey={record => record.id}
                pagination={false}
            />

        </div>
    )

}
export default ActivityList