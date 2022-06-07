
/**
 * @name: index
 * @author: limingliang
 * @date: 2022-02-26 14:30
 * @description：发票管理
 * @update: 2022-02-26 14:30
 */
import {Breadcrumb, Radio} from "antd";
import React, {useState, useEffect,Component} from "react";
import invoiceService from "../../service/invoice.service";
import MakeInvoicePopup from './makeInvoicePopup'
import UploadInvoicePopup from './uploadInvoicePopup'
import HaveInvoice from './haveInvoice'
import {BASE_URL_DEV,BASE_URL_PROD} from "../../const";
import {getUser} from "../../utils";
const InvoiceManage =props=>{
    const [pageSize,setPageSize]=useState(10)
    const [currentPage,setCurrentPage]=useState(1)
    const [totalRecord, setTotalRecord] = useState(props.total);  //总条数
    const [invoiceList,setInvoiceList]=useState([]) //发票数据list
    const [invoiceData,setInvoiceData]=useState('') //单个发票数据

    const [invoiceType,setInvoiceType]=useState(true)  //发票开通状态
    const [visible, setVisible] = useState(false);  //开票详情 弹窗状态
    const [uploadVisible, setUploadVisible] = useState(false);  //上传发票 弹窗状态
    useEffect(async ()=>{
        await findInvoice()
    },[])

    //分页条件待开发查询发票
    const findInvoice=async ()=>{
        const param = {
            pageParam: {
                pageSize: pageSize,
                currentPage: currentPage,
            },
            invoiceState:2
        }
        const res=await invoiceService.findOpenInvoicePage(param)
        if (res.code===0){
            setTotalRecord(res.data.totalRecord)
            setInvoiceList(res.data.dataList)
        }
    }
    const cutType=async (e)=>{
        if (e.target.value===1){
            setInvoiceType(true)
        }else {
            setInvoiceType(false)
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
    const onCloseUpload=()=>{
        setUploadVisible(false)
    }


    //待开发票列表
    const notOpenedInvoice=()=>{
        return(
            <div >
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
                    invoiceList&&invoiceList.map(invoice=>{
                        return(
                            <div key={invoice.id} className='pt-5 '>
                                <div className='border'>
                                    <div className='flex py-2 bg-gray-100'>
                                        <div className='pl-2'>
                                            会员：{invoice.memberId}
                                        </div>
                                        <div className='pl-8'>
                                          类型：saas
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='w-3/4 border-r'>
                                            {invoice.invoiceOrderList.map(item=>{
                                                return(
                                                    <div key={item.id} className=' '>
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
                                        <div className='w-1/4 text-left md:text-center border-r align-middle'>
                                            普通电子发票
                                        </div>
                                        <div className='w-1/4 text-left md:text-center border-r align-middle  ' >
                                            {invoice.createTime}
                                        </div>
                                        <div className='w-1/4 text-center  py-2 ' >
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
        <section className='container mx-auto flex flex-col my-6'>
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item>发票管理</Breadcrumb.Item>
                    <Breadcrumb.Item href=""> 统计</Breadcrumb.Item>
                </Breadcrumb>
                <Radio.Group size='large' defaultValue={1} className='py-6' onChange={cutType} >
                    <Radio.Button value={1}>待开发票</Radio.Button>
                    <Radio.Button value={2} >已开发票</Radio.Button>
                </Radio.Group>
                {
                    invoiceType?
                        notOpenedInvoice():<HaveInvoice/>
                }
            </div>
           <MakeInvoicePopup onClose={onClose} visible={visible} invoiceData={invoiceData}/>
            <UploadInvoicePopup onClose={onCloseUpload} visible={uploadVisible} invoiceData={invoiceData} />
        </section>
    )
}
export default InvoiceManage