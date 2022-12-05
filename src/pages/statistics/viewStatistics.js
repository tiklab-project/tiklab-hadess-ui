/**
 * @name: index
 * @author: limingliang
 * @date: 2022-04-02 14:30
 * @description：浏览量统计管理
 * @update: 2021-04-02 14:30
 */
import React, {useState, useEffect} from "react";
import { Cascader, Tabs} from 'antd';
import './statistics.scss'
const { TabPane } = Tabs;
import {Card} from 'antd'
import Statistics from "../../common/components/statistics";


const options = [
    {
        value: 'hangzhou',
        label: '江苏',
        children: [
            {
                value: 'hangzhou',
                label: '无锡',
                children: [
                    {
                        value: 'xihu',
                        label: '惠山区',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];
const ViewStatistics =props=>{
    const [category,setCategory]=useState('day');



    //切换视图类型
    const cutType=async (event)=>{
        setCategory(event)
    }

    const onChange=async ()=>{

    }

    return (
        <div className='statistics' >
            <div className='statistics-title'>浏览量统计</div>
            <div className='statistics-data'>
                <Tabs  activeKey={category}  onTabClick={cutType}  id={"tabPane"} >
                    <TabPane  tab="日统计图" key="day"/>
                    <TabPane tab="周统计图" key="week"/>
                    <TabPane tab="月统计图" key="month"/>
                </Tabs>
                <div className='mt-1'>
                    <Cascader options={options} onChange={onChange} placeholder="Please select"  />
                </div>
            </div>
            <Statistics category={category} type='visit' desc='(浏览量统计)' height={"500px"}/>
        </div>
    )
}
export default ViewStatistics

