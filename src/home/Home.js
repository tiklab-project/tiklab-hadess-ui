/**
 * @name: Home
 * @author: limingliang
 * @date: 2022-11-07 17:56
 * @description：Home
 * @update: 2022-11-07 17:56
 */
import React, {useState, useEffect} from "react";
import {Tabs} from 'antd';
const { TabPane } = Tabs;
import './Home.scss'

const Home = (props) => {
    const [category,setMemberType]=useState('day');

    useEffect( async ()=>{


    },[])



    return(
        <div className='home'>
            <div className='md:mx-44  pt-12 pb-6'>
                <div className='bg-white pl-4'>
                    <h1 className='home-title'>新增会员统计</h1>
                    <div className='md:px-6 ' >

                    </div>
                </div>
                <div className='bg-white pl-4 mt-4'>
                    <h1 className='home-title'>订单统计</h1>
                    <div className='md:px-6 ' >

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home
