/**
 * @name: index
 * @author: limingliang
 * @date: 2022-02-26 14:30
 * @description：发票server
 * @update: 2022-02-26 14:30
 */

import {Axios} from 'tiklab-core-ui';
export const findOpenInvoicePageApi = '/invoice/findOpenInvoicePage';  //条件分页查询
export const updateInvoiceApi = '/invoice/updateInvoice';  //修改发票

class InvoiceService {
    constructor() {
    }

    async findOpenInvoicePage(data){
        const response = await Axios.post(findOpenInvoicePageApi, data)
        return response
    }
    async updateInvoice(data){
        const response = await Axios.post(updateInvoiceApi, data)
        return response
    }
}

const invoiceService=new InvoiceService();
export default invoiceService