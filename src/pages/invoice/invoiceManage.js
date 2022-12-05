
/**
 * @name: index
 * @author: limingliang
 * @date: 2022-02-26 14:30
 * @description：发票管理
 * @update: 2022-02-26 14:30
 */
import {Breadcrumb, Radio, Pagination, Tabs} from "antd";
import React, {useState, useEffect,Component} from "react";
import invoiceService from "../../service/invoice.service";
import MakeInvoicePopup from './makeInvoicePopup'
import UploadInvoicePopup from './uploadInvoicePopup'
import HaveInvoice from './haveInvoice'
import {getUser} from "../../utils";
const { TabPane } = Tabs;
import './invoice.scss'
import Paging from "../../common/components/paging";
const InvoiceManage =props=>{
    const [pageSize]=useState(10)
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState(0);  //总页数

    const [invoiceList,setInvoiceList]=useState([]) //发票数据list
    const [invoiceData,setInvoiceData]=useState('') //单个发票数据

    const [invoiceType,setInvoiceType]=useState(true)  //发票开通状态
    const [type,setType]=useState('1')
    const [visible, setVisible] = useState(false);  //开票详情 弹窗状态
    const [uploadVisible, setUploadVisible] = useState(false);  //上传发票 弹窗状态
    useEffect(async ()=>{
        await findInvoice(currentPage)
    },[])

    //分页条件待开发查询发票
    const findInvoice=async (currentPage)=>{
        const param = {
            pageParam: {
                pageSize: pageSize,
                currentPage: currentPage,
            },
            invoiceState:2
        }
        const res=await invoiceService.findOpenInvoicePage(param)
        if (res.code===0){
            setTotalPage(res.data.totalPage)
            setInvoiceList(res.data.dataList)
        }
    }
    const cutType=async (event)=>{
        setType(event)
        if (event==='1'){
            setInvoiceType(true)
        }else {
            setInvoiceType(false)
            await findInvoice()
        }

    }
    //打开待开发票信息弹窗
    const openMakeInvoice= (invoice)=>{
        setInvoiceData(invoice)
        setVisible(true)
    }
    const onClose = () => {
        setVisible(false);
    };
    //打开上传发票弹窗
    const UploadInvoice= (invoice)=>{
        setInvoiceData(invoice)
        setUploadVisible(true)
    }
    const onCloseUpload=async ()=>{
        setUploadVisible(false)
        await findInvoice()
    }

    //分页
    const handleTableChange =async (value) => {
        setCurrentPage(value)
        await findInvoice(value)
    }

    //待开发票列表
    const notOpenedInvoice=()=>{
        return(
            <div>
                <div className='flex bg-gray-100 py-2 text-center'>
                    <div className='w-3/4'>
                        开票订单详情
                    </div>
                    <div className='w-1/4'>
                        开票类型
                    </div>
                    <div className='w-1/4'>
                        提交时间
                    </div>
                    <div className='w-1/4'>
                        操作
                    </div>
                </div>
                {
                    invoiceList?.map(invoice=>{
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

                                        <div className='pl-8'>
                                            类型：{invoice.bGroup===1&&'线上saas版'||invoice.bGroup===2&&'线下企业版'}
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='w-3/4 border-r'>
                                            {invoice.invoiceOrderList.map(item=>{
                                                return(
                                                    <div key={item.id} className='flex pt-3  py-3'>
                                                            <div className='w-3/4 pl-3' >
                                                                {item.order.orderDetailsList[0].product.name}
                                                            </div>
                                                            <div className='w-2/4'>
                                                                金额：{item.order.orderPrice}
                                                            </div>
                                                            <div className='w-2/4'>
                                                                数量：{item.order.orderDetailsList[0].subMath}月
                                                            </div>
                                                        </div>
                                                )
                                            })}
                                        </div>
                                        <div className='w-1/4 text-left md:text-center border-r align-middle'>
                                            {invoice.invoiceType===1&&'电子普通发票'||invoice.invoiceType===2&&'增值税发票'}
                                        </div>
                                        <div className='w-1/4 text-left md:text-center border-r align-middle  ' >
                                            {invoice.createTime}
                                        </div>
                                        <div className='w-1/4 text-center  py-2 text-blue-500' >
                                          <a className='px-5 ' onClick={()=>openMakeInvoice(invoice)}>开票详情</a>
                                            <a onClick={()=>UploadInvoice(invoice)}>上传发票</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    return(

        <div className='invoice'>
            <Breadcrumb separator="/" className=' invoice-title'>
                <Breadcrumb.Item>发票管理</Breadcrumb.Item>
            </Breadcrumb>
            <Tabs  activeKey={type}  onTabClick={cutType} id='tabPane'>
                <TabPane  tab="待处理发票" key='1'/>
                <TabPane tab="已处理发票" key='2'/>
            </Tabs>
            {
                invoiceType?
                    notOpenedInvoice():<HaveInvoice/>
            }

            <Paging totalPage={totalPage} currentPage={currentPage} handleTableChange={handleTableChange}/>
            <MakeInvoicePopup onClose={onClose} visible={visible} invoiceData={invoiceData}/>
            <UploadInvoicePopup onClose={onCloseUpload} visible={uploadVisible} invoiceData={invoiceData} />
        </div>

    )
}
export default InvoiceManage