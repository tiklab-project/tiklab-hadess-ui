/**
 * @name: CashVolumeList
 * @author: limingliang
 * @date: 2022-06-15 14:30
 * @description：优惠卷管理列表
 * @update: 2022-06-15 14:30
 */

import React, {useState, useEffect} from "react";
import {
    Breadcrumb,
    Button,
    Modal,
    Pagination,
    Radio,
    Space,
    Switch,
    Table,
    Tabs,
    Tooltip
} from "antd";
import activityService from "../../../service/avtivity.service";
import {DeleteOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
const { confirm } = Modal;
const { TabPane } = Tabs;
import {getUser} from "tiklab-core-ui"
import './coupon.scss'
import CouponDetails from "./couponDetails";
import Paging from "../../../common/components/paging";
const rollTypeList= [{code:'cash',name:'现金卷'},{code: 'coupon',name:'折扣卷'}]
const CouponList = props => {
    const type=props.history.location.params

    const [cashVolumeList,setCashVolumeList]=useState([])   //优惠券数据list
    const [coupon,setCoupon]=useState()   //优惠券数据
    const [couponList,setCouponList]=useState()  //通过id 查询的优惠券数据list
    const [couponType,setCouponType]=useState('cash')   //卷类型
    const [currentPage, setCurrentPage] = useState(1);  //当前页
    const [pageSize]=useState(10)
    const [totalPage,setTotalPage]=useState(0);  //总页数

    const [detailsVisible,setDetailsVisible]=useState(false)  //打开优惠券详情抽屉状态
    const columns = [
        {
            title: '名称',
            dataIndex: 'couponName',
            render: (text, record) => {
                return <a className='text-blue-400 cursor-pointer' onClick={() => openCouponDetails(record)}>{record.couponName}</a>
            },
        },
        {
            title: '类型',
            dataIndex: 'bGroup',
            render:(text)=>text===1?"saas券":"ee企业券"

        },
        {
            title: '种类',
            dataIndex: 'couponType',
            render: (text) => text==='cash'&&'现金卷'||text==="coupon"&&'折扣卷'

        },
        {
            title: '总数量',
            dataIndex: 'couponNumber',

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
            dataIndex: 'isInvoke',
            render: (text, record) => (
                <Switch checkedChildren="启用" unCheckedChildren="停用" checked={text==='false'?false:true} onChange={(e)=>changeEnable(e,record)} />
            ),
        },
        {
            title: '操作',
            key: 'activity',
            render: (text, record) => (
                <Space size="useState" className='flex  gap-x-4 '>
                    <Tooltip title="删除">
                        {record.activityInvoke==='true'?<DeleteOutlined className='text-gray-200'/>:
                        <DeleteOutlined className='cursor-pointer' onClick={() => deleteCashVolumePop(record.id)} />}
                    </Tooltip>
                </Space>
            ),
        },
    ];

    useEffect(async ()=>{
        if (type){
            setCouponType(type)
            await findRollPage(type,currentPage)
        }else {
            setCouponType('cash')
            await findRollPage(couponType,currentPage)
        }

    },[])

    //分页查询优惠券数据
    const findRollPage = async (value,currentPage) => {
        const param={
            couponType:value,
            pageParam: {
                pageSize: 10,
                currentPage: currentPage,
            },
            memberId:getUser().userId
        }
        const res=await activityService.findCouponPage(param)
        if (res.code===0){
            setCashVolumeList(res.data.dataList)
            setTotalPage(res.data.totalPage)
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

      const res= await activityService.updateCoupon(value);
        if (res.code===0){
            await findRollPage(couponType,currentPage)
        }
    }

    //删除弹窗
    const deleteCashVolumePop =async (couponId) => {
        confirm({
            title: '注意，会删除相对应的所有优惠券，请谨慎操作',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            style:{top: 200} ,
            onOk() {
                deleteCoupon(couponId)
            },
            onCancel() {
            },
        });
    }

    //删除
    const deleteCoupon =async (couponId) => {
        const formData = new FormData()
        formData.append('id', couponId);
       const res=await activityService.deleteCoupon(formData)
        if (res.code===0){
           await findRollPage(couponType,currentPage)
        }
    }

    //启用停用
    const changeEnable =async (e,record)=>{
        debugger
        if (e){
            await  updateCashVolume({...record,isInvoke:'true'})
        }else {
            await  updateCashVolume({...record,isInvoke:'false'})
        }

    }

    //创建现金卷
    const addCashVolume =async () => {
        props.history.push("/index/coupon/compileCoupon")
    }

    const goDetails = async (record) => {
        props.history.push({
            pathname:"/index/coupon/details",
            params:record
        });
    }

    //打开优惠券详情弹窗
    const openCouponDetails =async (value) => {
        setCoupon(value)
      await  findCouponPage(value)
      setDetailsVisible(true)

    }
    //关闭优惠券详情弹窗
    const closeCouponDetails = (value) => {
        setDetailsVisible(false)

    }
    //分页
    const handleTableChange = async (pagination) => {
        setCurrentPage(pagination)
        await findRollPage(couponType,pagination)
    }

    //切换卷类型
    const cutType =async (event) => {
        setCouponType(event)
        await findRollPage(event,currentPage)
    }


    //查询所有券列表
    const findCouponPage = async (cashDetail) => {
        let res;
        const param={
            pageParam: {
                pageSize: pageSize,
                currentPage: 1,
            },
            couponId:cashDetail.id
        }
        //现金券
        if (cashDetail.couponType==='cash'){
            res=await activityService.findCouponCashAccessPage(param)
        }
        //折扣券
        if (cashDetail.couponType==='discount'){
            res=await activityService.findCouponDisAccessPage(param)
        }
        if (res?.code===0){
            setCouponList(res?.data)
        }
    }
    return(
        <div className='coupon'>
            <div className='coupon-head-style'>
                <div className='coupon-title'>优惠券</div>
                <Button type="primary"  onClick={addCashVolume}>创建优惠卷</Button>
            </div>
            <div className='coupon-data'>
                <Tabs  activeKey={couponType}  onTabClick={cutType}>
                    <TabPane  tab="现金卷" key='cash'/>
                    <TabPane tab="折扣卷" key='coupon'/>
                </Tabs>
                <div>
                    <Table
                        dataSource={cashVolumeList}
                        columns={columns}
                        rowKey={record => record.id}
                        pagination={false}
                    />
                </div>
                <Paging totalPage={totalPage} currentPage={currentPage} handleTableChange={handleTableChange}/>
            </div>
            <CouponDetails onClose={closeCouponDetails} visible={detailsVisible} couponData={coupon} couponList={couponList}/>
        </div>
    )

}
export default CouponList