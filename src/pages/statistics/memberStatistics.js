/**
 * @name: index
 * @author: limingliang
 * @date: 2022-04-02 14:30
 * @description：会员统计管理
 * @update: 2021-04-02 14:30
 */
import React, {useState, useEffect} from "react";
import {Tabs} from 'antd';
import './statistics.scss'
import Statistics from "../../common/components/statistics";
const { TabPane } = Tabs;
const MemberStatistics =props=>{
    const [day,setDay]=useState([])
    const [category,setCategory]=useState('day')
    const [state,setState]=useState();

    useEffect( ()=>{

    },[])


    //切换视图类型
    const cutType=async (event)=>{
        setCategory(event)

    }
    return (
        <div className='statistics'>
            <div className='statistics-title'>会员统计</div>
            <div className=' statistics-data'>
                <Tabs  activeKey={category}  onTabClick={cutType}   >
                    <TabPane  tab="日统计图" key="day"/>
                    <TabPane tab="周统计图" key="week"/>
                    <TabPane tab="月统计图" key="month"/>
                </Tabs>
            </div>
            <Statistics category={category} type='member' desc='(会员增长数量统计)'   height={"500px"}/>
        </div>
    )
}
export default MemberStatistics

