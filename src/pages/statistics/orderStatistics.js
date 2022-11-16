/**
 * @name: index
 * @author: limingliang
 * @date: 2022-04-02 14:30
 * @description：订单统计管理
 * @update: 2021-04-02 14:30
 */
import React, {useState, useEffect} from "react";
import {Radio, Input, Tag, Avatar, Button, Breadcrumb, Tabs} from 'antd';
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
import {Card} from 'antd'
const { TabPane } = Tabs;
const OrderStatistics =props=>{
    const [day,setDay]=useState([])
    const [type,setType]=useState('')
    const [state,setState]=useState('day');

    useEffect( async ()=>{

       await findStatisticsByDay()
    },[])

    //订单 日统计
    const findStatisticsByDay=async ()=>{
        const formData = new FormData();
        const date=new Date()
        formData.append("time",date)
        formData.append("type","order")
        const res=await statisticsService.memberStatisticsService(formData)
        if (res.code===0){
            getOption(res.data.day,res.data.number)
        }
        return res
    }

    //订单 月统计
    const findStatisticsByMonth=async ()=>{

        const formData = new FormData();
        const date=new Date().getFullYear()
        formData.append("type","order")
        formData.append("time",date)
        const res=await statisticsService.statisticsByMonth(formData)
        if (res.code===0){
            getOption(res.data.day,res.data.number)
        }
        return res
    }

    const getOption = (day,number)=>{
        const month=new Date().getMonth()+1
        const year=new Date().getFullYear();
        const burnDown = echarts.init(document.getElementById('main'));
        let option;
        option = {
            title: {  //标题
                // text:'新增统计表('+ month+'月)',
                text: year+'年'+month+'月'+'(订单数量统计)',
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

    //切换视图类型
    const cutType=async (event)=>{
        //const type=e.target.value
        setState(event)
        if (event==="day"){
            await findStatisticsByDay()
        }
        if (event==="moth"){
            await findStatisticsByMonth()
        }
    }

    return (
        <div className='statistics'>
            <div className='statistics-title'>会员统计</div>
            <div className='statistics-data'>
                <Tabs  activeKey={state}  onTabClick={cutType}  id={"tabPane"} >
                    <TabPane  tab="日统计图" key="day"/>
                    <TabPane tab="周统计图" key="week"/>
                    <TabPane tab="月统计图" key="moth"/>
                </Tabs>
             {/*   <Radio.Group defaultValue="a" buttonStyle="solid" onChange={cutType} >
                    <Radio.Button value="day">日统计图</Radio.Button>
                    <Radio.Button value="week">周统计图</Radio.Button>
                    <Radio.Button value="moth">月统计图</Radio.Button>
                </Radio.Group>*/}
            </div>
            <div className="main" id="main" style={{width: "100%",height: "500px"}}>
            </div>
        </div>

    )

}

export default OrderStatistics

