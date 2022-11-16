/**
 * @name: CashVolumeDetails
 * @author: limingliang
 * @date: 2022-06-15 14:30
 * @description：现金卷详情
 * @update: 2022-06-15 14:30r
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Button, Descriptions, Input, Space, Table, Tag} from "antd";
import activityService from "../../../service/avtivity.service";
import {withRouter} from "react-router";
import './coupon.scss'
const Details = props => {
    const cashDetail=props.history.location.params
    const [couponDetail,setCouponDetails]=useState('')
    const [couponList,setCouponList]=useState([])   //券
    const [page, setPage] = useState(1);  //当前页
    const [pageSize] = useState(10);
    const [totalRecord, setTotalRecord] = useState();  //总条数

    const columns = [
        {
            title: '编码',
            dataIndex: 'couponCode',

        },
        {
            title: '是否领用',
            dataIndex: 'isAccess',
            render:(text)=>(
                <Space size="middle">
                    {
                        text==='false'&&<p className='text-gray-400' key={text}>未领取</p>||
                        text==='true'&&<p className='text-green-400' key={text}>已领取</p>
                    }
                </Space>
            )
        },
        {
            title: '领用人',
            dataIndex: 'AccessName',
        },
        {
            title: '是否使用',
            dataIndex: 'isUse',
            render:(text)=>(
                <Space size="middle">
                    {
                        text==='false'&&<p className='text-gray-400' key={text}>未使用</p>||
                        text==='true'&&<p className='text-green-400' key={text}>已使用</p>
                    }
                </Space>
            )
        },

    ];

    useEffect(async ()=>{
        if (cashDetail){
            sessionStorage.setItem("cashDetail", JSON.stringify(cashDetail));
        }
        await findCouponPage(page)
    },[])


    //查询所有券列表
    const findCouponPage = async (page) => {
        const cashDetail=JSON.parse(sessionStorage.getItem("cashDetail"));

        setCouponDetails(cashDetail)

        let res;
        const param={
            pageParam: {
                pageSize: pageSize,
                currentPage: page,
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
            setCouponList(res?.data.dataList)
            setTotalRecord(res?.data.totalRecord)
        }
    }

    //分页
    const handleTableChange = async (pagination, filters, sorter) => {
        setPage(pagination.current)
        await findCouponPage(pagination.current)
    }

    const goCashList =async (type) => {
        props.history.push({
            pathname:"/index/coupon",
            params:type
        })
    }
    return(
        <div className='coupon'>
            <Breadcrumb separator="/" className=' coupon-title'>
                {
                    couponDetail?.couponType==='cash'&&
                    <Breadcrumb.Item  onClick={()=>goCashList('cash')} className={'cursor-pointer'}>现金券列表</Breadcrumb.Item> ||
                    couponDetail.couponType==='discount'&&
                    <Breadcrumb.Item onClick={()=>goCashList('coupon')} className={'cursor-pointer'}>折扣券列表</Breadcrumb.Item>
                }
                <Breadcrumb.Item >详情</Breadcrumb.Item>
            </Breadcrumb>
            {
                couponDetail&&
                <div className='coupon-data'>
                    <div className='text-sm font-medium pb-2'>券基本信息</div>
                    <Descriptions  >
                        <Descriptions.Item label="券名字">{couponDetail.couponName}</Descriptions.Item>
                        <Descriptions.Item label="券类型">{couponDetail.bGroup===2&&'线下企业版本'||couponDetail.bGroup===1&&'线上saas版本'}</Descriptions.Item>
                        <Descriptions.Item label="券种类">{couponDetail.couponType==='cash'&&'现金券'||couponDetail.couponType==='discount'&&'折扣卷'}</Descriptions.Item>
                        {
                            couponDetail.couponType==='cash'?
                                <Descriptions.Item label="券金额">¥{couponDetail.couponLimit}</Descriptions.Item>:
                                <Descriptions.Item label="折扣数">{couponDetail.couponLimit} 折</Descriptions.Item>
                        }
                        <Descriptions.Item label="有效期">{couponDetail?.startTime}～{couponDetail?.endTime}</Descriptions.Item>
                        <Descriptions.Item label="使用规则">满¥{couponDetail.couponRule}使用</Descriptions.Item>
                    </Descriptions>
                </div>

            }
            <div className='border border-gray-200  '>
                <Table
                    columns={columns}
                    dataSource={couponList}
                    rowKey = {record => record.id}
                    scroll={{ y: 600 }}
                    pagination={{
                        current:page,
                        pageSize: pageSize,
                        total: totalRecord,
                    }}
                    onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
                />
            </div>
        </div>
    )
}

export default withRouter(Details)