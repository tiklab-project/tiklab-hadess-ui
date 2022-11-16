/**
 * @name: MakeInvoicePopup
 * @author: limingliang
 * @date: 2022-02-26 14:30
 * @description：开票详情
 * @update: 2022-02-26 14:30
 */
import React  from "react";
import { Drawer } from 'antd'
const MakeInvoicePopup =props=>{
    const {visible, onClose,invoiceData} = props;
    return(
        <Drawer
            title="待录入开票详情  "
            placement='right'
            closable={false}
            onClose={onClose}
            visible={visible}
            width  ={'500'}
        >
            <div className='space-y-3'>
                <p >申请时间 : {invoiceData.createTime}</p>
                <div className='flex' >
                    发票金额 :
                    <p className=' text-red-500'>￥{invoiceData.totalPrice}</p>
                </div>
                <p >抬头类型 : {invoiceData.invoiceTitleType==='person'?'个人':'企业'}</p>
                <p >发票抬头: {invoiceData.buyerName}</p>
                <p >购方电话 : {invoiceData.phone?invoiceData.phone:'无'}</p>
                <p >购方税号 : {invoiceData.taxpayerNumber?invoiceData.taxpayerNumber:'无'}</p>
                <p >注册地址 : {invoiceData.adders?invoiceData.adders:'无'}</p>
                <p >开户银行: {invoiceData.depositBank?invoiceData.depositBank:'无'}</p>
                <p >银行账号 : {invoiceData.bankNumber?invoiceData.bankNumber:'无'}</p>
            </div>
        </Drawer>
    )
}

export default MakeInvoicePopup