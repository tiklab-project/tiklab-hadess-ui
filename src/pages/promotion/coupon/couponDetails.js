/**
 * @name: CashVolumeDetails
 * @author: limingliang
 * @date: 2022-06-15 14:30
 * @description：现金卷详情
 * @update: 2022-06-15 14:30r
 */
import React,{useState,useEffect} from "react";
import {Descriptions, Drawer, Pagination, Space, Table} from 'antd'
import activityService from "../../../service/avtivity.service";
const CouponDetails = (props) => {
    const {visible, onClose,couponData,couponList} = props;
    const [currentPage, setCurrentPage] = useState(1);  //当前页
    const columns = [
        {
            title: '编码',
            dataIndex: 'couponCode',

        },
        {
            title: '是否领取',
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
            title: '领取人',
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
    return(
        <Drawer
            title="优惠券详情"
            placement='right'
            closable={false}
            onClose={onClose}
            visible={visible}
            width  ={'700'}
            className='locker-top'
        >
            {
                couponData&&
                <div className='space-y-3'>
                    <Descriptions  >
                        <Descriptions.Item label="券名字">{couponData.couponName}</Descriptions.Item>
                        <Descriptions.Item label="券类型">{couponData.bGroup===2&&'线下企业版本'||couponData.bGroup===1&&'线上saas版本'}</Descriptions.Item>
                        <Descriptions.Item label="券种类">{couponData.couponType==='cash'&&'现金券'||couponData.couponType==='discount'&&'折扣卷'}</Descriptions.Item>
                        {
                            couponData.couponType==='cash'?
                                <Descriptions.Item label="券金额">¥{couponData.couponLimit}</Descriptions.Item>:
                                <Descriptions.Item label="折扣数">{couponData.couponLimit} 折</Descriptions.Item>
                        }
                        <Descriptions.Item label="有效期">{couponData?.startTime}～{couponData?.endTime}</Descriptions.Item>
                        <Descriptions.Item label="使用规则">满¥{couponData.couponRule}使用</Descriptions.Item>
                    </Descriptions>
                    <div>
                        <Table
                            columns={columns}
                            dataSource={couponList?.dataList}
                            pagination={false}
                        />
                    </div>
                </div>
            }
        </Drawer>
    )
}
export default CouponDetails