/**
 * @name: index
 * @author: limingliang
 * @date: 2022-04-02 14:30
 * @description：浏览量统计管理
 * @update: 2021-04-02 14:30
 */
import React, {useState, useEffect} from "react";
import {Radio, Input, Tag, Avatar, Cascader , Breadcrumb} from 'antd';
import * as echarts from 'echarts/lib/echarts';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';


echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

//引入折线图
import 'echarts/lib/chart/line'

//引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

import statisticsService from "../../service/statistics.service"
import {Card} from 'antd'


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
    const [day,setDay]=useState([])
    const [type,setType]=useState('')


    useEffect( ()=>{

        findStatistics()
    },[])

    const findStatistics=async ()=>{
        const formData = new FormData();
        const date=new Date()
        formData.append("time",date)
        formData.append("type","visit")
        const res=await statisticsService.memberStatisticsService(formData)
        if (res.code===0){
            getOption(res.data.day,res.data.number)
        }
        return res
    }

    //浏览 月统计
    const findStatisticsByMonth=async ()=>{
        const formData = new FormData();
        const date=new Date().getFullYear()
        formData.append("type","visit")
        formData.append("time",date)
        const res=await statisticsService.statisticsByMonth(formData)
        if (res.code===0){
            getOption(res.data.day,res.data.number)
        }
        return res
    }

    //切换视图类型
    const cutType=async (e)=>{
        const type=e.target.value
        if (type==="day"){
            await findStatistics()
        }
        if (type==="moth"){
            await findStatisticsByMonth()
        }
    }

    const getOption = (day,number)=>{
        const month=new Date().getMonth()+1
        const year=new Date().getFullYear();
        const burnDown = echarts.init(document.getElementById('main'));
        let option;
        option = {
            title: {  //标题
                // text:'新增统计表('+ month+'月)',
                text: year+'年'+month+'月'+'(浏览量统计)',
                x: 'center',
                textStyle: { //字体颜色
                    color: '#ccc'
                }
            },
            tooltip:{ //提示框组件
                trigger: 'axis'
            },
            xAxis: { //X轴坐标值
                type: 'category',
                data: day
            },
            yAxis: {
                type: 'value' ,//数值轴，适用于连续数据
            },
            series : [
                {
                    name:'增长数', //坐标点名称
                    type:'line', //线类型
                    data:number //坐标点数据
                }
            ]
        }
        burnDown.setOption(option)
    }

    const onChange=async ()=>{

    }

    return (
        <section className='container mx-auto flex flex-col my-6'>
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item>数据统计</Breadcrumb.Item>
                    <Breadcrumb.Item href=""> 浏览量统计</Breadcrumb.Item>
                </Breadcrumb>
                <div className='flex py-8'>
                    <div className='flex w-1/2'>
                        <Cascader options={options} onChange={onChange} placeholder="Please select"  />
                    </div>
                    <div className='flex w-1/2 justify-end' onChange={cutType} >
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                            <Radio.Button value="day">日统计图</Radio.Button>
                            <Radio.Button value="week">周统计图</Radio.Button>
                            <Radio.Button value="moth">月统计图</Radio.Button>
                        </Radio.Group>
                    </div>
                </div>
                <div className="main" id="main" style={{width: "100%",height: "500px"}}>
                </div>
            </div>
        </section>

    )

}

export default ViewStatistics

