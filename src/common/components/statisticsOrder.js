/**
 * @name: StatisticsMember
 * @author: limingliang
 * @date: 2022-12-03 14:30
 * @description：会员统计管理
 * @update: 2022-12-03 14:30
 */
import React, {useState, useEffect} from "react";
import {Tabs, Input, Tag, Avatar, Button, Breadcrumb} from 'antd';
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
import './statistics.scss'
import statisticsService from "../../service/statistics.service"
const { TabPane } = Tabs;
const StatisticsOrder = (props) => {
    const {type,category,desc} = props;
    useEffect( async ()=>{

     await  findStatisticsByDay(category,type)
    },[])
    //会员 日统计
    const findStatisticsByDay=async (category,type)=>{
        const formData = new FormData();
        let time;
        if (category==='day'){
             time=new Date()
        }
        if (category==='month'){
             time=new Date().getFullYear()

        }
        formData.append("time",time)
        formData.append("type",type)
        const res=await statisticsService.memberStatisticsService(formData)
        if (res.code===0){
            getOption(res.data.day,res.data.number)
        }
        return res
    }

    const getOption = (day,number)=>{
        const month=new Date().getMonth()+1
        const year=new Date().getFullYear();
        const burnDown = echarts.init(document.getElementById('order'));
        let option;
        option = {
            title: {  //标题
                // text:'新增统计表('+ month+'月)',
                text: year+'年'+month+'月'+desc,
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
    return(
        <div className="order" id="order" style={{width: "100%",height: "500px"}}/>
    )
}
export default StatisticsOrder