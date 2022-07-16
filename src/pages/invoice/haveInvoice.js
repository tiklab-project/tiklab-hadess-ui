/**
 * @name: index
 * @author: limingliang
 * @date: 2022-02-26 14:30
 * @description：已开发票
 * @update: 2022-02-26 14:30
 */
import React, {useState, useEffect} from "react";
import invoiceService from "../../service/invoice.service";
import {Pagination} from "antd";
const HaveInvoice=props=>{

    const [invoiceList,setInvoiceList]=useState([]) //已开发票发票数据list
    const [pageSize,setPageSize]=useState(10)
    const [currentPage,setCurrentPage]=useState(1)
    const [totalRecord, setTotalRecord] = useState(props.total);  //总条数

    useEffect(async ()=>{
        await findInvoice(currentPage)
    },[])

    //查询已开的发票
    const findInvoice = async (currentPage) => {
        const param = {
            pageParam: {
                pageSize: pageSize,
                currentPage: currentPage,
            },
            invoiceState:1
        }
        const res=await invoiceService.findOpenInvoicePage(param)
        if (res.code===0){
            setTotalRecord(res.data.totalRecord)
            setInvoiceList(res.data.dataList)
        }
    }

    //查询发票详情
    const openMakeInvoice = () => {

    }

    //翻页
    const changPag =async (e) => {
        await findInvoice(e)
    }

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
                    录入人
                </div>
                <div className='w-1/6'>
                    录入时间
                </div>
                <div className='w-1/6'>
                    操作
                </div>
            </div>
            {
                invoiceList&& invoiceList.map(invoice=>{
                    return(
                        <div key={invoice.id} className='pt-5 '>
                            <div className='border'>
                                <div className='flex py-2 bg-gray-100'>
                                    {
                                        invoice.bGroup===1?
                                            <div className='pl-2'>
                                                开票租户：{invoice.memberId}
                                            </div>:
                                            <div className='pl-2'>
                                                开票人：{invoice.memberId}
                                            </div>
                                    }
                                </div>
                                <div className='flex'>
                                    <div className='w-2/5 border-r'>
                                        {invoice.invoiceOrderList.map(item=>{
                                            return(
                                                <div key={item} className=' '>
                                                    <div className='flex pt-3 border-b py-3'>
                                                        <div className='w-3/4 pl-3' >
                                                            {item.order.orderProductList[0].product.name}
                                                        </div>
                                                        <div className='w-2/4'>
                                                            金额：{item.order.orderProductList[0].orderProductPrice}
                                                        </div>
                                                        <div className='w-2/4'>
                                                            数量：{item.order.orderProductList[0].math}月
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className='w-1/5 text-left md:text-center border-r align-middle'>
                                        {invoice.invoiceType===1&&'电子普通发票'||invoice.invoiceType===2&&'增值税发票'}
                                    </div>
                                    <div className='w-1/5 text-left md:text-center border-r align-middle  ' >
                                        {invoice.member.name}
                                    </div>
                                    <div className='w-1/5 text-left md:text-center border-r align-middle  ' >
                                        {invoice.createTime}
                                    </div>
                                    <div className='w-1/5 text-center  py-2 ' >
                                        <a className='px-5 ' onClick={()=>openMakeInvoice()}>发票详情</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {
                totalRecord>0&&
                <div className='mt-16 flex justify-end'>
                    <Pagination current={currentPage} total={totalRecord} onChange={changPag}  />
                </div>
            }
        </div>
    )
}
export default HaveInvoice