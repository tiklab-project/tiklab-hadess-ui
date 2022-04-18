/**
 * @name: index
 * @author: limingliang
 * @date: 2022-02-26 14:30
 * @description：已开发票
 * @update: 2022-02-26 14:30
 */
import React, {useState, useEffect,Component} from "react";
const HaveInvoice=props=>{
    return(
        <div >
            <div className='flex bg-gray-100 py-2 text-center'>
                <div className='w-2/6'>
                    开票订单详情
                </div>
                <div className='w-1/6'>
                    开票类型
                </div>
                <div className='w-1/6'>
                    开票人
                </div>
                <div className='w-1/6'>
                    录入时间
                </div>
                <div className='w-1/6'>
                    操作
                </div>
            </div>
           {/* {
                datas.map(items=>{
                    return(
                        <div key={items} className='pt-5 '>
                            <div className='border'>
                                <div className='flex py-2 bg-gray-100'>
                                    <div >
                                        2022-02-16 12:12:12
                                    </div>
                                    <div className='pl-8'>
                                        购买企业：腾飞企业
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className='w-2/4 border-r'>
                                        {data.map(item=>{
                                            return(
                                                <div key={item} className=' '>
                                                    <div className='flex pt-3 border-b py-3'>
                                                        <div className='pl-2' >
                                                            {item.name}
                                                        </div>
                                                        <div className='pl-8'>
                                                            金额：{item.price}
                                                        </div>
                                                        <div className='pl-8'>
                                                            类型：{item.world}
                                                        </div >
                                                        <div className='pl-8'>
                                                            数量：{item.math}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className='w-1/4 text-left md:text-center border-r align-middle'>
                                        普通电子发票
                                    </div>
                                    <div className='w-1/4 text-left md:text-center border-r align-middle  ' >
                                        2022-02-26 17:58
                                    </div>
                                    <div className='w-1/4 text-center  py-2 ' >
                                        <a className='px-5 ' onClick={()=>openMakeInvoice()}>开票详情</a>
                                        <a>录入发票</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }*/}
        </div>
    )
}
export default HaveInvoice