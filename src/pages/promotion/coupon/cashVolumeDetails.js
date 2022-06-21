/**
 * @name: CashVolumeDetails
 * @author: limingliang
 * @date: 2022-06-15 14:30
 * @description：现金卷详情
 * @update: 2022-06-15 14:30
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Button, Descriptions, Input, Space, Table, Tag} from "antd";
import activityService from "../../../service/avtivity.service";
import {withRouter} from "react-router";
const CashVolumeDetails = props => {
    const cashDetail=props.history.location.params
    const [cashVolumeDetail,setCashVolumeDetail]=useState('')
    const [cashVolumeList,setCashVolumeList]=useState([])   //现金卷
    const [page, setPage] = useState(1);  //当前页
    const [pageSize] = useState(10);
    const [totalRecord, setTotalRecord] = useState();  //总条数

    const columns = [
        {
            title: '编码',
            dataIndex: 'rollCode',
        },
        {
            title: '是否领用',
            dataIndex: 'receive',
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
            dataIndex: 'memberName',
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
        await findCashVolumePage(page)
    },[])

    //查询所有现金卷
    const findCashVolumePage = async (page) => {
        const cashDetail=JSON.parse(sessionStorage.getItem("cashDetail"));

        setCashVolumeDetail(cashDetail)
        const param={
            pageParam: {
                pageSize: pageSize,
                currentPage: page,
            },
            rollId:cashDetail.id
        }
        const res=await activityService.findMergeCashVolumePage(param)
        if (res.code===0){
            setCashVolumeList(res.data.dataList)
            setTotalRecord(res.data.totalRecord)
        }
    }

    //分页
    const handleTableChange = async (pagination, filters, sorter) => {
        setPage(pagination.current)
        await findCashVolumePage(pagination.current)
    }
    return(
        <section className='flex-row p-6'>
            <div className='w-full  max-w-full m-auto '>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item href="#/setting/activity/cashVolumeList">现金卷列表</Breadcrumb.Item>
                    <Breadcrumb.Item >现金卷详情</Breadcrumb.Item>
                </Breadcrumb>
            </div>

                {
                    cashVolumeDetail&&
                    <Descriptions title=" 券基本信息" className='pt-4'>
                        <Descriptions.Item label="卷名字">{cashVolumeDetail.rollName}</Descriptions.Item>
                        <Descriptions.Item label="券类型">{cashVolumeDetail.rollType==='ee'&&'线下企业版本'||cashVolumeDetail.rollType==='saas'&&'线上saas版本'}</Descriptions.Item>
                        <Descriptions.Item label="券种类">{cashVolumeDetail.rollKind==='cash'&&'现金卷'||cashVolumeDetail.rollKind==='coupon'&&'折扣卷'}</Descriptions.Item>
                        {
                            cashVolumeDetail.rollKind==='cash'?
                                <Descriptions.Item label="卷金额">¥{cashVolumeDetail.rollLimit}</Descriptions.Item>:
                                <Descriptions.Item label="折扣数">{cashVolumeDetail.rollLimit} 折</Descriptions.Item>
                        }
                        <Descriptions.Item label="有效期">{cashVolumeDetail.startTime}～{cashVolumeDetail.endTime}</Descriptions.Item>
                        <Descriptions.Item label="使用规则">满{cashVolumeDetail.rollRule}使用</Descriptions.Item>
                    </Descriptions>
                }
                <div className='pt-12'>
                    <div className='border border-gray-200  '>
                        <Table
                            columns={columns}
                            dataSource={cashVolumeList}
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

        </section>

    )
}

export default withRouter(CashVolumeDetails)