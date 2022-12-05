/**
 * @name: index
 * @author: limingliang
 * @date: 2022-04-02 14:30
 * @description：订单统计管理
 * @update: 2021-04-02 14:30
 */
import React, {useState} from "react";
import {Tabs} from 'antd';
import Statistics from "../../common/components/statistics";
const { TabPane } = Tabs;
const OrderStatistics =props=>{
    const [category,setCategory]=useState('day');

    //切换视图类型
    const cutType=async (event)=>{
        setCategory(event)
    }

    return (
        <div className='statistics'>
            <div className='statistics-title'>会员统计</div>
            <div className='statistics-data'>
                <Tabs  activeKey={category}  onTabClick={cutType}  id={"tabPane"} >
                    <TabPane  tab="日统计图" key="day"/>
                    <TabPane tab="周统计图" key="week"/>
                    <TabPane tab="月统计图" key="month"/>
                </Tabs>
            </div>
            <Statistics category={category} type='order' desc='(订单增长数量统计)' height={"500px"}/>
        </div>

    )
}

export default OrderStatistics

