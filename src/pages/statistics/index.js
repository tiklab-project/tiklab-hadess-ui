/**
 * @name: index
 * @author: limingliang
 * @date: 2021-08-09 14:30
 * @description：统计管理
 * @update: 2021-08-09 14:30
 */
import React, {useState, useEffect,Component} from "react";
import {Radio, Input, Tag, Avatar, Button, Breadcrumb} from 'antd';
//echarts 主模块
// import echarts from 'echarts/lib/echarts';
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
const tabsData = [{
    title:'订单统计',
    key:'order'
    },
    {
    title:'租户统计',
    key:'tenant'
    },
    {
    title:'会员统计',
    key:'member'
    },
    {
    title:'订阅统计',
    key:'subscribe'
    }
    ]

const Statistics =props=>{
     const [day,setDay]=useState([])
    const [type,setType]=useState('')


    useEffect( ()=>{
        const formData = new FormData();
        const date=new Date()
        formData.append("month",date)
        formData.append("type","order")
      /*  findStatistics(formData).then((res)=>{
            getOption(res.data.day,res.data.number)
        })*/
        findStatistics(formData)
    },[])

    const findStatistics=async (formData)=>{

        const res=await statisticsService.memberStatisticsService(formData)
        debugger
        if (res.code===0){
            getOption(res.data.day,res.data.number)
        }
        return res
    }
   const getOption = (day,number)=>{
      const month=new Date().getMonth()+1
       const burnDown = echarts.init(document.getElementById('main'));
       let option;
          option = {

            title: {  //标题
               // text:'新增统计表('+ month+'月)',
                text: month+'月',
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
    const cutType=async (e)=>{
        const formData = new FormData();
        const date=new Date()
        formData.append("month",date)
        formData.append("type",e.target.value)
       await findStatistics(formData)
        setType(e.target.value)
    }

    return (
        <section className='container mx-auto flex flex-col my-6'>
            <div className='w-full p-6 max-w-screen-xl m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item>数据统计</Breadcrumb.Item>
                    <Breadcrumb.Item href=""> 统计</Breadcrumb.Item>
                </Breadcrumb>
                <Radio.Group defaultValue={'order'} className='py-6' onChange={cutType} >
                    {
                        tabsData.map(item=>{
                            return(
                                <Radio.Button value={item.key} key={item.key}>{item.title}</Radio.Button>
                            )
                        })
                    }
                </Radio.Group>
                <div className="main" id="main" style={{width: "100%",height: "500px"}}>
                </div>
            </div>
        </section>

    )

}

export default Statistics

